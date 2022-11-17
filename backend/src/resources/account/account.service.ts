import AccountModel from '@/resources/account/account.model';
import token from '@/utils/token';
import Account from '@/resources/account/account.interface';
import { Schema } from 'mongoose';
import OrderModel from '@/resources/order/order.model';

class AccountService {
    private account = AccountModel;
    private order = OrderModel;
    /**
     * Register a new account
     */
    public async register(
        email: string,
        password: string,
        name: string,
        surname: string
    ): Promise<string | Error> {
        try {
            const accountExists = await this.account.findOne({ email });

            if (accountExists) {
                throw new Error('Account already exists');
            }

            const account = await this.account.create({
                email,
                password,
                name,
                surname,
            });

            const accesToken = token.createToken(account);

            await this.order.create({ user_id: account._id });

            return accesToken;
        } catch (error) {
            throw new Error('Unable to create account');
        }
    }

    /**
     * Attempt to login a account
     */

    public async login(
        email: string,
        password: string
    ): Promise<string | Error> {
        try {
            const account = await this.account.findOne({ email });
            if (!account) {
                throw new Error(
                    'Unable to find account with that email address'
                );
            }

            if (await account.isValidPassword(password)) {
                const accesToken = token.createToken(account);
                return accesToken;
            } else {
                throw new Error('Wrong credentials given');
            }
        } catch (error) {
            throw new Error('Unable to login account');
        }
    }

    /**
     * Attempt to login a google account
     */
    public async googleLogin(
        email: string,
        passwordGoogle: string,
        name: string
    ): Promise<string | Error> {
        try {
            let account = await this.account.findOne({ email });
            if (!account) {
                account = await this.account.create({
                    email,
                    passwordGoogle,
                    name,
                });
                await this.order.create({ user_id: account._id });
            }
            if (await account.isValidPasswordGoogle(passwordGoogle)) {
                const accesToken = token.createToken(account);
                return accesToken;
            } else {
                await this.account.findOneAndUpdate(
                    { _id: account._id },
                    { passwordGoogle }
                );
                const accesToken = token.createToken(account);
                return accesToken;
            }
        } catch (error) {
            throw new Error('Unable to login account');
        }
    }

    /**
     * Attempt to update account
     */

    public async update(
        _id: Schema.Types.ObjectId,
        email: string,
        password: string,
        name: string,
        phone: string,
        role: string,
        surname: string,
        patronymic: string,
        region: string,
        city: string,
        novaposhta: string
    ): Promise<Account | Error> {
        try {
            const account = await this.account
                .findByIdAndUpdate(
                    _id,
                    {
                        email,
                        password,
                        name,
                        phone,
                        role,
                        surname,
                        patronymic,
                        region,
                        city,
                        novaposhta,
                    },
                    { new: true }
                )
                .select(['-password', '-passwordGoogle'])
                .exec();

            if (!account) {
                throw new Error('Unable to update account with that id');
            }

            return account;
        } catch (error) {
            throw new Error('Unable to update account');
        }
    }

    /**
     * Attempt to update account password
     */
    public async updatePassword(
        _id: Schema.Types.ObjectId,
        new_password: string,
        password: string
    ): Promise<Account | Error> {
        try {
            const acc = await this.account.findOne({ _id });

            if (!acc) {
                throw new Error('Unable to find account with that id');
            }

            if (await acc.isValidPassword(password)) {
                const account = await this.account
                    .findOneAndUpdate(
                        { _id },
                        { password: new_password },
                        { new: true }
                    )
                    .select(['-password', '-passwordGoogle'])
                    .exec();

                if (!account) {
                    throw new Error('Unable to update account with that id');
                }

                return account;
            } else {
                throw new Error('Wrong credentials given');
            }
        } catch (error) {
            throw new Error('Unable to update account');
        }
    }

    /**
     * Attempt to delete account
     */

    public async delete(_id: Schema.Types.ObjectId): Promise<Account | Error> {
        try {
            const account = await this.account
                .findByIdAndDelete(_id)
                .select(['-password', '-passwordGoogle'])
                .exec();

            if (!account) {
                throw new Error('Unable to delete account with that id');
            }

            return account;
        } catch (error) {
            throw new Error('Unable to delete account');
        }
    }
}

export default AccountService;
