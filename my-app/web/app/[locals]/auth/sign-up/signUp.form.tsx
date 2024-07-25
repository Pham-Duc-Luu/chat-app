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
import auth, { loginformSchema, SignUpSchema } from '@/lib/api/auth.api';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Bounce, toast } from 'react-toastify';
import { z } from 'zod';

import { useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setUserInfo, signUp } from '@/lib/store/userInfoSlice';
import { Spin } from 'antd';
import { useParams, useRouter } from 'next/navigation';

export default function SignUpForm() {
  const t = useTranslations('authentication.sign_up');
  const t1 = useTranslations('authentication.sign_in');
  const dispatch = useAppDispatch();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const params = useParams<{ locals: string }>();
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
  });

  const user = useAppSelector((state) => state.user);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SignUpSchema>) {
    setIsDisabled(true);
    toast('Loading...', {
      position: 'top-center',
      icon: <Spin></Spin>,
      hideProgressBar: false,
      draggable: true,
      theme: 'colored',
      transition: Bounce,
    });
    dispatch(signUp(values));
  }

  const router = useRouter();
  useEffect(() => {
    if (user.status !== 'loading') {
      setIsDisabled(false);
      toast.dismiss();
    }

    if (user.status === 'completed') {
      toast.success(user.entities.userinfo.username, {
        position: 'top-center',
        autoClose: 500,
        theme: 'colored',
        onClose: () => {
          router.push(`/${params.locals}/home`);
        },
      });
    }
    if (user.status === 'failed') {
      toast.error(user.message, {
        position: 'top-center',
        theme: 'colored',
      });
    }
  }, [user.status]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.email.lable')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('form.email.placeholder')} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.username.lable')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.password.lable')}</FormLabel>
              <FormControl>
                <Input placeholder="***********" type="password" {...field} />
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
              <FormLabel>{t('form.repassword.lable')}</FormLabel>
              <FormControl>
                <Input placeholder="***********" type="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {t('form.remeber_me_button')}
            </label>
          </div>
          <Link
            href={'/forgot-password'}
            className="font-medium underline underline-offset-4">
            {t('form.forgot_password')}
          </Link>
        </div>
        <Button type="submit" className="flex w-full">
          {t('title')}
        </Button>
      </form>
    </Form>
  );
}
