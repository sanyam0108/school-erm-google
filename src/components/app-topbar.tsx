"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

const NAVIGATION = [
  { 
    name: "Management", 
    items: [
      { name: "Session", href: "/management/session" },
      { name: "Financial Year", href: "/management/financial-year" },
      { name: "Fee", href: "#" },
      { name: "Initialize Document's Serial No", href: "/management/document-serial" },
      { name: "Data Upload", href: "#" },
      { separator: true },
      { name: "Exit", href: "#" }
    ] 
  },
  { name: "FrontDesk", items: [] },
  {
    name: "Student Manager",
    items: [
      { name: "Enquiry Form", href: "#" },
      { name: "Registration Form", href: "/students/register", shortcut: "Ctrl+N" },
      { name: "Release / Discharge Student", href: "/students/discharge" },
      { separator: true },
      { name: "Student Report", href: "#" },
      { name: "Search Student", href: "/students" },
    ]
  },
  { 
    name: "Accounts", 
    items: [
      { name: "Fees Configuration", href: "/fees/configure" },
      { name: "Payment Entry", href: "/fees/payment" },
      { separator: true },
      { name: "Student Ledger", href: "/students/ledger" },
    ] 
  },
  { name: "Transport", items: [] },
  { name: "Examination", items: [] },
  { 
    name: "Certificates", 
    items: [
      { name: "Bonafide Certificate", href: "#" },
      { name: "Study Certificate", href: "#" },
      { name: "Character Certificate", href: "#" },
      { name: "Fee Certificate", href: "#" },
      { name: "Transfer Certificate", href: "#" },
    ] 
  },
  { name: "Reports", items: [] },
  { name: "Communication", items: [] },
  { name: "Library", items: [] },
  { name: "Stock", items: [] },
]

export function AppTopbar() {
  return (
    <div className="flex w-full bg-[#000080] text-white items-center text-[13px] font-medium border-b-2 border-slate-300 select-none">
      {NAVIGATION.map((nav) => (
        <DropdownMenu key={nav.name}>
          <DropdownMenuTrigger className="px-3 py-1.5 hover:bg-white hover:text-[#000080] data-[state=open]:bg-white data-[state=open]:text-[#000080] cursor-default outline-none transition-colors">
            {nav.name}
          </DropdownMenuTrigger>
          {nav.items.length > 0 && (
            <DropdownMenuContent className="w-64 rounded-none p-0 mt-0 border-t-0 shadow-lg text-[13px]">
              {nav.items.map((item, index) => 
                item.separator ? (
                  <DropdownMenuSeparator key={`sep-${index}`} className="my-0" />
                ) : (
                  <DropdownMenuItem key={item.name} className="rounded-none cursor-pointer p-0 hover:bg-black/5">
                    <Link href={item.href || "#"} className="flex justify-between items-center w-full py-1.5 px-3">
                      <span>{item.name}</span>
                      {item.shortcut && <span className="text-muted-foreground text-[11px]">{item.shortcut}</span>}
                    </Link>
                  </DropdownMenuItem>
                )
              )}
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      ))}
    </div>
  )
}
