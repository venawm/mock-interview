"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import MobileNav from "./MobileNav";
import { Button } from "../ui/button";

const Header = ({ scrollTo }) => {
  const path = usePathname();
  const { user } = useUser();
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex p-5 md:px-20 items-center justify-between shadow-sm bg-white">
      <h1 className="text-primary text-xl lg:text-3xl font-bold">
        <Link href={"/"}>Interview Sathi</Link>
      </h1>
      <ul className="hidden md:flex gap-6">
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
            path == "/contact" && "text-primary font-bold"
          }`}
        >
          <Link href="/contact">Contact Us</Link>
        </li>
        <li
          className={`hover:text-primary hover:font-bold hover:cursor-pointer transition-all ${
            path == "/dashboard/faq" && "text-primary font-bold"
          }`}
          onClick={() => scrollTo()}
        >
          <Link href="/">How it Works</Link>
        </li>
      </ul>
      <div className="hidden md:flex">
        {user ? (
          <>
            <UserButton />
          </>
        ) : (
          <>
            <Button
              variant="secondary"
              className="px-8 py-6 text-primary font-bold text-md bg-white hover:border-2 hover:border-primary transition-all"
            >
              <Link href="/dashboard">Sign Up</Link>
            </Button>
          </>
        )}
      </div>
      <div className="flex md:hidden">
        <MobileNav />
      </div>
    </div>
  );
};

export default Header;
