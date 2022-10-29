import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/account/account.validation';
import AccountService from '@/resources/account/account.service';
import authenticated from '@/middleware/authenticated.middleware';

class AccountController implements Controller {
    public path = '/account';
    public router = Router();
    private AccountService = new AccountService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/register`,
            validationMiddleware(validate.register),
            this.register
        );
        this.router.post(
            `${this.path}/login`,
            validationMiddleware(validate.login),
            this.login
        );
        this.router.post(
            `${this.path}/changePassword`,
            validationMiddleware(validate.changePassword),
            authenticated,
            this.changePassword
        );
        this.router.post(
            `${this.path}/update`,
            validationMiddleware(validate.update),
            authenticated,
            this.update
        );
        this.router.delete(
            `${this.path}/delete`,
            validationMiddleware(validate.deleteAccount),
            authenticated,
            this.delete
        );
        this.router.get(`${this.path}`, authenticated, this.getAccount);
    }

    private register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email, password, name } = req.body;

            const token = await this.AccountService.register(
                email,
                password,
                name
            );

            res.status(201).json({ token });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email, password } = req.body;

            const token = await this.AccountService.login(email, password);

            res.status(200).json({ token });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private changePassword = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id, password } = req.body;

            const new_password = await this.AccountService.changePassword(
                id,
                password
            );

            res.status(201).json({ new_password });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id, email, password, name, phone, role, adress } = req.body;

            const account = await this.AccountService.update(
                id,
                email,
                password,
                name,
                phone,
                role,
                adress
            );

            res.status(201).json({ account });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private delete = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.body;

            const account = await this.AccountService.delete(id);

            res.status(201).json({ account });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private getAccount = (
        req: Request,
        res: Response,
        next: NextFunction
    ): Response | void => {
        if (!req.account) {
            return next(new HttpException(404, 'No logged in account'));
        }

        res.status(200).send({ data: req.account });
    };
}

export default AccountController;
