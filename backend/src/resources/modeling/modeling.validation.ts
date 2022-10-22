import Joi from 'joi';

const create = Joi.object({
    name: Joi.string().required(),
    size: Joi.string().required(),
    color: Joi.string().required(),
    user_id: Joi.string().hex().length(24).required(),
    images: Joi.array().items({
        imageUrl: Joi.string().required(),
        x_coordinate: Joi.number().required(),
        y_coordinate: Joi.number().required(),
    }).required(),
});

export default {create};
