'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { countAndResetOTP } from '@/lib/store/authSlice';
import { SendHorizontal } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { Spinner } from '@nextui-org/spinner';
import OTP from './otp/OTP';
import { Separator } from '@/components/ui/separator';
import { useParams, usePathname, useRouter } from 'next/navigation';

function EmailInput() {
  const t = useTranslations('authentication.forgot_password');
  const params = useParams<{ locals: string }>();

  const dispatch = useAppDispatch();
  const { counter } = useAppSelector((state) => state.auth);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [email, setemail] = useState<string>();
  const router = useRouter();
  const pathname = usePathname();

  // * for example, this is send verification to email api
  const sendVerification = new Promise((resolve) => {
    setTimeout(() => {
      resolve('verification sent successfully');
    }, 2000);
  });

  const handleSendVerification = () => {
    if (email) {
      setisLoading(true);
      sendVerification.then((res) => {
        dispatch(countAndResetOTP(email));
        router.push(pathname + '/otp');
      });
    }
  };

  return (
    <div className=" flex flex-col ">
      <div>
        <div className=" mb-4">{t('form.description')}</div>
        <div className=" flex flex-1 justify-center items-center gap-4">
          <Input
            placeholder={t('form.email.placeholder')}
            onChange={(e) => setemail(e.target.value)}
            value={email}
            disabled={isLoading}
          />
          {isLoading ? (
            <>
              <Spinner></Spinner>
            </>
          ) : (
            <Button onClick={handleSendVerification}>
              <SendHorizontal />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmailInput;
