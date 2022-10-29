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
            this.create
        );
        this.router.delete(`${this.path}/delete`, authenticated, this.delete);
        this.router.post(`${this.path}/update`, authenticated, this.update);
        this.router.get(`${this.path}/findById`, this.findById);
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
            const { id } = req.body;

            const order = await this.OrderService.delete(id);

            res.status(201).json({ order });
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
                id,
                user_id,
                moderator_id,
                status,
                adress,
                phone,
                name,
                email,
            } = req.body;

            const order = await this.OrderService.update(
                id,
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
            next(new HttpException(400, 'Cannot change order'));
        }
    };

    private findById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.body;

            const order = await this.OrderService.findById(id);

            res.status(200).json({ order });
        } catch (error) {
            next(new HttpException(400, 'Cannot get order'));
        }
    };
}

export default OrderController;
