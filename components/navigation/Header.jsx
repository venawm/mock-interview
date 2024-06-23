"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import MobileNav from "./MobileNav";

const Header = ({ scrollTo }) => {
  const path = usePathname();

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
            path == "/dashboard/faq" && "text-primary font-bold"
          }`}
          onClick={() => scrollTo()}
        >
          How it Works
        </li>
      </ul>
      <div className="hidden md:flex">
        <UserButton />
      </div>
      <div className="flex md:hidden">
        <MobileNav />
      </div>
    </div>
  );
};

export default Header;
