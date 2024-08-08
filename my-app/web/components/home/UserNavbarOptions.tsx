import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useParams, useRouter } from 'next/navigation';
import React, { ComponentProps, useEffect } from 'react';
import { Avatar as CdAvatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Avatar, { genConfig } from 'react-nice-avatar';
import { signIn } from '@/lib/store/userInfoSlice';
import RoundShineBorder from '../magicui/round-shine-border';
import { Bell, Plus } from 'lucide-react';

import ShimmerButton from '@/components/magicui/shimmer-button';
import { Button } from '../ui/button';
import ShinyButton from '../magicui/shiny-button';
import ShineBorder from '../magicui/shine-border';
import { BorderBeam } from '@/components/magicui/border-beam';
import { cn } from '@/lib/utils';
import MenuButton from './Menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Editor from '../editor/Editor';

export function BorderBeamDemo({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden rounded-lg border bg-background ',
        className
      )}>
      <div>{children}</div>
      <BorderBeam size={250} duration={12} delay={9} />
    </div>
  );
}

function UserNavbarOptions() {
  const user = useAppSelector((state) => state.user.entities.userinfo);
  const params = useParams<{ locals: string }>();
  const router = useRouter();
  return (
    <div className=" flex justify-center items-center gap-3">
      <Button>
        <Bell className=" cursor-pointer" />
      </Button>

      <BorderBeamDemo className=" cursor-pointer">
        <div
          onClick={() => {
            router.push(`/${params.locals}/create`);
          }}
          className=" flex ml-2 p-2">
          <Plus />
          <span className="w-48  text-center">Share your feeling</span>
        </div>
      </BorderBeamDemo>

      {/**
       * this is the user options
       */}
      <MenuButton>
        {user.avatar ? (
          <RoundShineBorder color={['#A07CFE', '#FE8FB5', '#FFBE7B']}>
            <CdAvatar className="">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>CN</AvatarFallback>
            </CdAvatar>
          </RoundShineBorder>
        ) : (
          <Avatar className="w-14 h-14" {...genConfig(user.username)}></Avatar>
        )}
      </MenuButton>
    </div>
  );
}

export default UserNavbarOptions;
