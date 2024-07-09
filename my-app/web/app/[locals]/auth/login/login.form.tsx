'use client';
import {Button} from '@/components/ui/button';
import {Checkbox} from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import auth, {loginformSchema} from '@/lib/api/auth.api';
import {zodResolver} from '@hookform/resolvers/zod';
import axios, {AxiosError} from 'axios';
import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Bounce, Id, toast, ToastContainer} from 'react-toastify';
import {z} from 'zod';
import {Spin} from 'antd';
import {useTranslations} from 'next-intl';
import {setAuthState} from '@/lib/store/authSlice';
import {signIn} from '@/lib/store/userInfoSlice';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {useRouter, useParams} from 'next/navigation';

export default function LoginForm() {
    const form = useForm<z.infer<typeof loginformSchema>>({
        resolver: zodResolver(loginformSchema),
    });
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    // dispatch(setAuthState(!authStatus));
    // 2. Define a submit handler.
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const params = useParams<{ locals: string }>();

    function onSubmit(values: z.infer<typeof loginformSchema>) {
        setIsDisabled(true);
        toast('Loading...', {
            position: 'top-center',
            icon: <Spin></Spin>,
            hideProgressBar: false,
            draggable: true,
            theme: 'colored',
            transition: Bounce,
        });
        dispatch(signIn(values));
    }

    const router = useRouter();
    useEffect(() => {
        console.log(user);

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
        <>
            <ToastContainer
                stacked
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>email</FormLabel>
                                <FormControl>
                                    <Input placeholder="example@example.com" {...field} />
                                </FormControl>

                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="***********" type="password" {...field} />
                                </FormControl>

                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-between">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms"/>
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Remember me
                            </label>
                        </div>
                        <Link
                            href={'/forgot-password'}
                            className="font-medium underline underline-offset-4">
                            Forgot password
                        </Link>
                    </div>
                    <Button disabled={isDisabled} type="submit" className="flex w-full">
                        Login
                    </Button>
                </form>
            </Form>
        </>
    );
}
