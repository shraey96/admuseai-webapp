"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  Tag,
  ImagePlus,
  Menu,
  X,
  User,
  LogOut,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { BASE_WEBSITE_URL } from "@/lib/constants";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive: boolean;
  isCollapsed: boolean;
}

function SidebarItem({
  icon,
  label,
  href,
  isActive,
  isCollapsed,
}: SidebarItemProps) {
  return (
    <Link href={href} className="w-full">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 font-normal",
          isActive && "bg-accent"
        )}
      >
        {icon}
        <span
          className={cn(
            "transition-all duration-300",
            isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
          )}
        >
          {label}
        </span>
      </Button>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { signOut, user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") {
      return true;
    }
    if (path !== "/" && pathname.startsWith(path)) {
      return true;
    }
    return false;
  };

  return (
    <div
      className={cn(
        "relative h-full border-r bg-white shadow-lg transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b">
        <div
          className={cn(
            "flex items-center gap-2",
            isCollapsed ? "justify-center w-full" : ""
          )}
        >
          <Image
            src={`${BASE_WEBSITE_URL}/images/admuse.png`}
            alt="AdMuse Logo"
            width={32}
            height={32}
            className={cn(
              "transition-all duration-300",
              isCollapsed ? "opacity-100" : "opacity-100"
            )}
          />
          <h1
            className={cn(
              "font-bold text-lg transition-opacity duration-300 font-sans tracking-tight",
              isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
            )}
          >
            AdMuseAI
          </h1>
        </div>
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>

      <div className="space-y-1 py-4 px-2">
        <SidebarItem
          icon={<Home size={20} className="text-blue-600" />}
          label="Dashboard"
          href="/dashboard"
          isActive={isActive("/dashboard")}
          isCollapsed={isCollapsed}
        />
        <SidebarItem
          icon={<ImagePlus size={20} className="text-purple-600" />}
          label="Ads"
          href="/ads"
          isActive={isActive("/ads")}
          isCollapsed={isCollapsed}
        />
        <SidebarItem
          icon={<CreditCard size={20} className="text-green-600" />}
          label="Pricing"
          href="/pricing"
          isActive={isActive("/pricing")}
          isCollapsed={isCollapsed}
        />
      </div>

      <div className="absolute bottom-4 w-full px-2 space-y-2">
        <div
          className={cn(
            "flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground",
            isCollapsed ? "justify-center" : ""
          )}
        >
          <User size={18} className="text-blue-500 shrink-0" />
          <span
            className={cn(
              "transition-all duration-300 truncate",
              isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
            )}
          >
            {user?.email}
          </span>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:bg-red-50 transition-colors"
          onClick={() => signOut()}
        >
          <LogOut size={20} className="text-red-500" />
          <span
            className={cn(
              "transition-all duration-300",
              isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
            )}
          >
            Sign Out
          </span>
        </Button>
      </div>
    </div>
  );
}
