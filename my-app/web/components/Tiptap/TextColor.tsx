import React, { useEffect, useRef, useState } from 'react';
import { MenuBarProps } from './Controlbar';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Button } from '../ui/button';
import { ChevronDown, Palette, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

// const textColorTailwind = [
//   'bg-zinc-50',
//   'bg-zinc-300',
//   'bg-slate-500',
//   'bg-gray-500',
//   'bg-red-500',
//   'bg-orange-500',
//   'bg-amber-500',
//   'bg-yellow-500',
//   'bg-lime-500',
//   'bg-green-500',
//   'bg-emerald-500',
//   'bg-teal-500',
//   'bg-cyan-500',
//   'bg-sky-500',
//   'bg-blue-500',
//   'bg-indigo-500',
//   'bg-violet-500',
//   'bg-purple-500',
//   'bg-fuchsia-500',
//   'bg-pink-500',
//   'bg-rose-500',
// ];

const textColorTailwind = [
  { colorName: 'zinc-50', color: '#fafafa' },
  { colorName: 'zinc-300', color: '#d4d4d8' },
  { colorName: 'slate-500', color: '#64748b' },
  { colorName: 'gray-500', color: '#6b7280' },
  { colorName: 'red-500', color: '#ef4444' },
  { colorName: 'orange-500', color: '#f97316' },
  { colorName: 'amber-500', color: '#f59e0b' },
  { colorName: 'yellow-500', color: '#eab308' },
  { colorName: 'lime-500', color: '#84cc16' },
  { colorName: 'green-500', color: '#22c55e' },
  { colorName: 'emerald-500', color: '#10b981' },
  { colorName: 'teal-500', color: '#14b8a6' },
  { colorName: 'cyan-500', color: '#06b6d4' },
  { colorName: 'sky-500', color: '#0ea5e9' },
  { colorName: 'blue-500', color: '#3b82f6' },
  { colorName: 'indigo-500', color: '#6366f1' },
  { colorName: 'violet-500', color: '#8b5cf6' },
  { colorName: 'purple-500', color: '#a855f7' },
  { colorName: 'fuchsia-500', color: '#d946ef' },
  { colorName: 'pink-500', color: '#ec4899' },
  { colorName: 'rose-500', color: '#f43f5e' },
];

const TextColor: React.FC<MenuBarProps> = ({ className, editor }) => {
  useEffect(() => {}, []);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className=" border-none py-0 px-3 bg-sky" variant={'ghost'}>
            <Tooltip>
              <TooltipTrigger asChild>
                <>
                  <Palette className="h-5 w-5" />
                  <ChevronDown className="h-4 w-4" />
                </>
              </TooltipTrigger>
              <TooltipContent>Text color</TooltipContent>
            </Tooltip>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup className=" grid grid-cols-3 gap-2">
            <DropdownMenuItem className=" p-0">
              <Button
                variant={'ghost'}
                onClick={() => {
                  editor?.chain().focus().unsetColor().run();
                }}
                className="p-1">
                <div className={cn(' p-0 cursor-pointer rounded-sm')}>
                  <X className=" w-6 h-6" />
                </div>
              </Button>
            </DropdownMenuItem>
            {textColorTailwind.map((color, index) => {
              return (
                <DropdownMenuItem
                  key={index}
                  className=" p-0"
                  onClick={() => {
                    editor?.chain().focus().setColor(color.color).run();
                  }}>
                  <Button variant={'ghost'} className="p-1">
                    <div
                      className={cn(
                        ' w-6 h-6 p-0 cursor-pointer rounded-sm',
                        `bg-${color.colorName}`
                      )}></div>
                  </Button>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default TextColor;
