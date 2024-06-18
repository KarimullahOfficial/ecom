import { FeedBack } from "libs/datastore";
import { StockKeepingUnit } from "libs/datastore/schema/common/stock-keeping-unit";
export interface IProductDto {
    productName: string;
    description: string;
    image?: string;
    category: string;
    systemType: string;
    downloadUrl: string;
    avgRating: number;
    feedbackDetails: FeedBack[];
    createdAt: Date;
    updatedAt: Date;
    skuDetails: StockKeepingUnit[];
}