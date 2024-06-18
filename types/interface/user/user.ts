import { ICreateUserDto } from "./create-user-dto";
export interface IUser extends ICreateUserDto {
    _id: string;
    updatedAt: string;
}