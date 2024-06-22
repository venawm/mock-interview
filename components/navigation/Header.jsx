"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Header = () => {
  const path = usePathname();
  useEffect(() => {});

  return (
    <div className=" flex p-5 md:px-20 items-center justify-between shadow-sm">
      <h1 className="text-primary text-xl lg:text-3xl  font-bold">
        <Link href={"/"}>Interview Sathi</Link>
      </h1>
      <ul className="hidden md:flex  gap-6">
        <li
          className={`hover:text-primary hover:font-bold hover:cursor-pointer transition-all ${
            path == "/dashboard" && "text-primary font-bold"
          }`}
        >
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li
          className={`hover:text-primary hover:font-bold hover:cursor-pointer transition-all ${
            path == "/upgrade" && "text-primary font-bold"
          }`}
        >
          <Link href="/upgrade">Upgrade</Link>
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
