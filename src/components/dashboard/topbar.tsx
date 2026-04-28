"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Menu,
  X,
  Briefcase,
  Phone,
  Users,
  FileText,
  ClipboardList,
  Settings,
  LayoutDashboard,
  LogOut,
  Wrench,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/jobs", label: "Jobs", icon: Briefcase },
  { href: "/dashboard/calls", label: "Calls", icon: Phone },
  { href: "/dashboard/technicians", label: "Technicians", icon: Users },
  { href: "/dashboard/invoices", label: "Invoices", icon: FileText },
  { href: "/dashboard/quotes", label: "Quotes", icon: ClipboardList },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Topbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-[#E2E8F0] bg-white px-4 sm:px-6">
        <button
          className="md:hidden text-[#0C2340]"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="flex-1 flex items-center gap-3 max-w-sm">
          <Search className="h-4 w-4 text-[#64748B] shrink-0" />
          <input
            type="search"
            placeholder="Search jobs, customers..."
            className="w-full text-sm bg-transparent outline-none placeholder:text-[#64748B]"
          />
        </div>

        <div className="ml-auto flex items-center gap-3">
          <button className="relative text-[#64748B] hover:text-[#0C2340] transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#F97316] text-white text-[10px] flex items-center justify-center font-bold">
              3
            </span>
          </button>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">MH</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-[#0C2340] flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#1E3A5F]">
              <div className="flex items-center gap-2">
                <Wrench className="h-6 w-6 text-[#F97316]" />
                <span className="text-xl font-bold text-white">TradesBrain</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-slate-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1">
              {navItems.map(({ href, label, icon: Icon }) => {
                const active =
                  href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      active
                        ? "bg-[#F97316] text-white"
                        : "text-slate-300 hover:bg-[#1E3A5F] hover:text-white"
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {label}
                  </Link>
                );
              })}
            </nav>
            <div className="px-3 py-4 border-t border-[#1E3A5F]">
              <Link
                href="/login"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-[#1E3A5F] hover:text-white transition-colors"
              >
                <LogOut className="h-5 w-5 shrink-0" />
                Sign Out
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
