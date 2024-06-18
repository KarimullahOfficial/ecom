import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema';
import { OrderStore, UserStore } from './store';
import { Orders, OrdersSchema } from './schema/order';
import { Product, ProductSchema } from './schema/product';
import { ProductStore } from './store/product';

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Orders.name, schema: OrdersSchema },
            { name: Product.name, schema: ProductSchema }

        ]),

    ],
    providers: [UserStore, OrderStore, ProductStore],
    exports: [UserStore, OrderStore, ProductStore],
})
export class DatastoreModule { }
