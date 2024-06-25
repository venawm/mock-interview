"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";

import { Button } from "../ui/button";
import { HamIcon, Menu } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const MobileNav = () => {
  const path = usePathname();
  const { user } = useUser();
  return (
    <Sheet>
      <SheetTrigger>
        <Menu size={32} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="  flex justify-center gap-4 items-center text-slate-600">
            {user ? (
              <>
                <div className=" pt-10 flex flex-col justify-center items-center gap-2">
                  <UserButton />
                  {user?.primaryEmailAddress.emailAddress}
                </div>
              </>
            ) : (
              <>
                <Link
                  className="text-primary font-bold hover:cursor-pointer transition-all -mb-6"
                  href="/dashboard"
                >
                  Sign Up
                </Link>
              </>
            )}
          </SheetTitle>
          <SheetDescription>
            <ul className=" pt-14 flex flex-col  gap-12 items-center">
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
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
