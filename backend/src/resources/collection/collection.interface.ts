import { Document } from 'mongoose';

export default interface Collection extends Document {
    name: string;
    imageUrl: string;
    gifUrl: string;
    description: string;
}
