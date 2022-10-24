import {Document} from 'mongoose';

export default interface Account extends Document {
    email: string;
    password: string;
    name: string;
    phone: string;
    role: string;
    adress: string;
    isGoogle: boolean;

    isValidPassword(passwod: string): Promise<Error | boolean>;
}