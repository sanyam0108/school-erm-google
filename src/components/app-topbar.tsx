"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

const NAVIGATION: any[] = [
  { name: "🏠 Home", href: "/" },
  { 
    name: "Management", 
    items: [
      { name: "Session", href: "/management/session" },
      { name: "Financial Year", href: "/management/financial-year" },
      { name: "Fee", href: "/management/fee" },
      { name: "Initialize Document's Serial No", href: "/management/document-serial" },
      { separator: true },
      { name: "Data upload", href: "#" },
      { name: "Users", href: "#" },
      { name: "Backup", href: "#" },
      { name: "Restore", href: "#" },
      { name: "Copy previous sessions structure", href: "#" },
      { separator: true },
      { name: "Exit", href: "#" }
    ] 
  },
  { 
    name: "FrontDesk", 
    items: [
      { name: "Classes", href: "/frontdesk/classes" },
      { name: "Rooms", href: "#" },
      { name: "Subjects", href: "/frontdesk/subjects" },
      { name: "Staff Management", href: "#" },
      { name: "Time Table", href: "#" },
      { name: "Books List", href: "#" },
      { name: "Holidays", href: "#" },
      { name: "Birthday", href: "#" },
    ] 
  },
  {
    name: "Student Manager",
    items: [
      { name: "Enquiry Form", href: "#" },
      { name: "Registration Form", href: "/students/register", shortcut: "Ctrl+N" },
      { name: "Add Fee to Student Account", href: "#" },
      { name: "Change Students's Class/Section", href: "/students/change-class-section" },
      { name: "Promote Student's Class", href: "/students/promote" },
      { name: "Release Student / Discharge", href: "/students/discharge" },
      { name: "Attendance", href: "#" },
      { name: "Absentee List", href: "#" },
      { name: "Print Admission Form", href: "#" },
      { name: "Print ID Card", href: "/students/id-card" },
      { name: "Student Report", href: "/students/report" },
      { name: "Search Student", href: "/students" },
      { name: "Update SR Number", href: "#" },
      { name: "Update TC Status", href: "#" },
    ]
  },
  { 
    name: "Accounts", 
    items: [
      { name: "Update account", href: "#" },
      { name: "Fee submit", href: "#" },
      { name: "Discount", href: "#" },
      { name: "Receipts other", href: "#" },
      { name: "Additional fee", href: "#" },
      { name: "Debit note", href: "#" },
      { name: "Pay refundable money", href: "#" },
      { name: "Student ledger", href: "/students/ledger" },
      { name: "Business date", href: "#" },
      { name: "Accounts edit", href: "#" },
      { name: "Expense and receipts", href: "#" },
      { separator: true },
      { name: "Fees Configuration", href: "/fees/configure" },
      { name: "Payment Entry", href: "/fees/payment" },
    ] 
  },
  { name: "Transport", items: [] },
  { 
    name: "Examination", 
    items: [
      { 
        name: "Test Structure", 
        subItems: [
           { name: "Add subject", href: "#" },
           { name: "Assessments", href: "#" },
           { name: "Tests name", href: "#" },
           { name: "Co-scholastic activities", href: "#" },
           { name: "Teachers remarks", href: "#" },
           { name: "Pass fail criteria", href: "#" },
        ]
      },
      { 
        name: "Assessment pattern", 
        subItems: [
           { name: "Scholastic", href: "#" },
           { name: "Co-scholastic", href: "#" },
           { name: "Copy exam pattern", href: "#" },
        ]
      },
      { 
        name: "Result entry", 
        subItems: [
           { name: "Scholastic", href: "#" },
           { name: "Co-Scholastic", href: "/examination/result-entry-coscholastic" },
           { name: "Remarks", href: "#" },
           { name: "Other data", href: "#" },
           { name: "Excel upload", href: "#" },
        ]
      },
      { separator: true },
      { name: "Generate Result", href: "#" },
      { name: "Print marksheet", href: "/examination/print-marksheet" },
      { name: "Result Report", href: "#" },
      { name: "Direct result entry", href: "#" },
    ] 
  },
  { 
    name: "Certificates", 
    items: [
      { name: "Bonafide Certificate", href: "/certificates/bonafide" },
      { name: "Study Certificate", href: "#" },
      { name: "Character Certificate", href: "/certificates/character" },
      { name: "Fee Certificate", href: "#" },
      { name: "Transfer Certificate", href: "#" },
    ] 
  },
  { 
    name: "Reports", 
    items: [
      { name: "Student report", href: "/students/report" },
      { name: "Attendance report", href: "#" },
      { name: "Documents reports", href: "#" },
      { name: "Print attendance sheet", href: "#" },
      { 
        name: "Accounts reports", 
        subItems: [
           { name: "Daily amount report", href: "#" },
           { name: "Fee balance report", href: "#" },
           { name: "Refundable fee amount", href: "#" },
           { name: "Refundable fee report", href: "#" },
        ]
      },
      { name: "Export data", href: "/reports/export-data" },
      { name: "Transport report", href: "#" },
      { name: "Staff report", href: "#" },
      { name: "Holiday report", href: "#" },
      { name: "Export fee data", href: "#" },
      { name: "Log report", href: "#" },
    ] 
  },
  { 
    name: "Communication", 
    items: [
      { name: "Setup", href: "#" },
      { name: "Email", href: "#" },
      { name: "Text message", href: "#" },
      { name: "Business card", href: "#" },
      { name: "Complaints", href: "#" },
      { name: "To do list", href: "#" },
      { name: "Notice board", href: "#" },
    ] 
  },
  { 
    name: "Library", 
    items: [
      { name: "Library rules", href: "#" },
      { name: "Book categories", href: "#" },
      { name: "Book streams", href: "#" },
      { name: "Book subjects", href: "#" },
      { name: "Book entry", href: "#" },
      { name: "Book issue", href: "#" },
      { name: "Book return", href: "#" },
      { name: "Reports", href: "#" },
      { name: "Generate bar codes", href: "#" },
    ] 
  },
  { name: "Stock", items: [] },
]

export function AppTopbar() {
  return (
    <div className="flex w-full bg-[#000080] text-white items-center text-[13px] font-medium border-b-2 border-slate-300 select-none z-[100] relative">
      {NAVIGATION.map((nav) => nav.href ? (
        <Link key={nav.name} href={nav.href} className="px-3 py-1.5 hover:bg-white hover:text-[#000080] transition-colors whitespace-nowrap">
           {nav.name}
        </Link>
      ) : (
        <DropdownMenu key={nav.name}>
          <DropdownMenuTrigger className="px-3 py-1.5 hover:bg-white hover:text-[#000080] data-[state=open]:bg-white data-[state=open]:text-[#000080] cursor-default outline-none transition-colors whitespace-nowrap">
             {nav.name}
          </DropdownMenuTrigger>
          {nav.items.length > 0 && (
            <DropdownMenuContent className="w-64 rounded-none p-0 mt-0 border-t-0 shadow-lg text-[13px] bg-white text-slate-900 border-x border-b border-slate-300">
              {nav.items.map((item: any, index: number) => 
                item.separator ? (
                  <DropdownMenuSeparator key={`sep-${index}`} className="my-0 bg-slate-300 rounded-none h-[1px]" />
                ) : item.subItems ? (
                  <DropdownMenuSub key={item.name}>
                     <DropdownMenuSubTrigger className="rounded-none cursor-default py-1.5 px-3 hover:bg-[#e0e0e0] flex items-center justify-between data-[state=open]:bg-[#e0e0e0]">
                        <span>{item.name}</span>
                     </DropdownMenuSubTrigger>
                     <DropdownMenuSubContent className="w-56 rounded-none p-0 mt-0 shadow-lg text-[13px] bg-[#f9f9f9] border border-slate-300 ml-1">
                        {item.subItems.map((sub: any) => (
                           <DropdownMenuItem key={sub.name} className="rounded-none cursor-pointer p-0 hover:bg-[#eaeaea]">
                              <Link href={sub.href || "#"} className="flex justify-between items-center w-full py-1.5 px-3">
                                <span>{sub.name}</span>
                              </Link>
                           </DropdownMenuItem>
                        ))}
                     </DropdownMenuSubContent>
                  </DropdownMenuSub>
                ) : (
                  <DropdownMenuItem key={item.name} className="rounded-none cursor-pointer p-0 hover:bg-[#eaeaea]">
                    <Link href={item.href || "#"} className="flex justify-between items-center w-full py-1.5 px-3">
                      <span>{item.name}</span>
                      {item.shortcut && <DropdownMenuShortcut className="ml-4 font-bold text-slate-500">{item.shortcut}</DropdownMenuShortcut>}
                    </Link>
                  </DropdownMenuItem>
                )
              )}
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      ))}
      <a href="/students/register" className="ml-auto px-6 py-1.5 hover:bg-red-700 bg-red-600 font-bold transition-colors whitespace-nowrap border-l border-slate-400">Exit</a>
    </div>
  )
}
