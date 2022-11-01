import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/modeling/modeling.validation';
import ModelingService from '@/resources/modeling/modeling.service';
import ModelingModel from '@/resources/modeling/modeling.model';
import authenticated from '@/middleware/authenticated.middleware';

class ModelingController implements Controller {
    public path = '/modeling';
    public router = Router();
    private ModelingService = new ModelingService();

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
            const { name, size, color, user_id, images } = req.body;

            const modeling = await this.ModelingService.create(
                name,
                size,
                color,
                user_id,
                images
            );

            res.status(201).json({ modeling });
        } catch (error) {
            next(new HttpException(400, 'Cannot create modeling'));
        }
    };

    private delete = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { _id } = req.body;

            const modeling = await this.ModelingService.delete(_id);

            res.status(200).json({ modeling });
        } catch (error) {
            next(new HttpException(400, 'Cannot delete model'));
        }
    };

    private update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { _id, name, size, color, user_id, images } = req.body;

            const collection = await this.ModelingService.update(
                _id,
                name,
                size,
                color,
                user_id,
                images
            );

            res.status(200).json({ collection });
        } catch (error) {
            next(new HttpException(400, 'Cannot change model'));
        }
    };

    private get = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const modeling = await this.ModelingService.get();

            res.status(200).json({ modeling });
        } catch (error) {
            next(new HttpException(400, 'Cannot found modeling'));
        }
    };

    private find = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const props = req.body;

            const modeling = await this.ModelingService.find(props);

            res.status(200).json({ modeling });
        } catch (error) {
            next(new HttpException(400, 'Cannot get modeling'));
        }
    };
}

export default ModelingController;
