"use client";
import Logo from "@/components/Logo";
import { useAppSelector } from "@/lib/store";
import ReduxProvider from "@/lib/store/redux-provider";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export default function Page({ params }: { params: { locals: string } }) {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push(`/${params.locals}/home`);
    }, 2000);
  }, []);
  return (
    <ReduxProvider>
      <div className=" h-screen w-screen flex justify-center items-center">
        <Logo></Logo>
      </div>
    </ReduxProvider>
  );
}
