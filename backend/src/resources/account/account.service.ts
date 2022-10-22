import AccountModel from '@/resources/account/account.model';
import token from '@/utils/token'

class AccountService {
    private account = AccountModel;

    /**
     * Register a new account
     */
    public async regiser(
        email: string, 
        password: string, 
        ): Promise<string | Error> {
        try {
            const account = await this.account.create({email, password});

            const accesToken = token.createToken(account);

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
        password: string, 
        ): Promise<string | Error> {
        try {
            const account = await this.account.findOne({email});

            if (!account) {
                throw new Error('Unable to find account with that Email Address'); 
            }
            
            if (await account.isValidPassword(password)) {
                return token.createToken(account);
            } else {
                throw new Error('Wrong credentials given');
            }
        } catch (error) {
            throw new Error('Unable to login account');
        }
    }
}

export default AccountService;