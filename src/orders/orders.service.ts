import { Injectable } from '@nestjs/common';
import { OrderStore } from 'libs/datastore';
import { ICreateOrderDto, IUpdatedOrderDto, OrderQueryParam } from 'types/interface/order';


@Injectable()
export class OrdersService {
  constructor(private readonly store: OrderStore) { }

  async findAll(query: OrderQueryParam) {
    return await this.store.findAll(query)
  }

  async create(icreateDto: ICreateOrderDto) {
    return await this.store.create(icreateDto)
  }

  async findById(id: string) {
    return await this.store.findByid(id)
  }

  async update(id, iupdatedDto: IUpdatedOrderDto) {
    return await this.store.update(id, iupdatedDto)
  }

  async remove(id: string) {
    return await this.store.remove(id)
  }


}
