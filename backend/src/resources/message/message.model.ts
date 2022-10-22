import { Schema, model } from "mongoose";
import Message from '@/resources/message/message.interface'

const MessageSchema = new Schema(
    {
        text: {
            type: String,
        },
        readed: {
            type: Boolean,
        },
        dialog: {
            type: Schema.Types.ObjectId,
            ref: 'Dialogs'
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'Accounts'
        },
    },
    { timestamps: true}
);

export default model<Message>('Messages', MessageSchema);
