"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export default function CharacterCertificateGenerator() {
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStudents() {
      const { data, error } = await supabase.from('students').select('*').order('created_at', { ascending: false })
      if (!error && data) {
         const formatted = data.map(s => ({
            regNo: s.sr || String(s.id).substring(0,4),
            name: s.name || 'Unknown',
            fName: s.fname || '-',
            phone: s.phone_info || s.fcontact || '-'
         }))
         setStudents(formatted)
         if (formatted.length > 0) setSelectedReg(formatted[0].regNo)
      }
      setLoading(false)
    }
    fetchStudents()
  }, [])

  const [selectedReg, setSelectedReg] = useState<string>("1667")
  const [session, setSession] = useState("2026-27")
  const [showDischarged, setShowDischarged] = useState(false)

  return (
    <div className="mx-auto bg-[#e5e7eb] min-h-[600px] border shadow-sm mt-0 text-[11px] flex flex-col font-sans">
      
      {/* Top Filter Bar */}
      <div className="bg-[#f5f5f5] p-2 border-b border-slate-300 flex flex-wrap gap-8 items-center shrink-0">
         <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Session</span>
            <select value={session} onChange={e => setSession(e.target.value)} className="border border-slate-300 rounded px-1 min-w-[100px] h-6 bg-white">
               <option>2025-26</option>
               <option>2026-27</option>
            </select>
         </div>

         <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
               <span className="font-semibold text-slate-700">Issue Date</span>
               <input type="text" defaultValue="28/03/2026" className="border border-slate-300 rounded px-1 h-6 w-24 bg-white" />
            </div>

            <label className="flex items-center gap-1.5 text-slate-700 font-semibold ml-4">
              <input type="checkbox" defaultChecked />
              Report Header
            </label>
         </div>
      </div>

      {/* Second Filter Bar */}
      <div className="bg-[#f5f5f5] p-2 border-b border-slate-400 flex flex-col gap-2 shrink-0">
         <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
               <span className="font-semibold text-slate-700">Class</span>
               <select className="border border-slate-300 rounded px-1 min-w-[120px] h-6 bg-white">
                  <option>VIII</option>
               </select>
            </div>

            <div className="flex items-center gap-2">
               <span className="font-semibold text-slate-700">Section</span>
               <select className="border border-slate-300 rounded px-1 min-w-[80px] h-6 bg-white">
                  <option>A</option>
               </select>
            </div>

            <button className="bg-[#f5f5f5] border border-slate-400 font-bold px-4 h-6 hover:bg-slate-200 shadow-[inset_0px_1px_0px_0px_white] transition-colors">Show</button>

            <span className="text-red-500 font-bold ml-2">OR</span>

            <div className="flex items-center gap-2 ml-2">
               <span className="font-semibold text-slate-700">Search By Name</span>
               <input type="text" className="border border-slate-300 rounded px-1 h-6 w-48 bg-white" />
            </div>
         </div>

         {/* Discharged Filter Toggle Specific to Character Cert */}
         <label className="flex items-center gap-1.5 text-slate-700 text-[10px]">
           <input type="checkbox" checked={showDischarged} onChange={() => setShowDischarged(!showDischarged)} />
           Show Discharged Student
         </label>
      </div>

      {/* Data Grid */}
      <div className="flex-1 overflow-auto bg-white border-b-2 border-slate-400">
        <table className="w-full text-left border-collapse border-b border-slate-300">
          <thead className="bg-[#f5f5f5] sticky top-0 shadow-sm border-b border-slate-300">
            <tr>
              <th className="font-semibold p-1.5 w-8 text-center border-r border-slate-300"></th>
              <th className="font-semibold p-1.5 w-48 border-r border-slate-300 text-slate-700">RegNumber</th>
              <th className="font-semibold p-1.5 border-r border-slate-300 text-slate-700 w-[400px]">Name</th>
              <th className="font-semibold p-1.5 border-r border-slate-300 text-slate-700 hidden lg:table-cell">Fname</th>
              <th className="font-semibold p-1.5 w-48 text-slate-700">PhoneInfo</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
               <tr><td colSpan={5} className="text-center py-4 font-bold text-slate-500">Loading Database...</td></tr>
            ) : students.length === 0 ? (
               <tr><td colSpan={5} className="text-center py-4 font-bold text-red-500 bg-red-50">No Students Found.</td></tr>
            ) : students.map((s) => (
              <tr key={s.regNo} className={`border-b border-slate-300 hover:bg-blue-50 cursor-pointer ${selectedReg === s.regNo ? 'bg-[#3b82f6]' : ''}`} onClick={() => setSelectedReg(s.regNo)}>
                <td className={`p-1.5 text-center border-r border-slate-300 ${selectedReg === s.regNo ? 'bg-[#3b82f6]' : 'bg-white'}`}>
                   <input type="checkbox" checked={selectedReg === s.regNo} readOnly className="cursor-pointer" />
                </td>
                <td className={`p-1.5 border-r border-slate-300 hover:text-white ${selectedReg === s.regNo ? 'text-white' : 'text-slate-800'}`}>{s.regNo}</td>
                <td className={`p-1.5 border-r border-slate-300 font-bold uppercase hover:text-white ${selectedReg === s.regNo ? 'text-white' : 'text-[#000080]'}`}>{s.name}</td>
                <td className={`p-1.5 border-r border-slate-300 uppercase hover:text-white hidden lg:table-cell ${selectedReg === s.regNo ? 'text-white' : 'text-slate-800'}`}>{s.fName}</td>
                <td className={`p-1.5 hover:text-white ${selectedReg === s.regNo ? 'text-white' : 'text-slate-800'}`}>{s.phone}</td>
              </tr>
            ))}
            {Array.from({length: 12}).map((_, i) => (
               <tr key={`empty-${i}`} className="border-b border-slate-200 h-[27px]">
                  <td className="border-r border-slate-300 bg-white"></td>
                  <td className="border-r border-slate-300"></td>
                  <td className="border-r border-slate-300"></td>
                  <td className="border-r border-slate-300 hidden lg:table-cell"></td>
                  <td></td>
               </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Action Bar */}
      <div className="bg-[#ff8c8c] p-2 flex items-center gap-4 shrink-0 border-t border-slate-600">
         <Link href={`/certificates/character/print?reg=${selectedReg}&session=${session}`} target="_blank">
           <button className="bg-white border-2 border-slate-400 text-slate-800 font-bold px-6 py-1 hover:bg-slate-50 shadow-sm transition-colors">
              Generate Character Certificate
           </button>
         </Link>
         <Link href="/">
           <button className="bg-white border-2 border-slate-400 text-slate-800 font-bold px-6 py-1 hover:bg-slate-50 shadow-sm transition-colors">
              Exit
           </button>
         </Link>
      </div>

    </div>
  )
}
