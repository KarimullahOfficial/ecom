import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(private readonly configService: ConfigService) { }

    generateAuthToken(id: string): string {
        const secret = this.configService.get<string>('jwtSecret');
        return jwt.sign({ id }, secret, { expiresIn: '30d' });
    }

    decodeAuthToken(token: string): any {
        const secret = this.configService.get<string>('jwtSecret');
        return jwt.verify(token, secret);
    }
}
