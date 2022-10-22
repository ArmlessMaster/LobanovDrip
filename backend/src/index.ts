import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';
import AccountController from '@/resources/account/account.controller';
import ClothesController from '@/resources/clothes/clothes.controller';
import DialogController from '@/resources/dialog/dialog.controller';
import MessageController from '@/resources/message/message.controller';
import ModelingController from '@/resources/modeling/modeling.controller';
import OrderController from '@/resources/order/order.controller';
import OrderClothesController from '@/resources/orderClothes/orderClothes.controller';
import SetController from '@/resources/set/set.controller';

validateEnv();

const app = new App(
    [
        new AccountController(),
        new ClothesController(),
        new DialogController(),
        new MessageController(),
        new ModelingController(),
        new OrderController(),
        new OrderClothesController(),
        new SetController()
    ],
    Number(process.env.PORT)
);

app.listen();