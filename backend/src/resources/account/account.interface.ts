import {Document} from 'mongoose';

export default interface Account extends Document {
    email: string;
    password: string;
    name: string;
    phone: string;
    role: string;
    adress: string;


    getUpdate(): Promise<Error | Object>;
    setUpdate(obj: Object): Promise<Error | boolean>;
    isValidPassword(passwod: string): Promise<Error | boolean>;
}