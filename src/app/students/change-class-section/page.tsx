"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function ChangeClassSectionPage() {
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
            class: s.current_class || s.admit_class || '-',
            section: "-",
            phone: s.phone_info || s.fcontact || '-'
         }))
         setStudents(formatted)
      }
      setLoading(false)
    }
    fetchStudents()
  }, [])

  const [selectedIds, setSelectedIds] = useState<string[]>(["5223"])
  const [searchTerm, setSearchTerm] = useState("SHOUR")

  const handleSelect = (regNo: string) => {
    if (selectedIds.includes(regNo)) {
      setSelectedIds(selectedIds.filter(id => id !== regNo))
    } else {
      setSelectedIds([...selectedIds, regNo])
    }
  }

  const handleChange = () => {
    if (selectedIds.length === 0) {
      window.alert("Please select at least one student.")
      return
    }
    window.alert("Records Updated Successfully!")
  }

  return (
    <div className="bg-white min-h-[600px] flex flex-col mx-auto text-[11px] border border-slate-300">
      
      {/* Top Header */}
      <div className="bg-[#f5f5f5] p-2 border-b border-slate-300 flex items-center shrink-0">
         <span className="font-semibold text-slate-700 mr-2">Session</span>
         <select className="border border-slate-300 rounded px-1 min-w-[100px] h-6">
            <option>2025-26</option>
         </select>
      </div>

      {/* Main Body */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar Filters */}
        <div className="w-56 bg-white border-r border-slate-300 flex flex-col p-2 gap-4 overflow-y-auto shrink-0">
           
           <div className="flex flex-col gap-1">
              <span className="text-[#000080] font-bold underline decoration-1 underline-offset-2 hover:cursor-pointer pb-1">Search by Student Name Or SR</span>
              <span className="font-semibold text-slate-700">Search</span>
              <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="border border-slate-300 rounded px-1.5 h-6 uppercase" />
           </div>

           <div className="flex flex-col gap-1 mt-4">
              <span className="text-[#000080] font-bold underline decoration-1 underline-offset-2 hover:cursor-pointer pb-1">Search by Class</span>
              <span className="font-semibold text-slate-700">Class</span>
              <select className="border border-slate-300 rounded px-1 h-6">
                 <option></option>
                 <option>I</option>
                 <option>XI</option>
              </select>

              <span className="font-semibold text-slate-700 mt-2">Section</span>
              <select className="border border-slate-300 rounded px-1 h-6">
                 <option>A</option>
                 <option>B</option>
                 <option>C</option>
              </select>
           </div>

           <button className="bg-[#fffe91] border border-slate-400 font-bold py-1 mt-2 shadow-sm hover:bg-[#fff080]">
              Show
           </button>

        </div>

        {/* Right Content Grid */}
        <div className="flex-1 flex flex-col overflow-hidden">
           
           {/* Grid Action Header */}
           <div className="bg-white p-1 border-b border-slate-300 flex items-center gap-2 shrinks-0">
              <input type="checkbox" className="ml-2" />
              <span className="font-bold text-slate-700">Select All</span>
           </div>

           {/* Table */}
           <div className="flex-1 overflow-auto bg-white">
              <table className="w-full text-left border-collapse border-b border-slate-300">
                <thead className="bg-[#f5f5f5] sticky top-0 shadow-sm border-b border-slate-300">
                  <tr>
                    <th className="font-semibold p-1 w-12 text-center border-r border-slate-300 text-slate-600">select</th>
                    <th className="font-semibold p-1 w-24 border-r border-slate-300 text-slate-600">RegNumber</th>
                    <th className="font-semibold p-1 border-r border-slate-300 text-slate-600">Name</th>
                    <th className="font-semibold p-1 border-r border-slate-300 text-slate-600">Fname</th>
                    <th className="font-semibold p-1 w-16 border-r border-slate-300 text-slate-600">Class</th>
                    <th className="font-semibold p-1 w-16 border-r border-slate-300 text-slate-600">Section</th>
                    <th className="font-semibold p-1 w-32 border-slate-300 text-slate-600">PhoneInfo</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                     <tr><td colSpan={7} className="text-center py-4 font-bold text-slate-500">Loading Database...</td></tr>
                  ) : students.length === 0 ? (
                     <tr><td colSpan={7} className="text-center py-4 font-bold text-red-500 bg-red-50">No Students Found.</td></tr>
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
                      <td className="p-1 border-r border-slate-300 text-slate-800">{s.fName}</td>
                      <td className="p-1 border-r border-slate-300 text-slate-800">{s.class}</td>
                      <td className="p-1 border-r border-slate-300 text-slate-800">{s.section}</td>
                      <td className="p-1 text-slate-800">{s.phone}</td>
                    </tr>
                  ))}
                  {/* Layout Fillers */}
                  {Array.from({length: 15}).map((_, i) => (
                     <tr key={`empty-${i}`} className="border-b border-slate-200 h-[25px]">
                        <td className="border-r border-slate-200"></td>
                        <td className="border-r border-slate-200"></td>
                        <td className="border-r border-slate-200"></td>
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

      {/* Bottom Action Pane */}
      <div className="bg-white p-3 border-t border-slate-400 flex items-center gap-6 shrink-0 h-14">
         <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">New Class</span>
            <select className="border border-slate-400 rounded px-1 h-6 min-w-[100px]">
               <option>II</option>
            </select>
         </div>

         <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">New Section</span>
            <select className="border border-slate-400 rounded px-1 h-6 min-w-[100px] bg-slate-100">
               <option></option>
            </select>
         </div>

         <button onClick={handleChange} className="border-2 border-green-500 text-green-600 bg-[#f0fdf4] font-bold px-6 h-7 hover:bg-green-100 shadow-sm ml-4 transition-colors">
            Change
         </button>

         <button className="border border-[#000080] text-[#000080] font-bold px-6 h-7 bg-white hover:bg-slate-50 shadow-sm transition-colors">
            Exit
         </button>
      </div>

    </div>
  )
}
