'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { countAndResetOTP, sendOTP } from '@/lib/store/authSlice';
import { SendHorizontal } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { Spinner } from '@nextui-org/spinner';
import OTP from './OTP';

function EmailInput() {
  const t = useTranslations('authentication.forgot_password');
  //   const params = useParams<{ locals: string }>();

  const dispatch = useAppDispatch();
  const { isOPTCreated, counter } = useAppSelector((state) => state.auth);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [email, setemail] = useState<string>();

  const handleStartCounter = () => {
    if (email) {
      setisLoading(true);

      dispatch(countAndResetOTP(email));
    }
  };

  useEffect(() => {
    setisLoading(false);
  }, [isOPTCreated]);

  return (
    <div className=" flex flex-col ">
      {isOPTCreated ? (
        <OTP></OTP>
      ) : (
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
              <Button onClick={handleStartCounter}>
                <SendHorizontal />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default EmailInput;
