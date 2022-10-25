import { Schema, model } from "mongoose";
import Collection from '@/resources/collection/collection.interface'

const CollectionSchema = new Schema(
    {
        name: {
            type: String,
        },
        image: {
            type: String,
        },
        description: {
            type: String,
        },

    },
    { timestamps: true}
);

export default model<Collection>('Collection', CollectionSchema);
