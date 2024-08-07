'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { toast } from '@/components/ui/use-toast';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Spinner } from '@nextui-org/spinner';
import { useParams, useRouter } from 'next/navigation';

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
});

// * example for verify opt api
const verifyOTP = new Promise((resolve) => {
  setTimeout(() => {
    resolve('OTP verified successfully');
  }, 2000);
});

export default function InputOTPForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: '',
    },
  });
  const t = useTranslations('authentication.forgot_password');
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const { counter } = useAppSelector((state) => state.auth);
  const params = useParams<{ locals: string }>();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setloading(true);
    toast({
      description: (
        <div className="flex justify-center items-center ">
          {t('form.otp.verifying')} <Spinner color="danger"></Spinner>
        </div>
      ),
    });

    verifyOTP.then((res) => {
      toast({
        description: 'verified',
      });

      router.push(`/${params.locals}/auth/resetpassword`);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field} disabled={loading}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your phone.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
