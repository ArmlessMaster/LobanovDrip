import { Schema, model } from 'mongoose';
import Set from '@/resources/set/set.interface';

const SetSchema = new Schema(
    {
        name: {
            type: String,
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'Accounts',
        },
        clothes_id: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Clothes',
            },
        ],
    },
    { timestamps: true }
);

export default model<Set>('Sets', SetSchema);
