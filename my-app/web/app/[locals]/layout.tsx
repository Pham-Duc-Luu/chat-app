import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Roboto_Mono } from 'next/font/google';
import { Metadata } from 'next';
import logo from '@/public/social-slack-svgrepo-com.svg';
import { ToastContainer } from 'react-toastify';
import ReduxProvider from '@/lib/store/redux-provider';

export default async function Layout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <ReduxProvider>{children}</ReduxProvider>
      <ToastContainer />
    </NextIntlClientProvider>
  );
}
