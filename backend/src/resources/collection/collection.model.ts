import { Schema, model } from 'mongoose';
import Collection from '@/resources/collection/collection.interface';

const CollectionSchema = new Schema(
    {
        name: {
            type: String,
        },
        imageUrl: {
            type: String,
        },
        description: {
            type: String,
        },
    },
    { timestamps: true }
);

export default model<Collection>('Collections', CollectionSchema);
