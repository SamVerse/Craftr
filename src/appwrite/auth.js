import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {

        this.client
         .setEndpoint(conf.appwriteUrl)
         .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);

    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }
    async login ({email , password}) {
        try {
            return await this.account.createEmailPasswordSession(email , password)
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser () {
        try {
            const userStatus = await this.account.get()
            if (userStatus) {
                return userStatus;
            } else {
                return null;
            }
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error",error);
        }
    }

    async logout (){
        try {
            const userLogout = await this.account.deleteSessions()
            if (userLogout) {
                return userLogout
            } else {
                return null
            }
        } catch (error) {
            console.log("Appwrite service :: logout :: error",error);

        }
    }

     getUserById = async (userId) => {
        try {
          const user = await databases.getDocument(
            conf.appwriteDatabaseId,
            '665f1c0900327eb897b1', // Replace with your users collection ID
            userId
          );
          return user;
        } catch (error) {
          console.log("Appwrite service :: getUserById :: error", error);
          return null;
        }
      };
      
 
}


const authService = new AuthService();

export default authService