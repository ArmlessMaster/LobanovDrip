import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi from 'joi';

function validationMiddleware(schema: Joi.Schema): RequestHandler {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const validationOptions = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        };

        try {
            // const value = await schema.validateAsync(
            //     req.body,
            //     validationOptions
            // );

            // ?
            let clothesData;
            let collectionData;
            if (req.body.clothesData) {
                clothesData = JSON.parse(req.body.clothesData);
                clothesData['images'] = req.files;
            }
            if (req.body.collectionData) {
     
                collectionData = JSON.parse(req.body.collectionData);
                collectionData['image'] = req.file;

            }

            const value = await schema.validateAsync(
                req.body.clothesData ? clothesData : req.body.collectionData ? collectionData : req.body,
                validationOptions
            );

            req.body = value;
            next();
        } catch (e: any) {
            const errors: string[] = [];
            e.details.forEach((error: Joi.ValidationErrorItem) => {
                errors.push(error.message);
            });
            res.status(400).send({ errors: errors });
        }
    };
}

export default validationMiddleware;
