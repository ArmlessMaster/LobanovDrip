import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/clothes/clothes.validation';
import ClothesService from '@/resources/clothes/clothes.service';
import authenticated from '@/middleware/authenticated.middleware';
const multer = require('multer');
const memoStorage = multer.memoryStorage();
const upload = multer({ memoStorage });

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
            upload.array('pic'),
            validationMiddleware(validate.create),
            authenticated,
            this.create
        );
        this.router.delete(
            `${this.path}/delete`,
            validationMiddleware(validate.idValidaion),
            authenticated,
            this.delete
        );
        this.router.get(
            `${this.path}/findById`,
            validationMiddleware(validate.idValidaion),
            authenticated,
            this.findById
        );
        this.router.post(
            `${this.path}/update`,
            upload.array('pic'),
            validationMiddleware(validate.update),
            authenticated,
            this.update
        );
        this.router.get(
            `${this.path}/findByName`,
            validationMiddleware(validate.nameValidation),
            this.findByName
        );
        this.router.delete(
            `${this.path}/image/delete`,
            validationMiddleware(validate.urlValidation),
            authenticated,
            this.deleteImage
        );
        this.router.get(`${this.path}`, this.getAll);
    }

    private getAll = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const clothes = await this.ClothesService.getAll();

            res.status(201).json({ clothes });
        } catch (error) {
            next(new HttpException(400, 'Cannot found clothes'));
        }
    };

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {
                name,
                images,
                size,
                color,
                type,
                price,
                company,
                sale,
                material,
                care,
                clothesCount,
                sex,
                collection_id,
            } = req.body;

            const clothes = await this.ClothesService.create(
                name,
                images,
                size,
                color,
                type,
                price,
                company,
                sale,
                material,
                care,
                clothesCount,
                sex,
                collection_id
            );

            res.status(201).json({ clothes });
        } catch (error) {
            next(new HttpException(400, 'Cannot create clothes'));
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
                name,
                imagesUrls,
                gifUrl,
                images,
                size,
                color,
                type,
                price,
                company,
                sale,
                material,
                care,
                clothesCount,
                sex,
                collection_id,
            } = req.body;

            const imagesUrls1: Array<string> = [];
  
            const gifUrl1: string = "";

            const clothes = await this.ClothesService.update(
                id,
                name,
                imagesUrls ? imagesUrls : imagesUrls1,
                gifUrl ? gifUrl : gifUrl1,
                images,
                size,
                color,
                type,
                price,
                company,
                sale,
                material,
                care,
                clothesCount,
                sex,
                collection_id
            );

            res.status(201).json({ clothes });
        } catch (error) {
            next(new HttpException(400, 'Cannot update clothes'));
        }
    };

    private delete = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.body;

            const clothes = await this.ClothesService.delete(id);

            res.status(201).json({ clothes });
        } catch (error) {
            next(new HttpException(400, 'Cannot delete clothes'));
        }
    };

    private deleteImage = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { url } = req.body;

            await this.ClothesService.deleteImage(url);

            res.status(201).json({ message: `Image deleted` });
        } catch (error) {
            next(
                new HttpException(
                    400,
                    'Cannot delete image by url (Image not found)'
                )
            );
        }
    };

    private findById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.body;

            const clothes = await this.ClothesService.findById(id);

            res.status(201).json({ clothes });
        } catch (error) {
            next(new HttpException(400, 'Cannot found clothes'));
        }
    };

    private findByName = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { name } = req.body;

            const clothes = await this.ClothesService.findByName(name);

            res.status(201).json({ clothes });
        } catch (error) {
            next(new HttpException(400, 'Cannot found clothes'));
        }
    };
}

export default ClothesController;
