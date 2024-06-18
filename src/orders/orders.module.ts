import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Orders, OrdersSchema } from 'libs/datastore/schema/order';
import { OrderStore } from 'libs/datastore';

@Module({
  imports: [MongooseModule.forFeature([{ name: Orders.name, schema: OrdersSchema }])],
  controllers: [OrdersController],
  providers: [OrdersService, OrderStore],
})
export class OrdersModule { }
