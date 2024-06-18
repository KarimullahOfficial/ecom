import { IOrderDto } from "./based-order-dto";
export interface ICreateOrderDto extends IOrderDto {
    createdAt: Date;
    updateAt: Date;
}