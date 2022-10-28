import AccountModel from '@/resources/account/account.model';
import token from '@/utils/token';
import Account from '@/resources/account/account.interface'

class AccountService {
    private account = AccountModel;

    /**
     * Register a new account
     */
    public async register(
        email: string, 
        password: string, 
        name: string, 
        ): Promise<string | Error> {
        try {

            const accountExists= await this.account.findOne({email});

            if (accountExists) {
                throw new Error('Account already exists'); 
            }

            const account = await this.account.create({email, password, name });

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
                throw new Error('Unable to find account with that email address'); 
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
    * Attempt to change password
    */

    public async changePassword(
        email: string, 
        password: string, 
        ): Promise<string | Error> {
        try {
            const account = await this.account.findOneAndUpdate({email}, {password}, {new: true});    

            if (!account) {
                throw new Error('Unable to change password with that email address'); 
            }

            return account.password;
        } catch (error) {
            throw new Error('Unable to change password');
        }
    }

    /**
    * Attempt to update account
    */

    public async update(
        id: string,
        email: string,
        password: string,
        name: string,
        phone: string,
        role: string,
        adress: string,
        ): Promise<Account | Error> {
        try {
             const account = await this.account.findOneAndUpdate({_id: id}, {email, password, name, phone, role, adress}, {new: true});  

             if (!account) {
                throw new Error('Unable to update account with that id'); 
            }

            return account;
        } catch (error) {
            throw new Error('Unable to update account');
        }
    }

    /**
    * Attempt to delete account
    */

    public async delete( 
        id: string
        ): Promise<Account | Error> {
            try {
                const account = await this.account.findOneAndDelete({ _id: id });   
       
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