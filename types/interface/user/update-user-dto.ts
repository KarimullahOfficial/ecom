import { IUserDto } from "./base-user-dto";
export interface IUpdateUserDto extends IUserDto {
    updateAt: Date
}