import { Injectable } from '@nestjs/common';
import { UserStore, comparePassword } from 'libs/datastore';
import { ICreateUserDto, IUpdateUserDto, IUserQueryParam } from 'types';


@Injectable()
export class UserService {
  constructor(private readonly store: UserStore) { }

  async create(icreateDto: ICreateUserDto) {
    return await this.store.create(icreateDto)

  }

  async forgetPassword(email: string) {
    return await this.store.forgotPassword(email)
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


  async forgotPassword(email: string) {
    return this.store.forgotPassword(email)
  }

  async login(email: string, password: string) {
    return this.store.login(email, password)
  }

  async verifyEmail(otp: string, email: string) {
    return this.store.verifyEmail(otp, email)
  }

  async sendOtpEmail(email: string) {
    return this.store.sendOtpEmail(email)
  }

}
