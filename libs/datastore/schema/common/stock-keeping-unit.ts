import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type StockKeepingUnitDocumnet = StockKeepingUnit & Document
@Schema()
export class StockKeepingUnit {
    @Prop({})
    skuName: string;

    @Prop({})
    price: number;

    @Prop({})
    validity: number;

    @Prop({})
    lifetime: boolean;

    @Prop({})
    stripePriceId: string;

    @Prop({})
    skuCode?: string;
}
export const StockKeepingUnitSchema = SchemaFactory.createForClass(StockKeepingUnit)