import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import *  as mongoose from 'mongoose'

export type LicenceDocument = Licence & Document

@Schema()
export class Licence {
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Products' })
    product: string;

    @Prop({ required: true })
    productSku: string;

    @Prop({ required: true, })
    licenseKey: string;

    @Prop({ default: false })
    isSold: boolean;

    @Prop()
    orderId: string;
}

export const LicenceSchema = SchemaFactory.createForClass(Licence)