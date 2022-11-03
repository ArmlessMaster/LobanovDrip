import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import Account from '@/resources/account/account.interface';

const AccountSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
        },
        name: {
            type: String,
        },
        phone: {
            type: String,
            trim: true,
        },
        role: {
            type: String,
            default: 'User',
        },
        adress: {
            type: String,
        },
    },
    { timestamps: true }
);

AccountSchema.pre<Account>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;

    next();
});

AccountSchema.pre<Account>('findOneAndUpdate', async function (this) {
    const update: any = { ...this.getUpdate() };
    if (update.password) {
        update.password = await bcrypt.hash(update.password, 10);
        this.setUpdate(update)
    }
});

AccountSchema.methods.isValidPassword = async function (
    password: string
): Promise<Error | boolean> {
    return await bcrypt.compare(password, this.password);
};

export default model<Account>('Accounts', AccountSchema);
