import Joi from 'joi';

const create = Joi.object({
    name: Joi.string().required(),
    images: Joi.array().required(),
    description: Joi.string().required(),
});

const update = Joi.object({
    id: Joi.string().hex().length(24).required(),
    images: Joi.array(),
    name: Joi.string(),
    description: Joi.string(),
});

const id = Joi.object({
    id: Joi.string().hex().length(24).required(),
});

const name = Joi.object({
    name: Joi.string().required(),
});

const urlId = Joi.object({
    id: Joi.string().hex().length(24).required(),
    url: Joi.string().uri().required(),
});

export default { create, id, name, urlId, update };
