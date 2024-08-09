import React, { HTMLAttributes } from 'react';
import { Card } from '../ui/card';
import { Button, ButtonProps } from '../ui/button';
import { Editor } from '@tiptap/react';
import { Bold, Italic, Redo, Underline, Undo } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Toggle } from '../ui/toggle';
import { Separator } from '../ui/separator';
import TextColor from './TextColor';
import HighLightColor from './Highlight';
const ButtonEdior: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <Button {...props}>{children} </Button>;
};

const MarkComponent: React.FC<MenuBarProps> = ({ className, editor }) => {
  return (
    <div className={className}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label="Toggle bold"
            pressed={editor?.isActive('bold')}
            onClick={() => editor?.chain().focus().toggleBold().run()}>
            <Bold className="h-5 w-5" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>ctrl +B</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label="Toggle italic"
            pressed={editor?.isActive('italic')}
            onClick={() => editor?.chain().focus().toggleItalic().run()}>
            <Italic className="h-5 w-5" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>ctrl + I</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            pressed={editor?.isActive('underline')}
            aria-label="Toggle underline"
            onClick={() => editor?.chain().focus().toggleUnderline().run()}>
            <Underline className="h-5 w-5" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>ctrl +U</TooltipContent>
      </Tooltip>
    </div>
  );
};

const Functionality: React.FC<MenuBarProps> = ({ className, editor }) => {
  return (
    <>
      <div className={className}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className=" border-none py-0 px-3 "
              variant={'ghost'}
              onClick={() => editor?.chain().focus().undo().run()}>
              <Undo className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>ctrl +Z</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="border-none py-0 px-3"
              variant={'ghost'}
              onClick={() => editor?.chain().focus().redo().run()}>
              <Redo className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>ctrl + Y</TooltipContent>
        </Tooltip>
      </div>
    </>
  );
};

export interface MenuBarProps extends React.HTMLAttributes<HTMLElement> {
  editor: Editor | null;
}
const Controlbar: React.FC<MenuBarProps> = ({ editor }) => {
  return (
    <>
      <Card className=" flex items-center p-2">
        <Functionality editor={editor}></Functionality>
        <Separator orientation="vertical" className=" h-5"></Separator>
        <MarkComponent editor={editor}></MarkComponent>
        <Separator orientation="vertical" className=" h-5"></Separator>

        <TextColor editor={editor}></TextColor>
        <HighLightColor editor={editor}></HighLightColor>
      </Card>
    </>
  );
};

export default Controlbar;
