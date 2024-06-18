import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema';
import { OrderStore, UserStore } from './store';
import { Orders, OrdersSchema } from './schema/order';

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Orders.name, schema: OrdersSchema }]),

    ],
    providers: [UserStore, OrderStore],
    exports: [UserStore, OrderStore],
})
export class DatastoreModule { }
