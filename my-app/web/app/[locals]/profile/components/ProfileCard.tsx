'use client';

import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert } from '@/components/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAppSelector } from '@/lib/hooks';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Share2, UserRoundPen } from 'lucide-react';
import { useTranslations } from 'next-intl';

function AvatarComponent({ src }: { src: string }) {
  return (
    <Button variant={'ghost'} className=" w-32 h-32 rounded-full mt-6 mb-6">
      <Avatar className=" w-32 h-32">
        <AvatarImage src={src} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </Button>
  );
}

function EditButton({ className }: { className?: string }) {
  const t = useTranslations('profile.functions');
  return (
    <div className={cn(' flex flex-col gap-4', className)}>
      <Button className=" gap-5 p-7">
        <UserRoundPen />
        <span>{t('edit.title')}</span>
      </Button>
      <Button className=" gap-5 p-7" variant={'outline'}>
        <Share2 />
        <span>{t('share.title')}</span>
      </Button>
    </div>
  );
}

function ProfileCard() {
  const { userinfo } = useAppSelector((state) => state.user.entities);
  return (
    <Card className=" w-96">
      <CardHeader className=" flex flex-col justify-center items-center">
        <CardTitle className="">
          <AvatarComponent src={userinfo.avatar as string}></AvatarComponent>
        </CardTitle>
        <span>{userinfo.username} </span>
        <CardDescription className=" overflow-hidden w-full text-center whitespace-nowrap text-ellipsis">
          @{userinfo.username}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <EditButton></EditButton>
      </CardContent>
      {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  );
}

export default ProfileCard;
