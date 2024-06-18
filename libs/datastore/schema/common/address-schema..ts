import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export type AddressDocument = Address & Document

@Schema()
export class Address {
    @Prop()
    city: string

    @Prop()
    province: string

    @Prop()
    currentAddress: string;

    @Prop()
    permenantAddress: string;

    @Prop()
    country: string;

    @Prop()
    postalCode: string;

}

export const AddressSchema = SchemaFactory.createForClass(Address)