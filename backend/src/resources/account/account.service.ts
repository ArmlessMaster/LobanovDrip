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
        isGoogle: boolean
        ): Promise<string | Error> {
        try {
            const account = await this.account.create({email, password, isGoogle});

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

    public async changePassword(
        email: string, 
        password: string, 
        ): Promise<void | Error> {
        try {
             await this.account.findOneAndUpdate({email}, {password});    
   
        } catch (error) {
            throw new Error('Unable to change password');
        }
    }

    public async update(
        id: string,
        email: string,
        password: string,
        name: string,
        phone: string,
        role: string,
        adress: string,
        ): Promise<void | Error> {
        try {
             await this.account.findOneAndUpdate({_id: id}, {email, password, name, phone, role, adress});    
   
        } catch (error) {
            throw new Error('Unable to update account');
        }
    }

    public async delete( 
        id: string
        ): Promise<void | Error> {
            try {
                 await this.account.deleteOne({ _id: id });   
       
            } catch (error) {
                throw new Error('Unable to delete account');
            }
    }

}

export default AccountService;