'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import dummyjson, { ExamplePost } from '@/test/DummyJSON';
import { Avatar, AvatarImage } from './ui/avatar';
import {
  Bookmark,
  EllipsisVertical,
  Eye,
  Heart,
  MessageSquareText,
  Share2,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import useSize from '@/hook/useSize';
import TagsDisplay from './TagsDisplay';
const notifications = [
  {
    title: 'Your call has been confirmed.',
    description: '1 hour ago',
  },
  {
    title: 'You have a new message!',
    description: '1 hour ago',
  },
  {
    title: 'Your subscription is expiring soon!',
    description: '2 hours ago',
  },
];
import date from 'date-and-time';
import Image from 'next/image';
import img from '@/public/thumnail.webp';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';

export interface Post extends ExamplePost {
  avatar?: string;
  thumnail?: string;
}

interface CardProps extends React.ComponentProps<typeof Card> {
  post: Post;
}

export default function PostCard({ className, post, ...props }: CardProps) {
  const now = new Date();
  const [imageURL, setimageURL] = useState<string>();
  date.format(now, 'YYYY/MM/DD HH:mm:ss'); // => '2015/01/02 23:14:05'
  useEffect(() => {
    dummyjson.image
      .generateImage({
        width: 100,
        height: 100,
        background: Math.floor(Math.random() * 0xffffff)
          .toString(16)
          .padStart(6, '0'),
        text: Math.floor(Math.random() * 0xffffff)
          .toString(16)
          .padStart(6, '0'),
        color: Math.floor(Math.random() * 0xffffff)
          .toString(16)
          .padStart(6, '0'),
      })
      .then((res) => {
        const objectURL = URL.createObjectURL(res.data);
        console.log(objectURL);

        setimageURL(objectURL);
      });
  }, []);
  return (
    <Card
      className={cn(
        'dark:bg-zinc-900 bg-zinc-100 drop-shadow group text-secondary-foreground hover:bg-secondary/80 flex flex-col justify-between',
        className
      )}
      {...props}>
      <CardHeader>
        <CardTitle className=" flex justify-between items-center ">
          <Button
            variant={'ghost'}
            className=" w-10 h-10 rounded-full mt-6 mb-6">
            <Avatar className=" w-10 h-10">
              <AvatarImage src={post.avatar} />
            </Avatar>
          </Button>
          <div className=" flex justify-center">
            <Button className=" invisible group-hover:visible">
              Read the post
              <Eye className="ml-2" />
            </Button>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button className=" w-10 h-10 p-1" variant={'ghost'}>
                  <EllipsisVertical />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Options</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardTitle>
        <CardDescription className=" text-primary font-semibold text-xl w-full overflow-hidden  text-ellipsis">
          {post.title}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* this component is for rendering the hastags */}
        <TagsDisplay tags={post.tags}></TagsDisplay>
        {/* this is for rendering the time */}
        <div> {date.format(now, 'MMM DD')}</div>
        {!imageURL ? (
          <Skeleton className="h-44 w-full rounded-xl" />
        ) : (
          <Image
            alt="thumnail"
            width={40}
            height={40}
            className=" h-44 w-full object-cover rounded-lg"
            src={imageURL}></Image>
        )}
      </CardContent>
      <CardFooter className="font-light flex justify-between text-zinc-500 dark:text-zinc-400">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={'ghost'} className=" text-xs gap-2">
              <Heart />
              <span>{post.reactions.likes}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="">like</TooltipContent>
        </Tooltip>
        <div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={'ghost'} className=" text-xs gap-2">
                <MessageSquareText />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="">Comments</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={'ghost'} className=" text-xs gap-2">
                <Bookmark />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="">Save</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={'ghost'} className=" text-xs gap-2">
                <Share2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="">Share</TooltipContent>
          </Tooltip>
        </div>
      </CardFooter>
    </Card>
  );
}
