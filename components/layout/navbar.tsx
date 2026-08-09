"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, LayoutDashboard, User, LogOut, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PipelineDivider } from "./pipeline-divider";
import { Role, IUser } from "@/lib/type";
import { logoutUser } from "@/service/logout";
import { toast } from "sonner";
import { ThemeToggle } from "../theme";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Find Jobs" },
  { href: "/companies", label: "Companies" },
  { href: "/about", label: "About" },
];

function getDashboardPath(role: IUser["role"] | undefined) {
  if (role === Role.CANDIDATE) {
    return "/candidate-dashboard";
  } else if (role === Role.EMPLOYER) {
    return "/employer-dashboard";
  } else if (role === Role.ADMIN) {
    return "/admin-dashboard";
  } else {
    return "/";
  }
}

export function Navbar({ user }: { user: IUser | null }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    toast.success("Logged out successfully");
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  let dashboardPath = "/";
  if (user) {
    dashboardPath = getDashboardPath(user.role);
  }

  let avatarInitial = "";
  if (user) {
    avatarInitial = user.name.charAt(0).toUpperCase();
  }

  let desktopAuthContent;

  if (user) {
    desktopAuthContent = (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="ml-1 flex items-center gap-2 rounded-full outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring">
            <Avatar className="size-9">
              <AvatarImage
                src={user.profilePhoto ?? undefined}
                alt={user.name}
              />
              <AvatarFallback className="bg-secondary text-secondary-foreground">
                {avatarInitial}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="px-2 py-1.5">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={dashboardPath} className="cursor-pointer">
              <LayoutDashboard className="mr-2 size-4" />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`${dashboardPath}/profile`} className="cursor-pointer">
              <User className="mr-2 size-4" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer text-destructive focus:text-destructive"
          >
            <LogOut className="mr-2 size-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else {
    desktopAuthContent = (
      <>
        <Button variant="ghost" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/register">Get Started</Link>
        </Button>
      </>
    );
  }

  let mobileAuthContent;

  if (user) {
    mobileAuthContent = (
      <>
        <Link
          href={dashboardPath}
          onClick={() => setOpen(false)}
          className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
        >
          Dashboard
        </Link>
        <Link
          href="/blog"
          onClick={() => setOpen(false)}
          className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
        >
          Blog
        </Link>
        <Link
          href={`${dashboardPath}/profile`}
          onClick={() => setOpen(false)}
          className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
        >
          Profile
        </Link>
        <button
          onClick={handleLogout}
          className="mt-2 rounded-md px-3 py-2.5 text-left text-sm font-medium text-destructive hover:bg-destructive/10"
        >
          Logout
        </button>
      </>
    );
  } else {
    mobileAuthContent = (
      <div className="mt-3 flex flex-col gap-2">
        <Button variant="outline" asChild>
          <Link href="/login" onClick={() => setOpen(false)}>
            Login
          </Link>
        </Button>
        <Button asChild>
          <Link href="/register" onClick={() => setOpen(false)}>
            Get Started
          </Link>
        </Button>
      </div>
    );
  }

  let loggedInDesktopLinks = null;

  if (user) {
    loggedInDesktopLinks = (
      <>
        <Link
          href={dashboardPath}
          className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          Dashboard
        </Link>
        <Link
          href="/blog"
          className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          Blog
        </Link>
      </>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Briefcase className="size-4" />
          </span>
          <span className="font-heading text-xl font-semibold tracking-tight text-foreground">
            Job<span className="text-accent">Nest</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          {loggedInDesktopLinks}
        </nav>

        {/* Right side */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          {desktopAuthContent}
        </div>

        {/* Mobile menu */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="font-heading text-left">
                  Job<span className="text-accent">Nest</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-4 flex flex-col gap-1 px-4">
                {publicLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
                  >
                    {link.label}
                  </Link>
                ))}
                {mobileAuthContent}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <PipelineDivider />
    </header>
  );
}
