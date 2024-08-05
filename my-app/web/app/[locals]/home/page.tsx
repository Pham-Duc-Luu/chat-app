'use client';
import ReduxProvider from '@/lib/store/redux-provider';
import { useRouter } from 'next/navigation';
import React from 'react';
import Profile from '../profile/page';
import Collection from '../profile/components/Collection';

const Page = () => {
  const route = useRouter();

  return (
    <ReduxProvider>
      <div className=" grid place-items-center p-4">
        <Collection></Collection>
      </div>
    </ReduxProvider>
  );
};

export default Page;
