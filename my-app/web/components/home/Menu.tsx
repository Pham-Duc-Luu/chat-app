'use client';
import { useAppSelector } from '@/lib/hooks';
import { useParams, useRouter } from 'next/navigation';
import ThemeSettingSubMenu from './ThemeSettingSubMenu';
import LayoutSettingSubMenu from './LayoutSettingSubMenu';
import LogOutSubMenu from './LogOutSubMenu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { DialogMenu } from './DialogMenu';

export interface MenuItem {
  item: React.JSX.Element;
}

// This is the main menu button
export default function MenuButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAppSelector((state) => state.user.entities.userinfo);
  const params = useParams<{ locals: string }>();
  const router = useRouter();

  const menu: MenuItem[] = [
    {
      item: (
        <DropdownMenuLabel
          className=" cursor-pointer"
          onClick={() => {
            router.push(`/${params.locals}/profile`);
          }}>
          <>@{user.username}</>
        </DropdownMenuLabel>
      ),
    },
    { item: <ThemeSettingSubMenu></ThemeSettingSubMenu> },
    {
      item: <LayoutSettingSubMenu></LayoutSettingSubMenu>,
    },
    {
      item: <LogOutSubMenu></LogOutSubMenu>,
    },
  ];

  return (
    <DialogMenu>
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 flex  flex-col">
          {menu.map((item, index) => {
            return item.item;
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </DialogMenu>
  );
}
