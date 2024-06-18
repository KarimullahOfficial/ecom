import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { ICreateProductDto, IProductQueryParam, IUpdatedProductDto } from 'types/interface/product';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  async create(@Body() icreateProductDto: ICreateProductDto) {
    return await this.productService.create(icreateProductDto)
  }

  @Get()
  async findAll(@Query() query: IProductQueryParam) {
    return await this.productService.findAll(query)
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.productService.findById(id)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() iupdatedto: IUpdatedProductDto) {
    return await this.productService.update(id, iupdatedto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productService.remove(id)
  }
}
