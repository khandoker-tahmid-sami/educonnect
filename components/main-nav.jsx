"use client";

import { MobileNav } from "@/components/mobile-nav";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Logo } from "./logo";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button, buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function MainNav({ items = [], children }) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <>
      {/* ✅ one single row that controls the whole navbar */}
      <div className="w-full flex items-center justify-between gap-4">
        {/* Left: logo + desktop links */}
        <div className="flex items-center gap-6 lg:gap-10">
          <Link href="/" aria-label="Home">
            <Logo />
          </Link>

          {items.length > 0 && (
            <nav className="hidden lg:flex items-center gap-6">
              {items.map((item, i) => (
                <Link
                  key={i}
                  href={item.disabled ? "#" : item.href}
                  className={cn(
                    "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          )}
        </div>

        {/* Right: auth buttons + avatar + hamburger */}
        <div className="flex items-center gap-3">
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
              <DropdownMenuContent align="end" className="w-56 mt-2">
                <DropdownMenuItem asChild>
                  <Link href="">Student</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="">Instructor</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2">
              <DropdownMenuItem asChild>
                <Link href="/account">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/account/enrolled-courses">My Courses</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="">Testimonials & Certificates</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border"
            onClick={() => setShowMobileMenu((s) => !s)}
            aria-label="Toggle menu"
          >
            {showMobileMenu ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay (doesn't affect the row layout) */}
      {showMobileMenu && items.length > 0 && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </>
  );
}
