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
            `${this.path}/findById/:name`,
            this.findById
        )
        this.router.post(
            `${this.path}/update/:id`,
            this.update
        )
        this.router.get(
            `${this.path}/findByName/:name`,
            this.findByName
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

    private findById = async  (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const id: string = req.params.id;

            const clothes = await this.ClothesService.findById(id);

            res.status(201).json({clothes});
        } catch (error) {
            next(new HttpException(400, 'Cannot found clothes'));
        }
    }

    private update = async  (
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

            const clothes = await this.ClothesService.update( 
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

    private findByName = async  (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const name: string = req.params.name as string;

            const clothes = await this.ClothesService.findByName(name);

            res.status(201).json({clothes});
        } catch (error) {
            next(new HttpException(400, 'Cannot found clothes'));
        }
    }

}

export default ClothesController;

