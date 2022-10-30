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
    material: Joi.string().required(),
    care: Joi.string().required(),
    clothesCount: Joi.array()
        .items({
            size: Joi.string().required(),
            count: Joi.number().required(),
        })
        .required(),
    sex: Joi.string().required(),
    collection_id: Joi.string().hex().length(24),
});

const update = Joi.object({
    id: Joi.string().hex().length(24).required(),
    name: Joi.string(),
    imagesUrls: Joi.array().items(Joi.string()).required(),
    gifUrl: Joi.string().required(),
    images: Joi.array(),
    size: Joi.array().items(Joi.string()),
    color: Joi.array().items(Joi.string()),
    type: Joi.string(),
    price: Joi.number(),
    company: Joi.string(),
    sale: Joi.number(),
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

const urlIdValidation = Joi.object({
    id: Joi.string().hex().length(24).required(),
    url: Joi.string().uri().required(),
});

const typeValidation = Joi.object({
    type: Joi.string().required(),
});

const sexValidation = Joi.object({
    sex: Joi.string().required(),
});

const filterValidaion = Joi.object({
    type: Joi.string().required(),
    from_price: Joi.number(),
    to_price: Joi.number(),
    size: Joi.array().items(Joi.string()),
});

export default {
    create,
    update,
    idValidaion,
    nameValidation,
    urlIdValidation,
    typeValidation,
    sexValidation,
    filterValidaion,
};
