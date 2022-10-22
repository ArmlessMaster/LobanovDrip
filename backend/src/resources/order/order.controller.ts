import {Router, Request, Response, NextFunction} from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/order/order.validation';
import OrderService from '@/resources/order/order.service';

class OrderController implements Controller {
    public path = '/order';
    public router = Router();
    private OrderService = new OrderService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/create`,
            validationMiddleware(validate.create),
            this.create
        )
    }

    private create = async  (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const { 
                user_id,
                moderator_id,
                status,
                adress,} = req.body;

            const order = await this.OrderService.create( 
                user_id,
                moderator_id,
                status,
                adress,);

            res.status(201).json({order});
        } catch (error) {
            next(new HttpException(400, 'Cannot create order'));
        }
    }
}

export default OrderController;