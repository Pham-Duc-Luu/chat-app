import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { GoogleLogin } from '@react-oauth/google';
import GoogleSignIn from '@/components/google-login';
import { SignUpSchema } from '@/lib/api/auth.api';
import { Bounce, ToastContainer } from 'react-toastify';
import { SendHorizontal } from 'lucide-react';
import { useAppDispatch } from '@/lib/hooks';
import EmailInput from './EmailInput';

function Page() {
  const t = useTranslations('authentication.forgot_password');
  //   const params = useParams<{ locals: string }>();

  return (
    <div className=" w-4/12">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <Card className="w-full">
        <CardHeader className=" gap-4">
          <CardTitle className=" mb-4 mt-4">{t('title')}</CardTitle>
          <Separator></Separator>
        </CardHeader>
        <CardContent className=" gap-4">
          <div className=" gap-4">
            <EmailInput></EmailInput>
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
