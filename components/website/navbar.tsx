"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  X,
  ChevronDown,
  Home,
  Gamepad2,
  Wallet,
  History,
  LogIn,
  UserPlus,
  Palette,
  Hash,
  CircleSlash2,
  Dice5,
} from "lucide-react";

export default function GamingNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    {
      href: "#",
      label: "Games",
      icon: Gamepad2,
      dropdown: [
        { href: "/games/color", label: "Color", icon: Palette },
        { href: "/games/number", label: "Number", icon: Hash },
        { href: "/games/spin-wheel", label: "Spin Wheel", icon: CircleSlash2 },
        { href: "/games/dice", label: "Dice", icon: Dice5 },
      ],
    },
    { href: "/wallet", label: "Wallet", icon: Wallet },
    { href: "/history", label: "History", icon: History },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-gray-950/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative flex items-center">
              {/* Logo glow effect */}
              <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-purple-600/20 to-cyan-500/20 blur-lg" />
              
              {/* Logo image with container */}
              
               <img
                    src="/logo.png"
                    alt="ocorom"
                    width="120"
                  />
              {/* Logo text (optional - can remove if you want only image) */}
              {/* <div className="relative ml-3">
                <span className="text-xl font-bold tracking-tighter text-white">
                  ocorom
                </span>
              </div> */}
            </div>
            <span className="inline-flex h-2 w-2 animate-ping rounded-full bg-green-500 opacity-75"></span>
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center justify-center flex-1 max-w-2xl">
            <div className="flex items-center gap-1 rounded-full bg-gray-900/50 p-1 backdrop-blur-sm">
              {navLinks.map((link) => {
                const Icon = link.icon;
                if (link.dropdown) {
                  return (
                    <DropdownMenu key={link.label}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className={`gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all hover:bg-gray-800/50 hover:text-white ${
                            isActive(link.href)
                              ? "bg-gradient-to-r from-purple-900/30 to-cyan-900/30 text-white"
                              : "text-gray-300"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          {link.label}
                          <ChevronDown className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="center"
                        className="mt-2 w-48 border-gray-800 bg-gray-900/95 backdrop-blur-xl"
                      >
                        {link.dropdown.map((item) => {
                          const DropdownIcon = item.icon;
                          return (
                            <DropdownMenuItem
                              key={item.label}
                              asChild
                              className="cursor-pointer text-gray-300 focus:bg-gray-800 focus:text-white"
                            >
                              <Link
                                href={item.href}
                                className="flex items-center gap-2"
                              >
                                <DropdownIcon className="h-4 w-4" />
                                {item.label}
                              </Link>
                            </DropdownMenuItem>
                          );
                        })}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  );
                }

                return (
                  <Button
                    key={link.label}
                    variant="ghost"
                    asChild
                    className={`gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all hover:bg-gray-800/50 hover:text-white ${
                      isActive(link.href)
                        ? "bg-gradient-to-r from-purple-900/30 to-cyan-900/30 text-white"
                        : "text-gray-300"
                    }`}
                  >
                    <Link href={link.href} className="flex items-center gap-1.5">
                      <Icon className="h-4 w-4" />
                      {link.label}
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Desktop Auth Buttons - Right */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="outline"
              className="gap-2 border-gray-700 text-gray-300 hover:border-gray-600 hover:bg-gray-900 hover:text-white"
              asChild
            >
              <Link href="/login">
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            </Button>
            <Button
              className="gap-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 hover:from-purple-700 hover:to-cyan-600"
              asChild
            >
              <Link href="/register">
                <UserPlus className="h-4 w-4" />
                Register
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full border-l-gray-800 bg-gray-900/95 backdrop-blur-xl sm:max-w-md"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3"
                  >
                    <div className="relative h-10 w-10 rounded-lg bg-gradient-to-br from-purple-900/30 to-cyan-900/30 p-1.5 backdrop-blur-sm">
                      <div className="relative h-full w-full overflow-hidden rounded">
                        <Image
                          src="/logo.png"
                          alt="ocorom"
                          width={40}
                          height={40}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold tracking-tighter text-white">
                        ocorom
                      </span>
                      <span className="text-xs text-gray-400">Gaming Platform</span>
                    </div>
                  </Link>
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="h-6 w-6" />
                    </Button>
                  </SheetClose>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="flex-1 space-y-2 py-8">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    if (link.dropdown) {
                      return (
                        <div key={link.label} className="space-y-1">
                          <div className="flex items-center gap-2 px-4 py-3 text-gray-400">
                            <Icon className="h-5 w-5" />
                            <span className="font-medium">{link.label}</span>
                          </div>
                          <div className="ml-8 space-y-1 border-l border-gray-800 pl-4">
                            {link.dropdown.map((item) => {
                              const DropdownIcon = item.icon;
                              return (
                                <SheetClose key={item.label} asChild>
                                  <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors ${
                                      isActive(item.href)
                                        ? "bg-gradient-to-r from-purple-900/30 to-cyan-900/30 text-white"
                                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                    }`}
                                  >
                                    <DropdownIcon className="h-4 w-4" />
                                    {item.label}
                                  </Link>
                                </SheetClose>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }

                    return (
                      <SheetClose key={link.label} asChild>
                        <Link
                          href={link.href}
                          className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors ${
                            isActive(link.href)
                              ? "bg-gradient-to-r from-purple-900/30 to-cyan-900/30 text-white"
                              : "text-gray-400 hover:bg-gray-800 hover:text-white"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          {link.label}
                        </Link>
                      </SheetClose>
                    );
                  })}
                </nav>

                {/* Mobile Auth Buttons */}
                <div className="space-y-3 border-t border-gray-800 pt-6">
                  <SheetClose asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-center border-gray-700 text-gray-300 hover:border-gray-600 hover:bg-gray-800 hover:text-white"
                      asChild
                    >
                      <Link href="/login" className="flex items-center gap-2">
                        <LogIn className="h-4 w-4" />
                        Login
                      </Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      className="w-full justify-center bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40"
                      asChild
                    >
                      <Link
                        href="/register"
                        className="flex items-center gap-2"
                      >
                        <UserPlus className="h-4 w-4" />
                        Register
                      </Link>
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}