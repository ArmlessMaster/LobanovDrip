import Joi from 'joi';

const create = Joi.object({
    name: Joi.string().required(),
    images: Joi.required(),
    size: Joi.array().items(Joi.string().required()).required(),
    color: Joi.array().items(Joi.string().required()).required(),
    type: Joi.string().required(),
    price: Joi.number().required(),
    company: Joi.string().required(),
    sale: Joi.number().required(),
    assemblage: Joi.string().required(),
    material: Joi.string().required(),
    care: Joi.string().required(),
    clothesCount: Joi.array()
        .items({
            size: Joi.string().required(),
            count: Joi.number().required(),
        })
        .required(),
    sex: Joi.string().required(),
    collection_id: Joi.string().hex().length(24).required(),
});

const update = Joi.object({
    id: Joi.string().hex().length(24).required(),
    name: Joi.string(),
    imagesUrls: Joi.array().items(Joi.string()),
    gifUrl: Joi.string(),
    images: Joi.array(),
    size: Joi.array().items(Joi.string()),
    color: Joi.array().items(Joi.string()),
    type: Joi.string(),
    price: Joi.number(),
    company: Joi.string(),
    sale: Joi.number(),
    assemblage: Joi.string(),
    material: Joi.string(),
    care: Joi.string(),
    clothesCount: Joi.array().items({
        size: Joi.string(),
        count: Joi.number(),
    }),
    sex: Joi.string(),
    collection_id: Joi.string().hex().length(24),
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

export default { create, update, idValidaion, nameValidation, urlValidation };
