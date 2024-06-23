import { Atom } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import logo from "@/public/share.png";
import Image from "next/image";

const Logo = () => {
  const t = useTranslations("application");
  return (
    <div className="flex justify-center items-center flex-col">
      <Image
        src={logo}
        width={100}
        height={100}
        className="m-10"
        alt="Logo"
      ></Image>
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-6xl font-bold">
        {t("name")}
      </div>
    </div>
  );
};

export default Logo;
