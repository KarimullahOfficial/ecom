import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../schema";
import { Model } from 'mongoose';
import { IQueryResponse } from "types/interface/common";
import { IUserQueryParam } from "types/interface/user/user-query-parma";
import { getSortPaging, listenResponse } from "../utlis";
import { ICreateUserDto, IUpdateUserDto } from "types";
import { promises } from "dns";

@Injectable()
export class UserStore {
    constructor(@InjectModel(User.name) private readonly model: Model<UserDocument>) { }

    async findAll(query: IUserQueryParam): Promise<IQueryResponse<UserDocument>> {
        const queryObject: any = {}

        if (query?.role) {
            queryObject.role = query.role
        }

        const { sort, skip, limit } = getSortPaging(query)
        const item = await this.model.find(queryObject)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .exec()

        return listenResponse(item, query, queryObject, this.model)
    }

    async create(icreateDto: ICreateUserDto): Promise<UserDocument> {
        const modelObject = await this.model.create({
            ...icreateDto,
            createdAt: new Date()
        })
        return modelObject;

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
}