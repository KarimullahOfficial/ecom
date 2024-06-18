import { IProductDto } from "./base-product.dto";
export interface ICreateProductDto extends IProductDto {
    createdAt: Date;
    updateAt: Date;
}