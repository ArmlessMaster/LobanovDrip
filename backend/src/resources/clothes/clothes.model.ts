import { Schema, model } from "mongoose";
import Clothes from '@/resources/clothes/clothes.interface'
import ClothesCount from '@/utils/interfaces/clothesCount.interface';

const ClothesSchema = new Schema(
    {
        name: {
            type: String,
        },
        imagesUrls: {
            type: Array<string>,
        },
        gifUrl: {
            type: String,
        },
        size: {
            type: Array<string>,
        },
        color: {
            type: Array<string>,
        },
        type: {
            type: String,
        },
        price: {
            type: Number,
        },
        company: {
            type: String,
        },
        clothesCount: {
            type: Array<ClothesCount>,
        },
    },
    { timestamps: true}
);

export default model<Clothes>('Clothes', ClothesSchema);
