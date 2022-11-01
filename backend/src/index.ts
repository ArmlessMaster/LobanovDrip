import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';
import AccountController from '@/resources/account/account.controller';
import ClothesController from '@/resources/clothes/clothes.controller';
import ModelingController from '@/resources/modeling/modeling.controller';
import OrderController from '@/resources/order/order.controller';
import OrderClothesController from '@/resources/orderClothes/orderClothes.controller';
import SetController from '@/resources/set/set.controller';
import CollectionController from '@/resources/collection/collection.controller';

validateEnv();

const app = new App(
    [
        new AccountController(),
        new ClothesController(),
        new ModelingController(),
        new OrderController(),
        new OrderClothesController(),
        new SetController(),
        new CollectionController(),
    ],
    Number(process.env.PORT)
);

app.listen();
