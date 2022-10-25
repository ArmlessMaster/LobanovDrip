import {Document} from 'mongoose';


export default interface Collection extends Document {
    name: string;
    image: string;
    description: string;

}