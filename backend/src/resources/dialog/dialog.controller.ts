import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/dialog/dialog.validation';
import DialogService from '@/resources/dialog/dialog.service';

class DialogController implements Controller {
    public path = '/dialog';
    public router = Router();
    private DialogService = new DialogService();

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

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { user_id, moderator_id, lastMessage_id } = req.body;

            const dialog = await this.DialogService.create(
                user_id,
                moderator_id,
                lastMessage_id
            );

            res.status(201).json({ dialog });
        } catch (error) {
            next(new HttpException(400, 'Cannot create dialog'));
        }
    };
}

export default DialogController;
