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
import { ExamplePost } from '@/test/DummyJSON';
import { Avatar, AvatarImage } from './ui/avatar';
import { EllipsisVertical } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
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

export interface Post extends ExamplePost {
  avatar: string;
}

interface CardProps extends React.ComponentProps<typeof Card> {
  post: Post;
}

export default function PostCard({ className, post, ...props }: CardProps) {
  return (
    <Card
      className={cn(
        'dark:bg-zinc-900 text-secondary-foreground hover:bg-secondary/80',
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

          <TooltipProvider>
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
          </TooltipProvider>
        </CardTitle>
        <CardDescription className=" w-full overflow-hidden whitespace-nowrap text-ellipsis">
          {post.title}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Push Notifications
            </p>
            <p className="text-sm text-muted-foreground">
              Send notifications to device.
            </p>
          </div>
          <Switch />
        </div>
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Mark all as read</Button>
      </CardFooter>
    </Card>
  );
}
