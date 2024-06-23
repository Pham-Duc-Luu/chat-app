"use client";
import AuthUpdater from "@/components/home/auth-updater";
import AuthViewer from "@/components/home/auth-viewer";
import { useAppSelector } from "@/lib/store";
import ReduxProvider from "@/lib/store/redux-provider";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const route = useRouter();

  const userInfo = localStorage.getItem("user");

  return (
    <ReduxProvider>
      <main className="w-full h-screen grid grid-cols-2 place-items-center">
        <AuthUpdater />
        <AuthViewer />
      </main>
    </ReduxProvider>
  );
};

export default Page;
