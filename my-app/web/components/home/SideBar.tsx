"use client";
import {
  Bird,
  Book,
  Bot,
  Code2,
  CornerDownLeft,
  LifeBuoy,
  Mic,
  Paperclip,
  Rabbit,
  Settings,
  Settings2,
  Share,
  SquareTerminal,
  SquareUser,
  Triangle,
  Origami,
  Turtle,
  Home,
  Search,
  Sparkles,
  Bell,
  CirclePlus,
  LucideProps,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import React, { ReactHTMLElement } from "react";
import react from "react";
import { AppProps } from "next/app";

interface ISideBarElement {
  title: string;
  icon: react.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>
  >;
}

const SideBarElement: ISideBarElement[] = [
  {
    title: "Home",
    icon: Home,
  },
  {
    title: "Search",
    icon: Search,
  },
  {
    title: "For you",
    icon: Sparkles,
  },
  {
    title: "Notifications",
    icon: Bell,
  },
  {
    title: "Create",
    icon: CirclePlus,
  },
];

const SideBar = ({ Component, pageProps }: AppProps) => {
  return (
    <TooltipProvider {...pageProps}>
      <div className="grid h-screen ">
        <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
          <div className="border-b p-2">
            <Button variant="outline" size="icon" aria-label="Home">
              <Origami />
            </Button>
          </div>
          <nav className="grid gap-1 p-2">
            {SideBarElement.map((item) => {
              const Icon = item.icon;
              return (
                <Button variant="outline" className="">
                  <Icon />
                  <span>Toggle notifications</span>
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
                  aria-label="Help"
                >
                  <LifeBuoy className="size-10" />
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
                  aria-label="Account"
                >
                  <SquareUser className="size-10" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Account
              </TooltipContent>
            </Tooltip>
          </nav>
        </aside>
      </div>
    </TooltipProvider>
  );
};

export default SideBar;
