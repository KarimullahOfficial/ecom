import { OrderItems } from "libs/datastore/schema/order";
import { IAddress, IPayementInfo } from "../common";
export interface IOrderDto {
    orderId: string;
    userId: string;
    customerAddress: IAddress;
    customerPhoneNumber: string;
    orderedItems: OrderItems[];
    paymentInfo: IPayementInfo;
    orderStatus: string;
    isOrderDelivered: boolean;
    checkoutSessionId: string;
    createdAt: Date;
    updatedAt: Date
}