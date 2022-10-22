import {Document} from 'mongoose';
import {Schema} from 'mongoose';
import Image from '@/utils/interfaces/image.interface';

export default interface Modeling extends Document {
    name: string;
    size: string;
    color: string;
    user_id: Schema.Types.ObjectId;
    images: Array<Image>;
}