import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { useRef, useState } from 'react';
import { Slot } from '@radix-ui/react-slot';
import useSize from '@/hook/useSize';
import useTotalSize from '@/hook/useTotalSize';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

export interface TagsDisplayProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {
  asChild?: boolean;
  tags: string[];
  isHidden?: boolean;
  numberOfTags?: number;
}

function TagsDisplay({
  className,
  variant,
  numberOfTags = 3,
  size,
  asChild = false,
  tags: list,
  isHidden = false,
  ...props
}: TagsDisplayProps) {
  let tags: string[] = list;

  if (list.length > numberOfTags) {
    tags = list.slice(0, numberOfTags);
    tags.push('+' + (list.length - numberOfTags));
  }

  return (
    <div className=" flex flex-wrap gap-1">
      {tags.map((tag, index) => (
        <Tag
          className=" text-xs bg-transparent pr-2 pl-2 font-light "
          variant={'outline'}
          key={index}>
          #{tag}
        </Tag>
      ))}
    </div>
  );
}

const tagVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface TagProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tagVariants> {
  asChild?: boolean;
}

const Tag = React.forwardRef<HTMLButtonElement, TagProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(tagVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Tag.displayName = 'Button';

export { Tag, tagVariants };

export default TagsDisplay;
