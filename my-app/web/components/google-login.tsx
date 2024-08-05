'use client';
import React, { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Button } from './ui/button';
import axios from 'axios';
import api from '@/config/axios.config';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { googleoauth, setUserInfo } from '@/lib/store/userInfoSlice';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

function GoogleSignIn() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.entities);
  const HandleSignIn = () => {
    signIn().then((res) => {});
  };

  const params = useParams<{ locals: string }>();
  const { data: session } = useSession();

  useEffect(() => {
    if (
      session?.ServerResponse &&
      session?.ServerResponse.user &&
      session?.ServerResponse.token
    ) {
      const { user, token } = session?.ServerResponse;
      dispatch(
        setUserInfo({
          ...user,
          accessToken: token.access_token,
          refreshToken: token.refresh_token,
        })
      );
    }
  }, [session]);

  useEffect(() => {
    if (user.userinfo.accessToken) {
      router.push(`/${params.locals}/home`);
    }
  }, [user]);
  return (
    <Button className=" w-full gap-2 " onClick={(e) => signIn()}>
      <FcGoogle size={20} />
      Google
    </Button>
  );
}

export default GoogleSignIn;
