import { Schema, model } from 'mongoose';
import Dialog from '@/resources/dialog/dialog.interface';

const DialogSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'Accounts',
        },
        moderator_id: {
            type: Schema.Types.ObjectId,
            ref: 'Accounts',
        },
        lastMessage_id: {
            type: Schema.Types.ObjectId,
            ref: 'Messages',
        },
    },
    { timestamps: true }
);

export default model<Dialog>('Dialogs', DialogSchema);
