"use client";
import { useAppSelector } from "@/lib/store";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const route = useRouter();
  const homeRouter = useAppSelector((state) => state.router.home);

  const userInfo = localStorage.getItem("user");

  return <div>Page</div>;
};

export default Page;
