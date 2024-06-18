import { Prop, Schema } from "@nestjs/mongoose";
import { CATEGORY_TYPE_ARRAY, SYSTEM_TYPE_ARRAY } from "types";
import { FeedBack, FeedBackSchema } from "./common";
import { StockKeepingUnit, StockKeepingUnitSchema } from "./common/stock-keeping-unit";

@Schema()
export class Product {
    @Prop({ required: true })
    productName: string;

    @Prop({ required: true })
    description: string;

    @Prop()
    image?: string;

    @Prop({ enum: CATEGORY_TYPE_ARRAY })
    category: string

    @Prop({ enum: CATEGORY_TYPE_ARRAY })
    platformType: string;

    @Prop({ enum: SYSTEM_TYPE_ARRAY })
    systemType: string

    @Prop({ required: true })
    productUrl: string;

    @Prop({ required: true })
    downloadUrl: string;

    @Prop({})
    avgRating: number;

    @Prop([{ type: FeedBackSchema }])
    feedbackDetails: FeedBack[];

    @Prop([{ type: StockKeepingUnitSchema }])
    skuDetails: StockKeepingUnit[];


}