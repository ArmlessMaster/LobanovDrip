import {Router, Request, Response, NextFunction} from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/collection/collection.validation';
import CollectionService from '@/resources/collection/collection.service';
import CollectionModel from '@/resources/collection/collection.model'

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
            validationMiddleware(validate.create),
            this.create
        );
    }

    private create = async  (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const { 
                name,
                image,
                description,} = req.body;

            const collection = await this.CollectionService.create( 
                name,
                image,
                description,);

            res.status(201).json({collection});
        } catch (error) {
            next(new HttpException(400, 'Cannot create collection'));
        }
    }
}

export default CollectionController;
