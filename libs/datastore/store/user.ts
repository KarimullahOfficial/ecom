import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../schema";
import { Model } from 'mongoose';
import { IQueryResponse } from "types/interface/common";
import { IUserQueryParam } from "types/interface/user/user-query-parma";
import { getSortPaging, listResponse, } from "../utlis";
import { ICreateUserDto, IUpdateUserDto } from "types";
import * as bcrypt from 'bcrypt';
const FormData = require('form-data'); 
import config from '@nestjs/config';
import axios from 'axios';
import { ConfigService } from "@nestjs/config";
import * as jwt from 'jsonwebtoken';
import { sendEmail } from "../utlis/mail.handler";


@Injectable()
export class UserStore {
    constructor(@InjectModel(User.name) private readonly model: Model<UserDocument>,
        private readonly configService: ConfigService) { }

    async findAll(query: IUserQueryParam): Promise<IQueryResponse<UserDocument>> {
        const queryObject: any = {}

        if (query?.role) {
            queryObject.role = query.role
        }

        const { sort, skip, limit } = getSortPaging(query)
        const items = await this.model.find(queryObject)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .exec()

        return listResponse(this.model, queryObject, items, query)
    }



    async create(icreateDto: ICreateUserDto): Promise<{ success: boolean, message: string, result: { email: string } }> {
        icreateDto.password = await this.generateHashPassword(icreateDto.password);

        // Check if it's for admin
        if (
            icreateDto.role === 'ADMIN' &&
            icreateDto.secrectToen !== this.configService.get<string>('adminSecretToken')
        ) {
            throw new Error('Not allowed to create admin');
        } else if (icreateDto.role !== 'CUSTOMER') {
            icreateDto.isVerified = true;
        }

        // Check if user already exists
        const existingUser = await this.model.findOne({ email: icreateDto.eamil });
        if (existingUser) {
            throw new Error('User already exists');
        }

        // Generate OTP
        const otp = Math.floor(Math.random() * 900000) + 100000;
        const otpExpiryTime = new Date();
        otpExpiryTime.setMinutes(otpExpiryTime.getMinutes() + 10);

        // Create new user
        const newUser = await this.model.create({
            ...icreateDto,
            createdAt: new Date(),
            otp,
            otpExpiryTime,
        });

        // Send email if the new user is not an admin
        if (newUser.role !== 'ADMIN') {
            await sendEmail(
                newUser.email,
                this.configService.get<string>('emailService.emailTemplates.verifyEmail'),
                'Email verification - Digizone',
                {
                    customerName: newUser.name,
                    customerEmail: newUser.email,
                    otp,
                },
            );
        }

        return {
            success: true,
            message: newUser.role === 'ADMIN'
                ? 'Admin created successfully'
                : 'Please activate your account by verifying your email. We have sent you an email with the OTP.',
            result: { email: newUser.email },
        };
    }

    async login(email: string, password: string) {

        try {
            const userExists = await this.model.findOne({ email });
            if (!userExists) {
                throw new Error('Invalid email or password');
            }
            if (!userExists.isVerified) {
                throw new Error('Please verify your email');
            }
            const isPasswordMatch = await this.comparePassword(password, userExists.password);
            if (!isPasswordMatch) {
                throw new Error('Invalid email or password');
            }
            const token = await this.generateAuthToken(userExists._id.toString());

            return {
                success: true,
                message: 'Login successful',
                result: {
                    user: {
                        name: userExists.name,
                        email: userExists.email,
                        role: userExists.role,
                        id: userExists._id.toString(),
                    },
                    token,
                },
            };
        } catch (error) {
            throw new Error(error.message || 'Login failed');
        }
    }

    async verifyEmail(otp: string, email: string) {
        try {
            const user = await this.model.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }
            if (user.otp !== otp) {
                throw new Error('Invalid otp');
            }
            if (user.otpExpiryTime < new Date()) {
                throw new Error('Otp expired');
            }
            await this.model.updateOne(
                {
                    email,
                },
                {
                    isVerified: true,
                },
            );

            return {
                success: true,
                message: 'Email verified successfully. you can login now',
            };
        } catch (error) {
            throw error;
        }
    }
    async findById(id: string): Promise<UserDocument> {
        const modelObject = await this.model.findById(id)
        return modelObject
    }

    async update(id: string, updateUserDto: IUpdateUserDto): Promise<UserDocument> {
        const modelObject = await this.model.findByIdAndUpdate(id, { $set: { ...updateUserDto } }, { new: true }).exec()
        return modelObject

    }

    async remove(id: string): Promise<UserDocument> {
        const modelObject = await this.model.findByIdAndDelete(id)
        return modelObject
    }

    async generateHashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    async generateAuthToken(id: string): Promise<string> {
        const secret = this.configService.get<string>('jwtSecret');
        return jwt.sign({ id }, secret, { expiresIn: '30d' });
    }

    async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }

    async sendOtpEmail(email: string) {
        const user = await this.model.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        if (user.isVerified) {
            throw new Error('Email already verified');
        }
        const otp = Math.floor(Math.random() * 900000) + 100000;

        const otpExpiryTime = new Date();
        otpExpiryTime.setMinutes(otpExpiryTime.getMinutes() + 10);
        await this.model.updateOne({ email, }, { otp, otpExpiryTime },);

        sendEmail(
            user.email,
            this.configService.get('emailService.emailTemplates.verifyEmail'),
            'Email verification - Digizone',
            {
                customerName: user.name,
                customerEmail: user.email,
                otp,
            },
        );

        return {
            success: true,
            message: 'Otp sent successfully',
            result: { email: user.email },
        };
    } catch(error) {
        throw error;
    }

    async forgotPassword(email: string) {
        try {
            const user = await this.model.findOne({ email, });
            if (!user) {
                throw new Error('User not found');
            }
            let password = Math.random().toString(36).substring(2, 12);
            const tempPassword = password;
            password = await this.generateHashPassword(password);
            await this.model.updateOne(
                {
                    _id: user._id,
                },
                {
                    password,
                },
            );

            sendEmail(
                user.email,
                this.configService.get('emailService.emailTemplates.forgotPassword'),
                'Forgot password - Digizone',
                {
                    customerName: user.name,
                    customerEmail: user.email,
                    newPassword: password,
                    loginLink: this.configService.get('loginLink'),
                },
            );

            return {
                success: true,
                message: 'Password sent to your email',
                result: { email: user.email, password: tempPassword },
            };
        } catch (error) {
            throw error;
        }
    }

    async sendEmail(to: string, templateName: string, subject: string, templateVars: Record<string, any> = {}): Promise<any> {
        try {
            // Create a new instance of FormData
            const form = new FormData();
            form.append('to', to);
            form.append('template', templateName);
            form.append('subject', subject);
            form.append('from', 'mailgun@sandboxcb4ef27781e54958b2fa89338c92c579.mailgun.org');

            // Append template variables
            Object.keys(templateVars).forEach((key) => {
                form.append(`v:${key}`, templateVars[key]);
            });

            // Prepare the Basic Auth token
            const username = 'api';
            const password = this.configService.get<string>('emailService.privateApiKey');
            if (!password) {
                throw new Error('Missing email service private API key.');
            }
            const token = Buffer.from(`${username}:${password}`).toString('base64');

            // Send the email using axios
            const response = await axios({
                method: 'post',
                url: `https://api.mailgun.net/v3/${this.configService.get<string>('emailService.testDomain')}/messages`,
                headers: {
                    Authorization: `Basic ${token}`,
                    ...form.getHeaders(), // Use form-data headers
                },
                data: form,
            });

            return response.data;
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }
}