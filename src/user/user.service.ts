import { Injectable } from '@nestjs/common';
import { UserStore } from 'libs/datastore';
import { ICreateUserDto, IUpdateUserDto, IUserQueryParam } from 'types';


@Injectable()
export class UserService {
  constructor(private readonly store: UserStore) { }

  async create(icreateDto: ICreateUserDto) {
    return await this.store.create(icreateDto)

  }

  async findAll(query: IUserQueryParam) {
    return await this.store.findAll(query)
  }

  async findById(id: string) {
    return await this.store.findById(id)
  }

  async update(id: string, iupdateDto: IUpdateUserDto) {
    return await this.store.update(id, iupdateDto)

  }

  async remove(id: string) {
    return await this.store.remove(id)
  }

}
