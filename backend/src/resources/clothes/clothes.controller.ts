import {Router, Request, Response, NextFunction} from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/clothes/clothes.validation';
import ClothesService from '@/resources/clothes/clothes.service';

class ClothesController implements Controller {
    public path = '/clothes';
    public router = Router();
    private ClothesService = new ClothesService();

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
                name,
                imagesUrls,
                gifUrl,
                size,
                color,
                type,
                price,
                company,
                clothesCount,} = req.body;

            const clothes = await this.ClothesService.create( 
                name,
                imagesUrls,
                gifUrl,
                size,
                color,
                type,
                price,
                company,
                clothesCount,);

            res.status(201).json({clothes});
        } catch (error) {
            next(new HttpException(400, 'Cannot create clothes'));
        }
    }
}

export default ClothesController;