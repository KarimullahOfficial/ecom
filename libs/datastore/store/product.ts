import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDocument } from "../schema/product";
import { Model } from 'mongoose'
import { IQueryResponse } from "types";
import { ICreateProductDto, IProductQueryParam, IUpdatedProductDto } from "types/interface/product";
import { getSortPaging, listResponse, } from "../utlis";


@Injectable()
export class ProductStore {
    constructor(@InjectModel(Product.name) private readonly model: Model<ProductDocument>) { }

    async findAll(query: IProductQueryParam): Promise<IQueryResponse<ProductDocument>> {
        const queryObject: any = {}

        if (query?.category) {
            queryObject.category = query.category
        }

        const { skip, sort, limit } = getSortPaging(query)
        const items = await this.model.find(queryObject)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .exec()
        return listResponse(items, query, queryObject, this.model)
    }

    async create(icreateProductDto: ICreateProductDto): Promise<ProductDocument> {
        const modelObject = this.model.create({ ...icreateProductDto, createdAt: new Date() })
        return modelObject
    }

    async findById(id: string): Promise<ProductDocument> {
        const modelObject = await this.model.findById(id)
        return modelObject
    }

    async update(id: string, iupdateProductDto: IUpdatedProductDto): Promise<ProductDocument> {
        const modelObject = await this.model.findByIdAndUpdate(id, { $set: iupdateProductDto }, { new: true })
        return modelObject
    }

    async remove(id: string): Promise<ProductDocument> {
        const modelObject = await this.model.findByIdAndDelete(id)
        return modelObject
    }
}