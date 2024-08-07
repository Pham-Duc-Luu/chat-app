'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { countAndResetOTP } from '@/lib/store/authSlice';
import { SendHorizontal } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { Spinner } from '@nextui-org/spinner';
import OTP from './OTP';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
function Page() {
  const t = useTranslations('authentication.forgot_password');
  //   const params = useParams<{ locals: string }>();

  const dispatch = useAppDispatch();
  const { counter } = useAppSelector((state) => state.auth);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [email, setemail] = useState<string>();

  const handleStartCounter = () => {
    if (email) {
      setisLoading(true);

      dispatch(countAndResetOTP(email));
    }
  };

  return (
    <div className=" w-4/12">
      <Card className="w-full">
        <CardHeader className=" gap-4">
          <CardTitle className=" mb-4 mt-4">{t('title')}</CardTitle>
          <Separator></Separator>
        </CardHeader>
        <CardContent className=" gap-4">
          <div className=" gap-4">
            <OTP></OTP>
          </div>
        </CardContent>

        {/* <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Deploy</Button>
                </CardFooter> */}
      </Card>
    </div>
  );
}

export default Page;
