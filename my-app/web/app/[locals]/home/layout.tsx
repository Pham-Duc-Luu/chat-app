"use client";
import Sidebar from "@/components/home/SideBar";
import ReduxProvider from "@/lib/store/redux-provider";
import React from "react";

export default function Layout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <ReduxProvider>
      <div className="flex">
        <Sidebar />
        <>{children}</>
      </div>
    </ReduxProvider>
  );
}
