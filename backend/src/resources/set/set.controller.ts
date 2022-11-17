import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/set/set.validation';
import SetService from '@/resources/set/set.service';
import authenticated from '@/middleware/authenticated.middleware';

class SetController implements Controller {
    public path = '/set';
    public router = Router();
    private SetService = new SetService();

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
        this.router.get(`${this.path}`, this.get);
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
            const { name, user_id, clothes_id } = req.body;

            const set = await this.SetService.create(name, user_id, clothes_id);

            res.status(201).json({ set });
        } catch (error) {
            next(new HttpException(400, 'Cannot create set'));
        }
    };

    private delete = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { _id } = req.body;

            const set = await this.SetService.delete(_id);

            res.status(200).json({ set });
        } catch (error) {
            next(new HttpException(400, 'Cannot delete set'));
        }
    };

    private update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { _id, name, user_id, clothes_id } = req.body;

            const set = await this.SetService.update(
                _id,
                name,
                user_id,
                clothes_id
            );

            res.status(200).json({ set });
        } catch (error) {
            next(new HttpException(400, 'Cannot change set'));
        }
    };

    private get = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const sets = await this.SetService.get();

            res.status(200).json({ sets });
        } catch (error) {
            next(new HttpException(400, 'Cannot found collections'));
        }
    };

    private find = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const props = req.body;

            const sets = await this.SetService.find(props);

            res.status(200).json({ sets });
        } catch (error) {
            next(new HttpException(400, 'Cannot get sets'));
        }
    };
}

export default SetController;
