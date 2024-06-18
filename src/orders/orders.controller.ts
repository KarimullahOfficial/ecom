import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ICreateOrderDto, OrderQueryParam } from 'types/interface/order';



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
async 
}
