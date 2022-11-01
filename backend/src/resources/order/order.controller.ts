import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/order/order.validation';
import OrderService from '@/resources/order/order.service';
import OrderModel from '@/resources/order/order.model';
import authenticated from '@/middleware/authenticated.middleware';

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
            authenticated,
            this.create
        );
        this.router.put(
            `${this.path}/update`,
            validationMiddleware(validate.update),
            authenticated,
            this.update
        );
        this.router.delete(
            `${this.path}/delete`,
            validationMiddleware(validate.delete0),
            authenticated,
            this.delete
        );
        this.router.get(
            `${this.path}`,
            this.get
        );
        this.router.get(
            `${this.path}/find`,
            validationMiddleware(validate.find),
            this.find
        );
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {
                user_id,
                moderator_id,
                status,
                adress,
                phone,
                name,
                email,
            } = req.body;

            const order = await this.OrderService.create(
                user_id,
                moderator_id,
                status,
                adress,
                phone,
                name,
                email
            );

            res.status(201).json({ order });
        } catch (error) {
            next(new HttpException(400, 'Cannot create order'));
        }
    };

    private delete = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { _id } = req.body;

            const order = await this.OrderService.delete(_id);

            res.status(200).json({ order });
        } catch (error) {
            next(new HttpException(400, 'Cannot delete order'));
        }
    };

    private update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {
                _id,
                user_id,
                moderator_id,
                status,
                adress,
                phone,
                name,
                email,
            } = req.body;

            const order = await this.OrderService.update(
                _id,
                user_id,
                moderator_id,
                status,
                adress,
                phone,
                name,
                email
            );

            res.status(200).json({ order });
        } catch (error) {
            next(new HttpException(400, 'Cannot change order'));
        }
    };

    private get = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const orders = await this.OrderService.get();

            res.status(200).json({ orders });
        } catch (error) {
            next(new HttpException(400, 'Cannot found orders'));
        }
    };

    private find = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const props = req.body;

            const orders = await this.OrderService.find(props);

            res.status(200).json({ orders });
        } catch (error) {
            next(new HttpException(400, 'Cannot get orders'));
        }
    };
}

export default OrderController;
