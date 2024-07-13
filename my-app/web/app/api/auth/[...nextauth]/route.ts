import NextAuth, {User, Account, Profile, CallbacksOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import auth from "@/lib/api/auth.api";
import api from "@/config/axios.config";
import {JWT} from "next-auth/jwt";


const handler = NextAuth({
        // Configure one or more authentication providers
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID as string,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            }),
            // ...add more providers here
        ],
        callbacks: {
            async signIn({user, account, profile, email, credentials}) {
                return true
            },
            // async redirect({url, baseUrl}) {
            //     return baseUrl
            // },
            async jwt({token, account, profile}) {
                if (account) token.account = account
                return token
            },
            async session({session, user, token}) {
                if (token.account?.id_token) session.ServerResponse = (await auth.verifyGoogleToken(token.account?.id_token)).data.data
                return session
            },
            // async jwt({token, user, account, profile, isNewUser}) {
            //     return token
            // }
        }
    }
)
export {handler as GET, handler as POST}

