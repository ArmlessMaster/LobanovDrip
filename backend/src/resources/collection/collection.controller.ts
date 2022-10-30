import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/collection/collection.validation';
import CollectionService from '@/resources/collection/collection.service';
import CollectionModel from '@/resources/collection/collection.model';
import authenticated from '@/middleware/authenticated.middleware';
const multer = require('multer');
const memoStorage = multer.memoryStorage();
const upload = multer({ memoStorage });

class CollectionController implements Controller {
    public path = '/collection';
    public router = Router();
    private CollectionService = new CollectionService();

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
        this.router.post(
            `${this.path}/update`,
            upload.array('pic'),
            validationMiddleware(validate.update),
            authenticated,
            this.update
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
        this.router.get(
            `${this.path}/findByName`,
            validationMiddleware(validate.nameValidation),
            this.findByName
        );
        this.router.delete(
            `${this.path}/image/delete`,
            validationMiddleware(validate.urlIdValidation),
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
            const collections = await this.CollectionService.getAll();

            res.status(201).json({ collections });
        } catch (error) {
            next(new HttpException(400, 'Cannot found collections'));
        }
    };

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { name, images, description } = req.body;

            const collection = await this.CollectionService.create(
                name,
                images,
                description
            );

            res.status(201).json({ collection });
        } catch (error) {
            next(new HttpException(400, 'Cannot create collection'));
        }
    };

    private update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id, name, images, description } = req.body;

            const collection = await this.CollectionService.update(
                id,
                name,
                images,
                description
            );

            res.status(201).json({ collection });
        } catch (error) {
            next(new HttpException(400, 'Cannot update collection'));
        }
    };

    private delete = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.body;

            const collection = await this.CollectionService.delete(id);

            res.status(201).json({ collection });
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
            const { id, url } = req.body;

            const collection = await this.CollectionService.deleteImage(
                id,
                url
            );

            res.status(201).json({ collection });
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

            const collection = await this.CollectionService.findById(id);

            res.status(201).json({ collection });
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

            const collection = await this.CollectionService.findByName(name);

            res.status(201).json({ collection });
        } catch (error) {
            next(new HttpException(400, 'Cannot found clothes'));
        }
    };
}

export default CollectionController;
