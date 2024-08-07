'use client';
import ReduxProvider from '@/lib/store/redux-provider';
import { useRouter } from 'next/navigation';
import React from 'react';
import Profile from '../profile/page';
import Collection from '../profile/components/Collection';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const Page = () => {
  const route = useRouter();

  return (
    <ReduxProvider>
      <>
        <Collection className=" w-full grid flex-1 place-items-center p-4"></Collection>
      </>
    </ReduxProvider>
  );
};

export default Page;
