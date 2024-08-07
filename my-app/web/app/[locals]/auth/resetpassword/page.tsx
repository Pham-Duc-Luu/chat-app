import React, { useEffect } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { useTranslations } from 'next-intl';

import ResetPasswordForm from './ResetPasswordForm';
import dummyjson from '@/test/DummyJSON';
import UserAvatar from './UserAvatar';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Page = () => {
  const t = useTranslations('authentication.reset_password');
  //   const params = useParams<{ locals: string }>();

  return (
    <div className=" w-4/12">
      <Card className="w-full">
        <CardHeader className=" gap-4">
          <CardTitle className=" mb-4 mt-4">{t('title')}</CardTitle>
          <UserAvatar></UserAvatar>
          <Separator></Separator>
        </CardHeader>
        <CardContent className=" gap-4">
          <ResetPasswordForm></ResetPasswordForm>
        </CardContent>

        {/* <CardFooter className="flex justify-between">
                      <Button variant="outline">Cancel</Button>
                      <Button>Deploy</Button>
                  </CardFooter> */}
      </Card>
    </div>
  );
};

export default Page;
