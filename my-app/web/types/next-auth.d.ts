import NextAuth, {DefaultSession, User, Profile, Account} from "next-auth"
import {HttpResponse} from "@/util/httpResponse";
import {IUserInfo} from "@/lib/store/userInfoSlice";
import {IToken} from "@/lib/api/auth.api";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session extends DefaultSession {
        user: User & {
            address: string
        }

        ServerResponse?:
            {
                token: IToken;
                user: Partial<Pick<IUserInfo, 'id' | 'email' | 'avatar' | 'username'>>;
            }

    }
}

import {JWT} from "next-auth/jwt"

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */

        account?: Account
    }
}