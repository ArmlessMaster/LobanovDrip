import Joi from 'joi';

const create = Joi.object({
    clothes_id: Joi.string().hex().length(24).required(),
    order_id: Joi.string().hex().length(24).required(),
    count: Joi.number().required(),
    size: Joi.string().required(),
    color: Joi.string().required(),
});

export default { create };
