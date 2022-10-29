import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/message/message.validation';
import MessageService from '@/resources/message/message.service';

class RecordController implements Controller {
    public path = '/message';
    public router = Router();
    private MessageService = new MessageService();

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
            const { text, readed, dialog, author } = req.body;

            const message = await this.MessageService.create(
                text,
                readed,
                dialog,
                author
            );

            res.status(201).json({ message });
        } catch (error) {
            next(new HttpException(400, 'Cannot create message'));
        }
    };
}

export default RecordController;
