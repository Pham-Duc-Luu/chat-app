'use client';
import ReduxProvider from '@/lib/store/redux-provider';
import { useRouter } from 'next/navigation';
import React from 'react';

const Page = () => {
  const route = useRouter();

  return (
    <ReduxProvider>
      <div className="w-full h-screen grid grid-cols-2 place-items-center "></div>
    </ReduxProvider>
  );
};

export default Page;
