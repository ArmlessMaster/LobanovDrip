import { Document } from 'mongoose';
import { Schema } from 'mongoose';

export default interface Message extends Document {
    text: string;
    readed: boolean;
    dialog: Schema.Types.ObjectId;
    author: Schema.Types.ObjectId;
}
