import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/orderClothes/orderClothes.validation';
import OrderClothesService from '@/resources/orderClothes/orderClothes.service';
import OrderClothesModel from '@/resources/orderClothes/orderClothes.model';
import authenticated from '@/middleware/authenticated.middleware';

class OrderClothesController implements Controller {
    public path = '/orderClothes';
    public router = Router();
    private OrderClothesService = new OrderClothesService();

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
            const { clothes_id, order_id, count, size, color } = req.body;

            const orderClothes = await this.OrderClothesService.create(
                clothes_id,
                order_id,
                count,
                size,
                color
            );

            res.status(201).json({ orderClothes });
        } catch (error) {
            next(new HttpException(400, 'Cannot create order clothes'));
        }
    };

    private delete = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { _id } = req.body;

            const orderClothes = await this.OrderClothesService.delete(_id);

            res.status(200).json({ orderClothes });
        } catch (error) {
            next(new HttpException(400, 'Cannot delete order clothes'));
        }
    };

    private update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { _id, clothes_id, order_id, count, size, color } = req.body;

            const orderClothes = await this.OrderClothesService.update(
                _id,
                clothes_id,
                order_id,
                count,
                size,
                color
            );

            res.status(200).json({ orderClothes });
        } catch (error) {
            next(new HttpException(400, 'Cannot update order clothes'));
        }
    };

    
    private get = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const orderClothes = await this.OrderClothesService.get();

            res.status(200).json({ orderClothes });
        } catch (error) {
            next(new HttpException(400, 'Cannot found order clothes'));
        }
    };

    private find = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const props = req.body;

            const orderClothes = await this.OrderClothesService.find(props);

            res.status(200).json({ orderClothes });
        } catch (error) {
            next(new HttpException(400, 'Cannot get order clothes'));
        }
    };
}

export default OrderClothesController;
