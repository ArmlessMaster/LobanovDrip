import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/clothesToOrder/clothesToOrder.validation';
import ClothesToOrderService from '@/resources/clothesToOrder/clothesToOrder.service';
import authenticated from '@/middleware/authenticated.middleware';
import OrderService from '@/resources/order/order.service';
import Order from '@/resources/order/order.interface';

class ClothesToOrderController implements Controller {
    public path = '/clothes-to-order';
    public router = Router();
    private ClothesToOrderService = new ClothesToOrderService();
    private OrderService = new OrderService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.get(
            `${this.path}/order/info`,
            validationMiddleware(validate.getOrder),
            authenticated,
            this.orderInfo
        );
        this.router.get(
            `${this.path}/orders/info`,
            validationMiddleware(validate.getOrders),
            authenticated,
            this.orders
        );
    }

    private orderInfo = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            let { order_id } = req.body;

            if (!order_id) {
                const user_cart = await this.OrderService.find({user_id: req.account._id, status: "cart"}) as Array<Order>;
                order_id = user_cart[0]._id;
            }

            const order = await this.ClothesToOrderService.orderInfo(order_id);

            res.status(200).json({ order });
        } catch (error) {
            next(new HttpException(400, 'Unable to get order info'));
        }
    };

    private orders = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const account_id = req.account._id;

            const orders = await this.ClothesToOrderService.orders(account_id);

            res.status(200).json({ orders });
        } catch (error) {
            next(new HttpException(400, 'Unable to get orders'));
        }
    };
}

export default ClothesToOrderController;
