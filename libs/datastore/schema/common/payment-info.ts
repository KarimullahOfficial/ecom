import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { PAYMENT_ARRAY } from "types";
export type PayementInfoDocument = Document & PayementInfo
@Schema()
export class PayementInfo {
    @Prop()
    paymentMethod: string;

    @Prop({ default: 'pending', enum: PAYMENT_ARRAY })
    paymentStatus: string;

    @Prop()
    paymentAmount: number;

    @Prop()
    paymentDate: Date;

    @Prop()
    paymentIntentId: string;
}
export const PayementInfoSchema = SchemaFactory.createForClass(PayementInfo)
