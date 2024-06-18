import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { ICreateUserDto, IUpdateUserDto, IUserQueryParam } from 'types';
import { query } from 'express';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() icreateDto: ICreateUserDto) {
    return await this.userService.create(icreateDto)

  }

  @Get()
  async findAll(@Query() query: IUserQueryParam) {
    return await this.userService.findAll(query)
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.userService.findById(id)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() iupdateDtoUser: IUpdateUserDto) {
    return await this.userService.update(id, iupdateDtoUser)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id)
  }

}
