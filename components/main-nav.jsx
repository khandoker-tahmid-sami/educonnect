"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MobileNav } from "@/components/mobile-nav";
import { Logo } from "./logo";
import { X, Menu } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function MainNav({ items = [], children }) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    /* single, non-wrapping row */
    <div className="w-full flex flex-nowrap items-center justify-between gap-4">
      {/* Left: logo + desktop links */}
      <div className="min-w-0 flex items-center gap-6 lg:gap-10">
        <Link
          href="/"
          aria-label="Home"
          className="shrink-0 inline-flex items-center"
        >
          <Logo className="h-6 w-auto" />
        </Link>

        {!!items.length && (
          <nav className="hidden lg:flex gap-6">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.disabled ? "#" : item.href}
                className={cn(
                  "text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        )}
      </div>

      {/* Right: actions */}
      <nav className="flex items-center gap-3 shrink-0">
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/login"
            className={cn(buttonVariants({ size: "sm" }), "px-4")}
          >
            Login
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Register
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="mt-2 w-56">
              <DropdownMenuItem asChild>
                <Link href="/register/student" className="w-full">
                  Student
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/register/instructor" className="w-full">
                  Instructor
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="cursor-pointer rounded-full focus:outline-none">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="mt-2 w-56">
            <DropdownMenuItem asChild>
              <Link href="/account" className="w-full">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/account/enrolled-courses" className="w-full">
                My Courses
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/account/certificates" className="w-full">
                Testimonials & Certificates
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/logout" className="w-full">
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border lg:hidden"
          onClick={() => setShowMobileMenu((s) => !s)}
          aria-label="Toggle menu"
        >
          {showMobileMenu ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile sheet (doesn't take layout space) */}
      {showMobileMenu && !!items.length && (
        <div className="absolute left-0 right-0 top-full mt-2 mx-4 rounded-xl border bg-background/95 p-4 backdrop-blur lg:hidden">
          <MobileNav items={items} onNavigate={() => setShowMobileMenu(false)}>
            {children}
          </MobileNav>
        </div>
      )}
    </div>
  );
}
