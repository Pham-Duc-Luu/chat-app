'use client';
import React, { useEffect } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Toaster } from '@/components/ui/toaster';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import ReduxProvider from '@/lib/store/redux-provider';
import { useAppSelector } from '@/lib/hooks';
export default function Layout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <div className=" flex justify-center items-center h-screen w-screen">
      {children}
      <Toaster />
    </div>
  );
}
