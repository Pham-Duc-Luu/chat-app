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
import { CopyIcon, LayoutGrid, List } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ReactElement, useId } from 'react';
import { Separator } from '../ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { density, layoutOptions, selectLayout } from '@/lib/store/uiSlice';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export function LayoutSettingDialog({ className }: { className?: string }) {
  const t = useTranslations('home.navbar.setting.layout');
  const state = useAppSelector((state) => state.ui);
  const layoutOptionsId = useId();
  const densityId = useId();
  const dispatch = useAppDispatch();
  return (
    <DialogContent className="p-0">
      <DialogHeader className="m-6">
        <DialogTitle>{t('description')}</DialogTitle>
      </DialogHeader>
      <Separator></Separator>
      <div className="m-6 flex flex-col gap-6">
        <div>
          <div className=" m-3">
            <Label className="" htmlFor={layoutOptionsId}>
              {t('title')}
            </Label>
          </div>
          <Select
            defaultValue={state.layoutType.layout}
            onValueChange={(e: string) => {
              const value =
                e as (typeof layoutOptions)[keyof typeof layoutOptions];
              dispatch(selectLayout({ layout: value }));
            }}>
            <SelectTrigger id={layoutOptionsId}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={state.layoutOptions.grid}>
                <div className=" flex justify-center items-center gap-4">
                  <List />
                  <span>{t('type.grid')}</span>
                </div>
              </SelectItem>
              <SelectItem value={state.layoutOptions.list}>
                <div className=" flex justify-center items-center gap-4">
                  <LayoutGrid />
                  {t('type.list')}
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <div className=" m-3">
            <Label htmlFor={densityId}>{t('density.title')} </Label>
          </div>
          <RadioGroup
            onValueChange={(e: string) => {
              const value = e as (typeof density)[keyof typeof density];
              dispatch(selectLayout({ density: value }));
            }}
            defaultValue={state.layoutType.density}
            id={densityId}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value={state.density.eco}
                id={state.density.eco}
              />
              <Label htmlFor={state.density.eco}>
                {t('density.options.eco')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value={state.density.roomy}
                id={state.density.roomy}
              />
              <Label htmlFor={state.density.roomy}>
                {t('density.options.roomy')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value={state.density.cozy}
                id={state.density.cozy}
              />
              <Label htmlFor={state.density.cozy}>
                {t('density.options.cozy')}
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
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
