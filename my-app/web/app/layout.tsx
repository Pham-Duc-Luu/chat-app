import './globals.css';
import { Inter as FontSans, Roboto_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import logo from '@/components/home/icon';
import { Metadata } from 'next';
import { ReactQueryProvider } from './react-query-provider';
import 'react-toastify/dist/ReactToastify.css';

const fontSans = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-sans',
});
export const metadata: Metadata = {
  title: 'Acme',
  icons: logo.src,
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
