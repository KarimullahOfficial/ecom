import { IUserDto } from "./base-user-dto";
export interface IUpdateUserDto extends IUserDto {
    updateAt: Date;
    oldPassword?: string;
    newPassword?: string;
}