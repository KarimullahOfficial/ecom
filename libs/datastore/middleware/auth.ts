import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { UserStore } from '../store';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private readonly userStore: UserStore,
        private readonly configService: ConfigService
    ) { }

    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.cookies._digi_auth_token;
            if (!token) {
                throw new UnauthorizedException('No token provided');
            }

            const secret = this.configService.get<string>('jwtSecret');
            const decoded = jwt.verify(token, secret);

            const user = await this.userStore.findById(decoded.id);
            if (!user) {
                throw new UnauthorizedException('User not found');
            }


            req['user'] = user

            next();
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
