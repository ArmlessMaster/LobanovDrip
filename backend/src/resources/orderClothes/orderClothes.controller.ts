import {Router, Request, Response, NextFunction} from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/orderClothes/orderClothes.validation';
import OrderClothesService from '@/resources/orderClothes/orderClothes.service';

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
                count,
                size,
                color,} = req.body;

            const orderClothes = await this.OrderClothesService.create( 
                user_id,
                moderator_id,
                count,
                size,
                color,);

            res.status(201).json({orderClothes});
        } catch (error) {
            next(new HttpException(400, 'Cannot create order clothes'));
        }
    }
}

export default OrderClothesController;