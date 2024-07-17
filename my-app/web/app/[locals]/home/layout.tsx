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
      <div className="flex">
        <Sidebar />
        <div className=" flex-1">
          <Navbar></Navbar>
          <>{children}</>
        </div>
      </div>
    </ReduxProvider>
  );
}
