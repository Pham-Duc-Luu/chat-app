import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar';
import React, { Children, useEffect, useState } from 'react';

import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import _ from 'lodash';
import { home } from '@/messages/en.json';
import { removeUserInfo } from '@/lib/store/userInfoSlice';

export default function AccountsMenu() {
  const t = useTranslations('home.navbar');

  const dispatch = useAppDispatch();

  const { username } = useAppSelector((state) => state.user.entities.userinfo);

  return (
    <DropdownMenuGroup>
      <DropdownMenuItem>
        <LogOut
          className="mr-2 h-4 w-4"
          onClick={() => {
            dispatch(removeUserInfo());
          }}
        />
        <span>{t('setting.log-out.title')}</span>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
}
