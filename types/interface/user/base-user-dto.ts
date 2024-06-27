export interface IUserDto {
    name: string;
    email: string;
    password: string;
    role: string;
    otpExpiryTime: Date;
    createdAt: Date
    secretToken?: string
    isVerified: boolean
    otp: string;
}