import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { USER_ROLE_ARRAY } from "types/enum";

export type UserDocument = User & Document
@Schema()

export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ default: false })
    isVerified: boolean

    @Prop({ required: true })
    email: string;

    @Prop({ default: null })
    otp: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    secrectToen: string

    @Prop()
    otpExpiryTime: Date;

    @Prop({ default: 'customer', required: true, enum: USER_ROLE_ARRAY })
    role: string

    @Prop()
    createdAt: Date;

    @Prop()
    updateAt: Date;

    @Prop()
    deleteAt: Date;

}
export const UserSchema = SchemaFactory.createForClass(User)