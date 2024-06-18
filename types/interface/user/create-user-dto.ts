import { IUserDto } from "./base-user-dto";
export interface ICreateUserDto extends IUserDto {
    createdAt: Date;
    updateAt: Date;
    deletedAt: Date;
}