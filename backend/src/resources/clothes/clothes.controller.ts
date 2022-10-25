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
        this.router.delete(
            `${this.path}/:id`,
            this.delete
        )
        this.router.get(
            `${this.path}/:id`,
            this.index
        )
        this.router.post(
            `${this.path}/change/:id`,
            this.change
        )
        this.router.get(
            `${this.path}/find/:name`,
            this.findClothes
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
                sale,
                assemblage,
                material,
                care,
                clothesCount,
                sex,
                collection_id,} = req.body;

            const clothes = await this.ClothesService.create( 
                name,
                imagesUrls,
                gifUrl,
                size,
                color,
                type,
                price,
                company,
                sale,
                assemblage,
                material,
                care,
                clothesCount,
                sex,
                collection_id,);

            res.status(201).json({clothes});
        } catch (error) {
            next(new HttpException(400, 'Cannot create clothes'));
        }
    }

    private delete = async  (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const id: string = req.params.id;

            await this.ClothesService.delete(id);

            res.status(201).json({ message: 'Clothes deleted'});
        } catch (error) {
            next(new HttpException(400, 'Cannot delete clothes'));
        }
    }

    private index = async  (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const id: string = req.params.id;

            const clothes = await this.ClothesService.index(id);

            res.status(201).json({clothes});
        } catch (error) {
            next(new HttpException(400, 'Cannot found clothes'));
        }
    }

    private change = async  (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const id: string = req.params.id;

            const { 
                name,
                imagesUrls,
                gifUrl,
                size,
                color,
                type,
                price,
                company,
                sale,
                assemblage,
                material,
                care,
                clothesCount,
                sex,
                collection_id,} = req.body;

            const clothes = await this.ClothesService.change( 
                id,
                name,
                imagesUrls,
                gifUrl,
                size,
                color,
                type,
                price,
                company,
                sale,
                assemblage,
                material,
                care,
                clothesCount,
                sex,
                collection_id,);

            res.status(201).json({clothes});
        } catch (error) {
            next(new HttpException(400, 'Cannot change clothes'));
        }
    }

    private findClothes = async  (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const name: string = req.params.name as string;

            const clothes = await this.ClothesService.findClothes(name);

            res.status(201).json({clothes});
        } catch (error) {
            next(new HttpException(400, 'Cannot found clothes'));
        }
    }

}

export default ClothesController;

