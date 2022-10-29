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
            const { id } = req.body;

            const orderClothes = await this.OrderClothesService.delete(id);

            res.status(201).json({ orderClothes });
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
            const { id, clothes_id, order_id, count, size, color } = req.body;

            const orderClothes = await this.OrderClothesService.update(
                id,
                clothes_id,
                order_id,
                count,
                size,
                color
            );

            res.status(201).json({ orderClothes });
        } catch (error) {
            next(new HttpException(400, 'Cannot change order clothes'));
        }
    };

    private findById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.body;

            const orderClothes = await this.OrderClothesService.findById(id);

            res.status(200).json({ orderClothes });
        } catch (error) {
            next(new HttpException(400, 'Cannot get order clothes'));
        }
    };
}

export default OrderClothesController;
