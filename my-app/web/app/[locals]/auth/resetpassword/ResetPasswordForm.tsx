'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import auth, { loginformSchema } from '@/lib/api/auth.api';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Bounce, Id, toast, ToastContainer } from 'react-toastify';
import { z } from 'zod';
import { Spin } from 'antd';
import { useTranslations } from 'next-intl';
import { signIn } from '@/lib/store/userInfoSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useRouter, useParams } from 'next/navigation';
import useEnvVariable from '@/hook/useEnvVariable';
import dummyjson from '@/test/DummyJSON';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff } from 'lucide-react';

export default function ResetPasswordForm() {
  const [password, setpassword] = useState<string>();

  /**
   * This function initializes the reset password form schema using Zod library.
   * It defines the validation rules for the password and confirm password fields.
   *
   * @remarks
   * The `resetPasswordFormSchema` is a Zod object that represents the structure and validation rules for the reset password form.
   * The `password` field is required and must satisfy the following conditions:
   * - It must be a string.
   * - It must contain at least one uppercase English letter.
   *
   * The `confirmPassword` field is required and must be a string.
   *
   * @returns {z.ZodObject<z.ZodType<any, any, any>>} - The reset password form schema.
   */
  const upperCase = /(?=.*?[A-Z])/;
  const lowerCase = /(?=.*?[a-z])/;
  const digit = /(?=.*?[0-9])/;
  const specialChar = /(?=.*?[.#?!@$%^&*-])/;
  const passwordSchema = z.object({
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .refine((value) => upperCase.test(value), {
        message: 'Password must contain at least one uppercase letter',
      })
      .refine((value) => lowerCase.test(value), {
        message: 'Password must contain at least one lowercase letter',
      })
      .refine((value) => digit.test(value), {
        message: 'Password must contain at least one digit',
      })
      .refine((value) => specialChar.test(value), {
        message: 'Password must contain at least one special character',
      }),

    confirmPassword: z.string().refine(
      (value) => {
        return value === form.getValues('password');
      },
      {
        message: 'Password is not match',
      }
    ),
  });

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
  });

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  // dispatch(setAuthState(!authStatus));
  // 2. Define a submit handler.
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const params = useParams<{ locals: string }>();
  const [viewPassword, setviewPassword] = useState(false);
  const [viewRePassword, setviewRePassword] = useState(false);

  function onSubmit(values: z.infer<typeof passwordSchema>) {
    setpassword(values.password);
    toast({
      title: 'Reset Password',
    });

    router.push(`/${params.locals}/home`);
  }
  const { toast } = useToast();
  const router = useRouter();

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className=" flex justify-center items-center gap-4">
                    <Input
                      placeholder="***********"
                      type={viewPassword ? 'text' : 'password'}
                      {...field}
                    />
                    <div onClick={() => setviewPassword(!viewPassword)}>
                      {viewPassword ? <EyeOff></EyeOff> : <Eye></Eye>}
                    </div>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <div className=" flex justify-center items-center gap-4">
                    <Input
                      placeholder="***********"
                      type={viewRePassword ? 'text' : 'password'}
                      {...field}
                    />
                    <div onClick={() => setviewRePassword(!viewRePassword)}>
                      {viewRePassword ? <EyeOff></EyeOff> : <Eye></Eye>}
                    </div>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isDisabled} type="submit" className="flex w-full">
            Login
          </Button>
        </form>
      </Form>
    </>
  );
}
