import React from 'react';
import { DropdownMenuGroup, DropdownMenuItem } from '../ui/dropdown-menu';
import { LogOut, SlidersHorizontal } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { DialogTrigger } from '../ui/dialog';
import { useAppDispatch } from '@/lib/hooks';
import { selectDialog } from '@/lib/store/uiSlice';

function LayoutSettingSubMenu() {
  const t = useTranslations('home.navbar.setting');
  const dispatch = useAppDispatch();
  return (
    <DialogTrigger
      className=" flex-1"
      onClick={(e) => {
        dispatch(selectDialog('layout'));
      }}>
      <DropdownMenuItem>
        <SlidersHorizontal className="mr-2 h-4 w-4" />

        <span>{t('layout.title')}</span>
      </DropdownMenuItem>
    </DialogTrigger>
  );
}

export default LayoutSettingSubMenu;
