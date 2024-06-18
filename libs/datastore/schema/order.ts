import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IAddress, IPayementInfo, ORDER_STATUS_ARRAY } from "types";
import { AddressSchema, PayementInfoSchema } from "./common";
export type OrderDocument = Document & Orders
@Schema()
export class OrderItems {
    @Prop({ required: true })
    productId: string;

    @Prop({ required: true })
    quantity: number;

    @Prop({ required: true })
    skuCode: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    lifetime: boolean;

    @Prop({ required: true })
    validity: number;

    @Prop({ required: true })
    skuPriceId: string;

    @Prop({ required: true })
    productName: string;

    @Prop({ default: [] })
    licenses: string[];
}

export class Orders {
    @Prop({ required: true })
    orderId: string;

    @Prop({ required: true })
    userId: string;

    @Prop({ type: AddressSchema })
    customerAddress: IAddress;

    @Prop({ required: true })
    customerPhoneNumber: string;

    @Prop({ required: true })
    orderedItems: OrderItems[];

    @Prop({ required: true, type: PayementInfoSchema })
    paymentInfo: IPayementInfo;

    @Prop({ default: 'pending', enum: ORDER_STATUS_ARRAY })
    orderStatus: string;

    @Prop({ default: false })
    isOrderDelivered: boolean;

    @Prop({ default: null })
    checkoutSessionId: string;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date

}
export const OrdersSchema = SchemaFactory.createForClass(Orders)