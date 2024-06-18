import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type LocationDocument = Location & Document

@Schema()
export class Location {

    @Prop({ required: true })
    longitude!: string;

    @Prop({ required: true })
    latitude!: string;

    @Prop({ required: false })
    address!: string;

    @Prop({ required: true })
    city!: string;

    @Prop({ required: false })
    province!: string;

    @Prop({ required: false })
    area!: string

    @Prop({ required: false })
    addressLine!: string
}

export const LocationSchema = SchemaFactory.createForClass(Location)