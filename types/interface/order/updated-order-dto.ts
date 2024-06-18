import { IOrderDto } from "./based-order-dto";
export interface IUpdatedOrderDto extends IOrderDto {
    updatedAt: Date;
}