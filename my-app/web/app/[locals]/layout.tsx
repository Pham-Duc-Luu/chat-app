import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Roboto_Mono } from 'next/font/google';
import { Metadata } from 'next';
import logo from '@/public/social-slack-svgrepo-com.svg';
import { ToastContainer } from 'react-toastify';
import ReduxProvider from '@/lib/store/redux-provider';
import { SessionProvider } from 'next-auth/react';
import SessionWrapper from '@/components/SessionWrapper';
import AppConfigEnv from '@/config/app.config';
import { NextUIProvider } from '@nextui-org/system';
import { TooltipProvider } from '@/components/ui/tooltip';

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
      <SessionWrapper>
        <TooltipProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </TooltipProvider>
      </SessionWrapper>
      <ToastContainer />
    </NextIntlClientProvider>
  );
}
