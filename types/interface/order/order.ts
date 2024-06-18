import { ICreateOrderDto } from "./create-order-dto";
export interface IOrder extends ICreateOrderDto {
    _id: string;
    updatedAt: Date;
}