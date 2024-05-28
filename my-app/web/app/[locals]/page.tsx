"use client";
import { useAppSelector } from "@/lib/store";
import ReduxProvider from "@/lib/store/redux-provider";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export default function Page({ params }: { params: { locals: string } }) {
  const router = useRouter();

  useEffect(() => {
    router.push(`/${params.locals}/home`);
  }, []);
  return <ReduxProvider> {"home"}</ReduxProvider>;
}
