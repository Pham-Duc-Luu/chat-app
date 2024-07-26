import api from '@/config/axios.config';
import { z } from 'zod';
import { IUserInfo } from '../store/userInfoSlice';
import { HttpResponse } from '@/util/httpResponse';

export interface IToken {
  access_token: string;
  refresh_token: string;
}

export const loginformSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password is too short' })
    .max(20, { message: 'Password is too long' }),
});

// * At least one upper case English letter
const uppperCase = /^(?=.*?[A-Z])$/;
const lowercase = /^(?=.*?[a-z])$/;
const digit = /^(?=.*?[0-9])$/;
const specialChar = /^(?=.*?[.#?!@$%^&*-])$/;

export const resetPasswordFormSchema = z.object({
  password: z
    .string()
    .refine((value) => uppperCase.test(value), { message: '' }),
  confirmPassword: z.string(),
});

export const SignUpSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: 'Password is too short' })
      .max(20, { message: 'Password is too long' }),
    username: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // path of error
  });

class Auth {
  public signIn = (values: z.infer<typeof loginformSchema>) => {
    return api.post<
      HttpResponse<{
        token: IToken;
        user: Partial<Pick<IUserInfo, 'id' | 'email' | 'avatar' | 'username'>>;
      }>
    >('/auth/sign-in', values);
  };

  public signUp = (values: z.infer<typeof SignUpSchema>) => {
    return api.post<
      HttpResponse<{
        token: IToken;
        user: Partial<Pick<IUserInfo, 'id' | 'email' | 'avatar' | 'username'>>;
      }>
    >('/auth/sign-up', values);
  };
  public GoogleOAuth = () => {
    return api.get<
      HttpResponse<{
        token: IToken;
        user: Partial<Pick<IUserInfo, 'id' | 'email' | 'avatar' | 'username'>>;
      }>
    >('/auth/google/login/success', { withCredentials: true });
  };
  public getPublicKey = () => {
    return process.env.NEXT_PUBLIC_PUBLIC_KEY as string;
  };
  public verifyGoogleToken = (token: string) => {
    return api.get<
      HttpResponse<{
        token: IToken;
        user: Partial<Pick<IUserInfo, 'id' | 'email' | 'avatar' | 'username'>>;
      }>
    >('/auth/google/login/success', {
      headers: { Authorization: `Bearer ${token}` },
    });
  };
}

const auth = new Auth();

export default auth;
