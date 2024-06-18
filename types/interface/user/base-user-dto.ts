export interface IUserDto {
    name: string;
    eamil: string;
    password: string;
    role: string;
    otpExpiryTime: Date;
    createdAt: Date
    isVerified: boolean
    otp: string;
}