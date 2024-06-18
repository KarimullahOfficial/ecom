import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export type FeedBackDocument = FeedBack & Document
@Schema()
export class FeedBack {

    @Prop({})
    customerId: string;

    @Prop({})
    customerName: string;

    @Prop({})
    rating: number;

    @Prop({})
    feedbackMsg: string;
}

export const FeedBackSchema = SchemaFactory.createForClass(FeedBack)