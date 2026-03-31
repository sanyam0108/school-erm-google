"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export default function PrintIDCardPage() {
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStudents() {
      const { data, error } = await supabase.from('students').select('*').order('created_at', { ascending: false })
      if (!error && data) {
         const formatted = data.map(s => ({
            regNo: s.sr || String(s.id).substring(0,4),
            name: s.name || 'Unknown',
            fName: s.fname || '-'
         }))
         setStudents(formatted)
         if (formatted.length > 0) setSelectedIds([formatted[0].regNo])
      }
      setLoading(false)
    }
    fetchStudents()
  }, [])

  const [selectedIds, setSelectedIds] = useState<string[]>(["1318"])

  const handleSelect = (regNo: string) => {
    if (selectedIds.includes(regNo)) {
      setSelectedIds(selectedIds.filter(id => id !== regNo))
    } else {
      setSelectedIds([...selectedIds, regNo])
    }
  }

  return (
    <div className="bg-[#f5f5f5] min-h-[600px] flex flex-col mx-auto text-[11px] border border-slate-300">
      
      {/* Top Header */}
      <div className="bg-white p-2 border-b border-slate-300 flex items-center shrink-0">
         <span className="font-semibold text-slate-700 mr-2">Session</span>
         <select className="border border-slate-300 rounded px-1 h-6 w-32 mr-8">
            <option>2025-26</option>
         </select>
         
         <span className="font-semibold text-slate-700 mr-2">Date</span>
         <input type="text" readOnly value="28/03/2026" className="border border-slate-300 rounded px-1 w-24 h-6 bg-white" />
      </div>

      {/* Main Body Split */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar Filters */}
        <div className="w-[220px] bg-white border-r border-slate-300 flex flex-col p-2 gap-4 shrink-0">
           
           <div className="flex flex-col gap-1">
              <span className="text-[#000080] font-bold underline decoration-1 underline-offset-2 pb-1">Search by Student Name Or SR</span>
              <span className="font-semibold text-slate-700">Search</span>
              <input type="text" defaultValue="SHOU" className="border border-slate-300 rounded px-1.5 h-6 uppercase" />
           </div>

           <div className="flex flex-col gap-1 mt-4">
              <span className="text-[#000080] font-bold underline decoration-1 underline-offset-2 pb-1">Search by Class</span>
              <span className="font-semibold text-slate-700">Class</span>
              <select className="border border-slate-300 rounded px-1 h-6 bg-[#f5f5f5]">
                 <option>XI</option>
              </select>

              <span className="font-semibold text-slate-700 mt-2">Section</span>
              <select className="border border-slate-300 rounded px-1 h-6 bg-[#f5f5f5]">
                 <option>A</option>
              </select>
           </div>

           <button className="border-2 border-green-600 bg-green-50 text-green-700 font-bold py-1 h-7 mt-2 hover:bg-green-100 transition-colors shadow-sm">
              Show
           </button>
           
           <button className="border border-[#000080] text-[#000080] bg-white font-bold py-1 h-7 shadow-sm hover:bg-slate-50 transition-colors">
              Exit
           </button>

        </div>

        {/* Right Content Grid */}
        <div className="flex-1 flex flex-col overflow-hidden">
           
           {/* Grid Action Header */}
           <div className="bg-white p-1 border-b border-slate-300 flex items-center gap-4 shrink-0 pl-2">
              <label className="flex items-center gap-2">
                 <span className="font-bold text-slate-700">Select All</span>
                 <input type="checkbox" className="cursor-pointer" />
              </label>
              
              <Link href={`/students/id-card/print?reg=${selectedIds[0] || ''}`} target="_blank">
                 <button className="border border-green-700 text-green-700 font-bold px-8 h-7 hover:bg-green-50 shadow-sm transition-colors">
                    Print ID Card
                 </button>
              </Link>
           </div>

           {/* Table */}
           <div className="flex-1 overflow-auto bg-white border-b border-slate-300">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#f5f5f5] sticky top-0 shadow-sm border-b border-slate-300">
                  <tr>
                    <th className="font-semibold p-1 w-12 text-center border-r border-slate-300"></th>
                    <th className="font-semibold p-1 w-24 border-r border-slate-300 text-slate-600">RegNumber</th>
                    <th className="font-semibold p-1 border-r border-slate-300 text-slate-600">Name</th>
                    <th className="font-semibold p-1 border-slate-300 text-slate-600">Fname</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                     <tr><td colSpan={4} className="text-center py-4 font-bold text-slate-500">Loading Database...</td></tr>
                  ) : students.length === 0 ? (
                     <tr><td colSpan={4} className="text-center py-4 font-bold text-red-500 bg-red-50">No Students Found.</td></tr>
                  ) : students.map((s) => (
                    <tr key={s.regNo} className="border-b border-slate-300 hover:bg-blue-50">
                      <td className={`p-1 text-center border-r border-slate-300 h-6 ${selectedIds.includes(s.regNo) ? 'bg-[#3b82f6]' : 'bg-white'}`}>
                         <input 
                           type="checkbox" 
                           checked={selectedIds.includes(s.regNo)}
                           onChange={() => handleSelect(s.regNo)} 
                           className="cursor-pointer" />
                      </td>
                      <td className="p-1 border-r border-slate-300 text-slate-800">{s.regNo}</td>
                      <td className="p-1 border-r border-slate-300 text-slate-800 font-bold">{s.name}</td>
                      <td className="p-1 text-slate-800 uppercase">{s.fName}</td>
                    </tr>
                  ))}
                  {Array.from({length: 15}).map((_, i) => (
                     <tr key={`empty-${i}`} className="border-b border-slate-200 h-[25px]">
                        <td className="border-r border-slate-200"></td>
                        <td className="border-r border-slate-200"></td>
                        <td className="border-r border-slate-200"></td>
                        <td></td>
                     </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </div>

      </div>

    </div>
  )
}
