import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { OrderDocument, Orders } from "../schema/order";
import { Model } from 'mongoose';
import { IQueryResponse } from "types";
import { ICreateOrderDto, IUpdatedOrderDto, OrderQueryParam } from "types/interface/order";
import { getSortPaging, listResponse, } from "../utlis";

@Injectable()
export class OrderStore {
    constructor(@InjectModel(Orders.name) private readonly model: Model<OrderDocument>) { }

    async findAll(query: OrderQueryParam): Promise<IQueryResponse<OrderDocument>> {
        const queryObject: any = {}

        if (query?.status) {
            queryObject.status = query.status
        }

        const { skip, sort, limit } = getSortPaging(query)
        const items = await this.model.find(queryObject)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .exec()
        return listResponse(items, this.model, query, queryObject)

    }

    async create(icreateDto: ICreateOrderDto) {
        const modelObject = await this.model.create({
            ...icreateDto, createdAt
                : new Date()
        })
        return modelObject;
    }

    async findByid(id: string) {
        const modelObject = await this.model.findById(id)
        return modelObject
    }

    async update(id: string, iupdatedDto: IUpdatedOrderDto) {
        const modelObject = await this.model.findByIdAndUpdate(id, { $set: iupdatedDto }, { new: true })
        return modelObject;
    }

    async remove(id: string) {
        const modelObject = await this.model.findByIdAndDelete(id)
        return modelObject;
    }

}