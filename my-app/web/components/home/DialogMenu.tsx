import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { CopyIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ReactElement } from 'react';
import { Separator } from '../ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { selectLayout } from '@/lib/store/uiSlice';

export function LayoutSettingDialog({ className }: { className?: string }) {
  const t = useTranslations('home.navbar.setting.layout');
  const state = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  return (
    <DialogContent className="p-0">
      <DialogHeader className="m-6">
        <DialogTitle>{t('description')}</DialogTitle>
      </DialogHeader>
      <Separator></Separator>
      <Select
        onValueChange={(e) => {
          console.log(e);
        }}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={state.layoutOptions.grid}>
            {t('type.grid')}
          </SelectItem>
          <SelectItem value={state.layoutOptions.grid}>
            {t('type.list')}
          </SelectItem>
        </SelectContent>
      </Select>
    </DialogContent>
  );
}

export const DialogMenu = ({ children }: { children?: React.ReactNode }) => {
  const { isOpenDialog, dropdownMenu } = useAppSelector((state) => state.ui);
  return (
    <Dialog>
      {dropdownMenu.select === 'layout' && (
        <LayoutSettingDialog className="sm:max-w-md"></LayoutSettingDialog>
      )}
      {children}
    </Dialog>
  );
};
