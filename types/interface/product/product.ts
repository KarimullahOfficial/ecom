
import { ICreateProductDto } from "./create-product-dto";
export interface IProduct extends ICreateProductDto {
    _id: string;
}