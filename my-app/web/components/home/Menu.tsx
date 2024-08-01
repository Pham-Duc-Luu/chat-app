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
import React, { Children, useState } from 'react';

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
import { useAppSelector } from '@/lib/hooks';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import _ from 'lodash';
import { home } from '@/messages/en.json';
import SettingsMenu from './SettingsMenu';
import AccountsMenu from './AccountMenu';
import { useParams, useRouter } from 'next/navigation';

export function MenuButton({ children }: { children: React.ReactNode }) {
  const user = useAppSelector((state) => state.user.entities.userinfo);
  const { setTheme, theme } = useTheme();
  const t = useTranslations('home.navbar.setting');
  const params = useParams<{ locals: string }>();
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel
          className=" cursor-pointer"
          onClick={() => {
            router.push(`/${params.locals}/profile`);
          }}>
          <>@{user.username}</>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <AccountsMenu></AccountsMenu>
        <DropdownMenuSeparator />
        <SettingsMenu></SettingsMenu>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
