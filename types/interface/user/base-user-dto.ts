export interface IUserDto {
    name: string;
    email: string;
    password: string;
    role: string;
    otpExpiryTime: Date;
    createdAt: Date
    secrectToen?: string
    isVerified: boolean
    otp: string;
}