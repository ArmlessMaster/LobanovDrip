import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/clothes/clothes.validation';
import ClothesService from '@/resources/clothes/clothes.service';
import authenticated from '@/middleware/authenticated.middleware';
import Props from '@/utils/types/props.type';
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
        this.router.put(
            `${this.path}/update`,
            upload.array('pic'),
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
        this.router.delete(
            `${this.path}/image/delete`,
            validationMiddleware(validate.imageDelete),
            authenticated,
            this.deleteImage
        );
        this.router.get(`${this.path}`, this.get);
        this.router.get(
            `${this.path}/find`,
            validationMiddleware(validate.find),
            this.find
        );
        this.router.get(
            `${this.path}/filter`,
            validationMiddleware(validate.filter),
            this.filter
        );
        this.router.get(
            `${this.path}/count/exist`,
            validationMiddleware(validate.exist),
            this.exist
        );
        this.router.get(`${this.path}/find/sales`, this.findBySales);
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {
                name,
                images,
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
                _id,
                name,
                imagesUrls,
                gifUrl,
                images,
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

            const gifUrl1: string = '';

            const clothes = await this.ClothesService.update(
                _id,
                name,
                imagesUrls ? imagesUrls : imagesUrls1,
                gifUrl ? gifUrl : gifUrl1,
                images,
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

            res.status(200).json({ clothes });
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
            const { _id } = req.body;
            const clothes = await this.ClothesService.delete(_id);

            res.status(200).json({ clothes });
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
            const { _id, url } = req.body;

            const clothes = await this.ClothesService.deleteImage(_id, url);

            res.status(200).json({ clothes });
        } catch (error) {
            next(
                new HttpException(
                    400,
                    'Cannot delete image by url (Image not found)'
                )
            );
        }
    };

    private get = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const clothes = await this.ClothesService.get();

            res.status(200).json({ clothes });
        } catch (error) {
            next(new HttpException(400, 'Cannot found clothes'));
        }
    };

    private find = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const props = req.body as Props;

            const clothes = await this.ClothesService.find(props);

            res.status(200).json({ clothes });
        } catch (error) {
            next(new HttpException(400, 'Cannot found clothes'));
        }
    };

    private filter = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { type, from_price, to_price, size } = req.body;

            const clothes = await this.ClothesService.filter(
                type,
                from_price,
                to_price,
                size
            );

            res.status(201).json({ clothes });
        } catch (error) {
            next(new HttpException(400, 'Cannot found filter clothes'));
        }
    };

    private findBySales = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const clothes = await this.ClothesService.findBySales();

            res.status(200).json({ clothes });
        } catch (error) {
            next(new HttpException(400, 'Cannot found clothes'));
        }
    };

    private exist = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { _id } = req.body;

            const exist = await this.ClothesService.exist(_id);

            res.status(200).json({ exist });
        } catch (error) {
            next(
                new HttpException(
                    400,
                    'Failed to check if the clothes are over'
                )
            );
        }
    };
}

export default ClothesController;
