'use client';
import Navbar from '@/components/home/Navbar';
import Sidebar from '@/components/home/SideBar';
import ReduxProvider from '@/lib/store/redux-provider';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '@/lib/hooks';
import { googleoauth, setUserInfo } from '@/lib/store/userInfoSlice';
import { useSession, signIn, signOut } from 'next-auth/react';
import { User } from 'next-auth';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function Layout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const dispatch = useAppDispatch();

  return (
    <ReduxProvider>
      <TooltipProvider>
        <div className="flex flex-col h-screen">
          <Navbar></Navbar>
          <div className="flex flex-1 overflow-y-auto">
            <Sidebar />
            <>{children}</>
          </div>
        </div>
      </TooltipProvider>
    </ReduxProvider>
  );
}
