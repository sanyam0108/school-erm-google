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
  { name: "Management", items: [] },
  { name: "FrontDesk", items: [] },
  {
    name: "Student Manager",
    items: [
      { name: "Enquiry Form", href: "#" },
      { name: "Registration Form", href: "/students/register", shortcut: "Ctrl+N" },
      { name: "Add Fee to Student Account", href: "#" },
      { name: "Change Student's Class/Section", href: "#" },
      { name: "Promote Student's Class", href: "#" },
      { separator: true },
      { name: "Attendance", href: "#" },
      { name: "Absentee List", href: "#" },
      { name: "Print Admission Form", href: "#" },
      { name: "Print ID Card", href: "#" },
      { name: "Student Report", href: "#" },
      { name: "Search Student", href: "/students" },
      { name: "Update SR Number", href: "#" },
      { name: "Update TC Status", href: "#" },
    ]
  },
  { name: "Accounts", items: [] },
  { name: "Transport", items: [] },
  { name: "Examination", items: [] },
  { name: "Certificates", items: [] },
  { name: "Reports", items: [] },
  { name: "Communication", items: [] },
  { name: "Library", items: [] },
  { name: "Stock", items: [] },
  { name: "Exit", items: [] },
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
                  <DropdownMenuItem key={item.name} asChild className="rounded-none cursor-pointer py-1.5 px-3 hover:bg-black/5">
                    <Link href={item.href || "#"} className="flex justify-between items-center w-full">
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
