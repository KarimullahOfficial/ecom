import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ICreateOrderDto, IUpdatedOrderDto, OrderQueryParam } from 'types/interface/order';



@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  async create(@Body() icreateDto: ICreateOrderDto) {
    return await this.ordersService.create(icreateDto)
  }

  @Get()
  async findAll(@Query() query: OrderQueryParam) {
    return await this.ordersService.findAll(query)
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.ordersService.findById(id)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() iupdateDto: IUpdatedOrderDto) {
    return await this.ordersService.update(id, iupdateDto)
  }

  @Delete('id')
  async remove(@Param('id') id: string) {
    return await this.ordersService.remove(id)
  }
}
