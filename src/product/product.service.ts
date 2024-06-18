import { Injectable } from '@nestjs/common';
import { ProductStore } from 'libs/datastore/store/product';
import { ICreateProductDto, IProductQueryParam, IUpdatedProductDto } from 'types/interface/product';


@Injectable()
export class ProductService {
  constructor(private readonly store: ProductStore) { }

  async findAll(query: IProductQueryParam) {
    return await this.store.findAll(query)
  }

  async create(icreateProductdto: ICreateProductDto) {
    return await this.store.create(icreateProductdto)

  }

  async update(id: string, iupdatedProductdto: IUpdatedProductDto) {
    return await this.store.update(id, iupdatedProductdto)
  }

  async findById(id: string) {
    return await this.store.findById(id)
  }

  async remove(id: string) {
    return await this.store.remove(id)
  }

}
