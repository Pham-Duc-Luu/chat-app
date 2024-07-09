'use client';
import {
  Home,
  Search,
  Sparkles,
  Bell,
  CirclePlus,
  Origami,
  Settings,
  SquareUser,
  LucideProps,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip';
import React from 'react';
import { motion } from 'framer-motion';
import Logo from '../Logo';

interface ISideBarElement {
  title: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
}

const SideBarElement: ISideBarElement[] = [
  {
    title: 'Home',
    icon: Home,
  },
  {
    title: 'Search',
    icon: Search,
  },
  {
    title: 'For you',
    icon: Sparkles,
  },
  {
    title: 'Notifications',
    icon: Bell,
  },
  {
    title: 'Create',
    icon: CirclePlus,
  },
];

const SideBar = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <TooltipProvider>
      <div className="grid h-screen ">
        <motion.aside
          initial={{ width: 'auto' }}
          animate={{ width: isExpanded ? '12rem' : 'auto' }}
          transition={{ duration: 0.3 }}
          className="inset-y  left-0 z-20 flex h-full flex-col border-r"
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}>
          <div className="border-b p-2 flex justify-center ">
            <Logo width={40} height={40}></Logo>
          </div>
          <nav className="grid gap-1 p-2">
            {SideBarElement.map((item, index) => {
              const Icon = item.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="flex justify-start items-center">
                  <Icon className="" />
                  <motion.span
                    initial={{ opacity: 1, marginLeft: 0 }}
                    animate={{
                      width: isExpanded ? 'auto' : 0,
                      marginLeft: isExpanded ? '10px' : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="whitespace-nowrap overflow-hidden">
                    {item.title}
                  </motion.span>
                </Button>
              );
            })}
          </nav>
          <nav className="mt-auto grid gap-1 p-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-auto rounded-lg"
                  aria-label="Help">
                  <Settings className="size-10" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Help
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-auto rounded-lg"
                  aria-label="Account">
                  <SquareUser className="size-10" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Account
              </TooltipContent>
            </Tooltip>
          </nav>
        </motion.aside>
      </div>
    </TooltipProvider>
  );
};

export default SideBar;
