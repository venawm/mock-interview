"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Header = () => {
  const path = usePathname();
  useEffect(() => {});

  return (
    <div className=" flex p-6 items-center justify-between shadow-sm">
      <h1 className="text-primary text-3xl font-bold">Interview Sathi</h1>
      <ul className="hidden md:flex  gap-6">
        <li
          className={`hover:text-primary hover:font-bold hover:cursor-pointer transition-all ${
            path == "/dashboard" && "text-primary font-bold"
          }`}
        >
          Dashboard
        </li>
        <li
          className={`hover:text-primary hover:font-bold hover:cursor-pointer transition-all ${
            path == "/dashboard/upgrade" && "text-primary font-bold"
          }`}
        >
          Upgrade
        </li>
        <li
          className={`hover:text-primary hover:font-bold hover:cursor-pointer transition-all ${
            path == "/dashboard/questions" && "text-primary font-bold"
          }`}
        >
          Questions
        </li>
        <li
          className={`hover:text-primary hover:font-bold hover:cursor-pointer transition-all ${
            path == "/dashboard/faq" && "text-primary font-bold"
          }`}
        >
          How it Works
        </li>
      </ul>
      <UserButton />
    </div>
  );
};

export default Header;