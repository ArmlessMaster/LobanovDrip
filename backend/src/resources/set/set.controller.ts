import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/set/set.validation';
import SetService from '@/resources/set/set.service';
import SetModel from '@/resources/set/set.model';
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
        this.router.delete(`${this.path}/delete`, authenticated, this.delete);
        this.router.post(`${this.path}/update`, authenticated, this.update);
        this.router.get(`${this.path}/findById`, this.findById);
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
            const { id } = req.body;

            const set = await this.SetService.delete(id);

            res.status(201).json({ set });
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
            const { id, name, user_id, clothes_id } = req.body;

            const set = await this.SetService.update(
                id,
                name,
                user_id,
                clothes_id
            );

            res.status(201).json({ set });
        } catch (error) {
            next(new HttpException(400, 'Cannot change set'));
        }
    };

    private findById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.body;

            const set = await this.SetService.findById(id);

            res.status(200).json({ set });
        } catch (error) {
            next(new HttpException(400, 'Cannot get sets'));
        }
    };
}

export default SetController;
