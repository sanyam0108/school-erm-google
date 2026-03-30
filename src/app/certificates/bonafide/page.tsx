"use client"

import { useState } from "react"
import Link from "next/link"

const mockStudents = [
  { regNo: "3576", name: "DEVISH KUMAR", fName: "MAHESH CHAND BAIRWA", phone: "8000446200" },
  { regNo: "3722", name: "AYUSH KUMAR MEENA", fName: "LAL SINGH", phone: "9682541995" },
  { regNo: "4130", name: "MOHAMMAD MAAZ", fName: "ALEEM HUSAIN", phone: "8769250333" },
  { regNo: "4177", name: "AAFIYA KHAN", fName: "SAHID KHAN", phone: "7665443809" },
  { regNo: "4180", name: "ARSALAN KHAN", fName: "SHABBEER KHAN", phone: "8302936892" },
]

export default function BonafideCertificateGenerator() {
  const [selectedReg, setSelectedReg] = useState<string>("3576")
  const [purpose, setPurpose] = useState("SELF")
  const [session, setSession] = useState("2026-27")

  return (
    <div className="mx-auto bg-white min-h-[600px] border shadow-sm mt-0 text-[11px] flex flex-col">
      
      {/* Top Filter Bar */}
      <div className="bg-white p-2 border-b flex flex-wrap gap-4 items-center shrink-0">
         <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Session</span>
            <select value={session} onChange={e => setSession(e.target.value)} className="border border-slate-300 rounded px-1 min-w-[100px] h-6">
               <option>2025-26</option>
               <option>2026-27</option>
            </select>
         </div>

         <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Issue Date</span>
            <input type="text" defaultValue="28/03/2026" className="border border-slate-300 rounded px-1 h-6 w-24" />
         </div>

         <label className="flex items-center gap-1 text-slate-700">
           <input type="checkbox" defaultChecked />
           Report Header
         </label>
      </div>

      {/* Second Filter Bar */}
      <div className="bg-white p-2 border-b flex flex-wrap gap-4 items-center shrink-0">
         <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Class</span>
            <select className="border border-slate-300 rounded px-1 min-w-[120px] h-6">
               <option>I</option>
               <option>II</option>
            </select>
         </div>

         <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Section</span>
            <select className="border border-slate-300 rounded px-1 min-w-[80px] h-6">
               <option>A</option>
               <option>B</option>
            </select>
         </div>

         <button className="border border-green-600 text-green-700 font-bold px-4 h-6 hover:bg-green-50">Show</button>

         <span className="text-red-500 font-bold ml-2">OR</span>

         <div className="flex items-center gap-2 ml-2">
            <span className="font-semibold text-slate-700">Search By Name</span>
            <input type="text" className="border border-slate-300 rounded px-1 h-6 w-48" />
         </div>
      </div>

      {/* Data Grid */}
      <div className="flex-1 overflow-auto bg-white border-b">
        <table className="w-full text-left border-collapse border-slate-200">
          <thead className="bg-[#f5f5f5] sticky top-0 shadow-sm border-b">
            <tr>
              <th className="font-semibold p-1.5 w-8 text-center border-r"></th>
              <th className="font-semibold p-1.5 w-32 border-r text-slate-700">RegNumber</th>
              <th className="font-semibold p-1.5 border-r text-slate-700">Name</th>
              <th className="font-semibold p-1.5 border-r text-slate-700">Fname</th>
              <th className="font-semibold p-1.5 w-48 text-slate-700">PhoneInfo</th>
            </tr>
          </thead>
          <tbody>
            {mockStudents.map((s, i) => (
              <tr key={s.regNo} className={`border-b border-slate-200 hover:bg-blue-50 cursor-pointer ${selectedReg === s.regNo ? 'bg-blue-50' : ''}`} onClick={() => setSelectedReg(s.regNo)}>
                <td className="p-1.5 text-center border-r">
                   <input type="checkbox" checked={selectedReg === s.regNo} readOnly className="cursor-pointer" />
                </td>
                <td className="p-1.5 border-r text-slate-800">{s.regNo}</td>
                <td className="p-1.5 border-r text-slate-800">{s.name}</td>
                <td className="p-1.5 border-r text-slate-800">{s.fName}</td>
                <td className="p-1.5 text-slate-800">{s.phone}</td>
              </tr>
            ))}
            {/* Fill remaining space to match screenshot look */}
            {Array.from({length: 15}).map((_, i) => (
               <tr key={`empty-${i}`} className="border-b h-[27px]">
                  <td className="border-r"></td><td className="border-r"></td><td className="border-r"></td><td className="border-r"></td><td></td>
               </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Action Bar */}
      <div className="bg-[#ff8c8c] p-2 flex items-center gap-4 shrink-0">
         <div className="flex items-center bg-white border border-slate-400">
            <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-1 border-r border-slate-400">Purpose</span>
            <input type="text" value={purpose} onChange={e => setPurpose(e.target.value)} className="h-6 w-64 px-2 outline-none uppercase font-semibold text-blue-900" />
         </div>

         <Link href={`/certificates/bonafide/print?reg=${selectedReg}&session=${session}&purpose=${purpose}`} target="_blank">
           <button className="bg-slate-50 border border-slate-400 text-slate-800 font-bold px-6 py-1 hover:bg-white shadow-[inset_0px_1px_0px_0px_white]">
              Generate BonaFide Certificate
           </button>
         </Link>

         <button className="bg-slate-50 border border-slate-400 text-slate-800 font-bold px-6 py-1 hover:bg-white shadow-[inset_0px_1px_0px_0px_white]">
            Exit
         </button>
      </div>

    </div>
  )
}
