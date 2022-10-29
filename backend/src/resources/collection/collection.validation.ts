import Joi from 'joi';

const create = Joi.object({
    name: Joi.string().required(),
    image: Joi.object().required(),
    description: Joi.string().required(),
});

const update = Joi.object({
    id: Joi.string().hex().length(24).required(),
    image: Joi.object(),
    name: Joi.string(),
    imageUrl: Joi.string(),
    description: Joi.string(),
});

const idValidaion = Joi.object({
    id: Joi.string().hex().length(24).required(),
});

const nameValidation = Joi.object({
    name: Joi.string().required(),
});

const urlValidation = Joi.object({
    name: Joi.string().uri().required(),
});

export default { create, idValidaion, nameValidation, urlValidation, update };
