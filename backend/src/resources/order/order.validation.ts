import Joi from 'joi';

const create = Joi.object({
    user_id: Joi.string().hex().length(24).required(),
    moderator_id: Joi.string().hex().length(24),
    status: Joi.string()
        .default('cart')
        .valid(
            'cart',
            'processing',
            'road',
            'waiting',
            'cancellation',
            'completed'
        )
        .required(),
    adress: Joi.string(),
    phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/),
    name: Joi.string(),
    email: Joi.string().email(),
    invoice: Joi.string(),
    status_update: Joi.date(),
    payment_type: Joi.string(),
});

const update = Joi.object({
    _id: Joi.string().hex().length(24).required(),
    user_id: Joi.string().hex().length(24),
    moderator_id: Joi.string().hex().length(24),
    status: Joi.string().valid(
        'cart',
        'processing',
        'road',
        'waiting',
        'cancellation',
        'completed'
    ),
    adress: Joi.string(),
    phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/),
    name: Joi.string(),
    email: Joi.string().email(),
    invoice: Joi.string(),
    status_update: Joi.date(),
    payment_type: Joi.string(),
    account_id: Joi.string().hex().length(24),
});

const delete0 = Joi.object({
    _id: Joi.string().hex().length(24).required(),
});

const find = Joi.object({
    _id: Joi.string().hex().length(24),
    user_id: Joi.string().hex().length(24),
    moderator_id: Joi.string().hex().length(24),
    status: Joi.string()
        .default('cart')
        .valid(
            'cart',
            'processing',
            'road',
            'waiting',
            'cancellation',
            'completed'
        ),
    adress: Joi.string(),
    phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/),
    name: Joi.string(),
    email: Joi.string().email(),
    invoice: Joi.string(),
    status_update: Joi.date(),
    payment_type: Joi.string(),
});

export default { create, update, delete0, find };
