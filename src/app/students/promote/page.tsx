"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function PromoteStudentClassPage() {
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
            phone: s.phone_info || s.fcontact || '-',
            transport: "No",
            discount: "No",
            rte: "No"
         }))
         setStudents(formatted)
      }
      setLoading(false)
    }
    fetchStudents()
  }, [])

  const [selectedIds, setSelectedIds] = useState<string[]>(["4177"])
  const [selectAll, setSelectAll] = useState(false)

  const handlePromote = () => {
    if (selectedIds.length === 0) return window.alert("Select a student to promote.");
    window.alert("Records Updated Successfully!");
  }

  return (
    <div className="bg-[#e5e7eb] min-h-[600px] flex flex-col mx-auto text-[11px] border shadow-md font-sans">
      
      {/* Top Header - Date */}
      <div className="bg-[#f5f5f5] p-1 border-b border-slate-300 flex items-center shrink-0">
         <span className="font-semibold text-slate-700 mx-2">Date</span>
         <input type="text" readOnly value="28/03/2026" className="border border-slate-300 rounded px-1 min-w-[100px] h-6 bg-white" />
      </div>

      {/* Main Split Body */}
      <div className="flex flex-1 overflow-hidden" style={{ height: "400px" }}>
        
        {/* Left Sidebar Filters */}
        <div className="w-[200px] bg-[#f5f5f5] border-r border-slate-400 p-2 shrink-0 flex flex-col gap-2 relative">
           
           <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-700 w-16 text-right mr-2">Session</span>
              <select className="border border-slate-300 rounded px-1 h-6 flex-1 bg-white">
                 <option>2025-26</option>
              </select>
           </div>
           
           <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-700 w-16 text-right mr-2">Class</span>
              <select className="border border-slate-300 rounded px-1 h-6 flex-1 bg-white">
                 <option>I</option>
              </select>
           </div>

           <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-700 w-16 text-right mr-2">Section</span>
              <select className="border border-slate-300 rounded px-1 h-6 flex-1 bg-white">
                 <option>A</option>
              </select>
           </div>

           <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-700 w-16 text-right mr-2">Discount</span>
              <select className="border border-slate-300 rounded px-1 h-6 flex-1 bg-white">
                 <option>All</option>
              </select>
           </div>

           <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-700 w-16 text-right mr-2">RTE</span>
              <select className="border border-slate-300 rounded px-1 h-6 flex-1 bg-white">
                 <option>All</option>
              </select>
           </div>

           <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-700 w-16 text-right mr-2">Transport</span>
              <select className="border border-slate-300 rounded px-1 h-6 flex-1 bg-white">
                 <option>All</option>
              </select>
           </div>

           <button className="bg-black text-white font-bold py-1.5 mt-2 h-7 shadow-sm text-center w-full uppercase tracking-widest hover:bg-slate-800">
              Show
           </button>
        </div>

        {/* Right Content Grid */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden relative border-b-4 border-slate-600">
           
           {/* Grid Action Header */}
           <div className="bg-[#f0f0f0] p-1 border-b border-slate-300 flex items-center shrink-0">
              <input type="checkbox" className="ml-2 mr-2 cursor-pointer" />
              <span className="font-bold text-slate-700 uppercase drop-shadow-sm">Select All</span>
              <span className="font-semibold text-slate-700 ml-12">Student Count is : 29</span>
           </div>

           {/* Table */}
           <div className="flex-1 overflow-auto bg-white border-b-2 border-slate-400">
              <table className="w-full text-left border-collapse border-slate-300">
                <thead className="bg-[#f5f5f5] sticky top-0 shadow-sm border-b-2 border-slate-400">
                  <tr>
                    <th className="font-semibold p-1 w-12 text-center border-r border-slate-300 text-slate-700">Select</th>
                    <th className="font-semibold p-1 w-20 border-r border-slate-300 text-slate-700 cursor-pointer">RegNumber</th>
                    <th className="font-semibold p-1 w-48 border-r border-slate-300 text-slate-700 cursor-pointer">Name</th>
                    <th className="font-semibold p-1 w-48 border-r border-slate-300 text-slate-700 cursor-pointer">Fname</th>
                    <th className="font-semibold p-1 w-24 border-r border-slate-300 text-slate-700">PhoneInfo</th>
                    <th className="font-semibold p-1 w-16 border-r border-slate-300 text-slate-700">Transport</th>
                    <th className="font-semibold p-1 w-16 border-r border-slate-300 text-slate-700">Discount</th>
                    <th className="font-semibold p-1 w-12 border-r border-slate-300 text-slate-700">RTE</th>
                    <th className="font-semibold p-1 border-slate-300 text-slate-700">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                     <tr><td colSpan={9} className="text-center py-4 font-bold text-slate-500">Loading Database...</td></tr>
                  ) : students.length === 0 ? (
                     <tr><td colSpan={9} className="text-center py-4 font-bold text-red-500 bg-red-50">No Students Found.</td></tr>
                  ) : students.map((s) => (
                    <tr key={s.regNo} className="border-b border-slate-300 hover:bg-blue-50">
                      <td className={`p-1 text-center border-r border-slate-300 h-6 ${selectedIds.includes(s.regNo) ? 'bg-[#3b82f6]' : 'bg-white'}`}>
                         <input 
                           type="checkbox" 
                           checked={selectedIds.includes(s.regNo)}
                           readOnly 
                           className="cursor-pointer" />
                      </td>
                      <td className="p-1 border-r border-slate-300 text-slate-800">{s.regNo}</td>
                      <td className="p-1 border-r border-slate-300 text-slate-800 font-bold uppercase">{s.name}</td>
                      <td className="p-1 border-r border-slate-300 text-slate-800 uppercase">{s.fName}</td>
                      <td className="p-1 border-r border-slate-300 text-slate-800">{s.phone}</td>
                      <td className="p-1 border-r border-slate-300 text-slate-800">{s.transport}</td>
                      <td className="p-1 border-r border-slate-300 text-slate-800">{s.discount}</td>
                      <td className="p-1 border-r border-slate-300 text-slate-800">{s.rte}</td>
                      <td className="p-1 text-slate-800"></td>
                    </tr>
                  ))}
                  {Array.from({length: 12}).map((_, i) => (
                     <tr key={`empty-${i}`} className="border-b border-slate-200 h-[22px]"><td className="border-r border-slate-300"></td><td className="border-r border-slate-300"></td><td className="border-r border-slate-300"></td><td className="border-r border-slate-300"></td><td className="border-r border-slate-300"></td><td className="border-r border-slate-300"></td><td className="border-r border-slate-300"></td><td className="border-r border-slate-300"></td><td></td></tr>
                  ))}
                </tbody>
              </table>
           </div>
        </div>

      </div>

      {/* Bottom Panel */}
      <div className="flex h-64 bg-white border-t border-slate-300">
         
         {/* Promotional Left Panel */}
         <div className="w-[200px] border-r border-slate-400 bg-white flex flex-col shrink-0 pb-2">
            
            {/* Embedded Header in Left Pane */}
            <div className="bg-slate-500 text-white p-1 border-b border-slate-600 flex items-center gap-2">
               <input type="checkbox" defaultChecked className="ml-1" />
               <span className="font-semibold text-xs whitespace-nowrap">Fee Deatails of Current Session</span>
            </div>

            <div className="p-2 flex flex-col items-center">
               <h3 className="text-red-600 font-bold uppercase underline w-full mb-3 text-[12px]">Promoted to</h3>
               
               <div className="w-full flex items-center mb-2 justify-between">
                  <span className="font-bold text-slate-800 mr-2 text-right w-12">Session</span>
                  <select className="border border-slate-400 rounded px-1 h-6 flex-1 bg-[#f5f5f5]">
                     <option>2026-27</option>
                  </select>
               </div>
               
               <div className="w-full flex items-center mb-2 justify-between">
                  <span className="font-bold text-slate-800 mr-2 text-right w-12">Class</span>
                  <select className="border border-slate-400 rounded px-1 h-6 flex-1 bg-[#f5f5f5]">
                     <option>II</option>
                  </select>
               </div>

               <div className="w-full flex items-center mb-6 justify-between">
                  <span className="font-bold text-slate-800 mr-2 text-right w-12">Section</span>
                  <select className="border border-slate-400 rounded px-1 h-6 flex-1 bg-[#f5f5f5]">
                     <option>A</option>
                  </select>
               </div>

               <div className="flex gap-2 w-full mt-auto">
                 <button onClick={handlePromote} className="bg-black text-white font-bold h-7 flex-1 shadow hover:bg-slate-800 border-2 border-black">PROMOTE</button>
                 <button className="bg-black text-white font-bold h-7 px-4 shadow hover:bg-slate-800 border-2 border-black">EXIT</button>
               </div>
            </div>

         </div>

         {/* 12-Month Financial Preview Grid */}
         <div className="flex-1 flex flex-col bg-white">
            <div className="bg-slate-500 text-white p-1 border-b border-slate-600 flex gap-4 pl-4 shrink-0">
               <label className="flex items-center gap-1"><input type="checkbox" defaultChecked /> Transport</label>
               <label className="flex items-center gap-1"><input type="checkbox" defaultChecked /> RTE</label>
               <label className="flex items-center gap-1"><input type="checkbox" defaultChecked /> Discount</label>
            </div>

            <div className="flex-1 overflow-auto bg-white">
               <table className="w-full text-center border-collapse border-b border-slate-300">
                 <thead className="bg-[#f5f5f5] border-b border-slate-400">
                   <tr>
                     <th className="font-semibold p-1 w-24 border-r border-slate-300 text-slate-600 text-left pl-2">Head</th>
                     {['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
                        <th key={month} className="font-semibold p-1 border-r border-slate-300 text-slate-700 font-sans text-xs">{month}</th>
                     ))}
                   </tr>
                 </thead>
                 <tbody>
                    <tr className="border-b h-7">
                       <td className="border-r border-slate-300"></td>
                       {Array.from({length: 12}).map((_, i) => <td key={i} className="border-r border-slate-300"></td>)}
                    </tr>
                 </tbody>
               </table>
            </div>
         </div>

      </div>

    </div>
  )
}
