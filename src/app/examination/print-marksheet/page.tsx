"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function PrintMarksheetPage() {
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  
  useEffect(() => {
    async function fetchStudents() {
      const { data, error } = await supabase.from('students').select('*').order('created_at', { ascending: false })
      if (!error && data) setStudents(data)
      setLoading(false)
    }
    fetchStudents()
  }, [])

  const handleSelect = (regNo: string) => {
    if (selectedIds.includes(regNo)) {
      setSelectedIds(selectedIds.filter(id => id !== regNo))
    } else {
      setSelectedIds([...selectedIds, regNo])
    }
  }

  return (
    <div className="bg-[#e5e7eb] min-h-[600px] flex flex-col mx-auto text-[11px] font-sans border shadow-md">
       
       {/* Top Header */}
       <div className="bg-white p-2 border-b-2 border-slate-300 flex items-center shrink-0 shadow-sm relative z-10">
          <span className="font-semibold text-red-600 mr-2 ml-2">Session</span>
          <select className="border border-slate-400 rounded px-1 h-6 w-32 bg-[#f5f5f5]">
             <option>2025-26</option>
          </select>
          
          <span className="font-semibold text-red-600 ml-8 mr-2">Date</span>
          <input type="text" readOnly value="28/03/2026" className="border border-slate-300 rounded px-1 h-6 bg-white w-28" />
       </div>

       {/* Horizontal Layout Split */}
       <div className="flex flex-1 overflow-hidden">
          
          {/* Left Vertical Filter Pane */}
          <div className="w-[240px] bg-white border-r-2 border-slate-400 flex flex-col pt-2 shrink-0 z-10 shadow-xl overflow-y-auto pb-4">
             
             <div className="px-4 pb-2 border-b border-slate-200">
                <label className="flex items-center gap-1 font-semibold text-slate-700 text-[10px] mb-2">
                   <input type="checkbox" /> Show Discharge Students
                </label>
                
                <h3 className="text-[#800000] font-bold underline mb-1">Search By Student</h3>
                <span className="font-bold text-slate-800">Search Student</span>
                <input type="text" defaultValue="HARD" className="border border-slate-400 rounded w-full h-6 px-1.5 uppercase mt-1 mb-4 shadow-inner" />

                <h3 className="text-[#800000] font-bold underline mb-1">Search By Class</h3>
                <div className="flex justify-between items-center mb-2 mt-1">
                   <span className="font-semibold text-slate-800">Class</span>
                   <select className="border border-slate-400 rounded w-[120px] h-6 bg-white"><option></option></select>
                </div>
                <div className="flex justify-between items-center mb-3">
                   <span className="font-semibold text-slate-800">Section</span>
                   <select className="border border-slate-400 rounded w-[120px] h-6 bg-white"><option>A</option></select>
                </div>

                <div className="flex justify-center w-full mb-3 shadow-[0_4px_6px_rgba(0,0,0,0.05)]">
                   <button className="bg-gradient-to-b from-[#f0f0f0] to-[#e0e0e0] border border-slate-500 font-bold px-12 py-1 rounded shadow-sm hover:from-white hover:to-slate-100 transition-colors">Show</button>
                </div>
             </div>

             <div className="px-4 py-3 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                   <label className="flex items-center gap-1.5 font-semibold text-slate-800"><input type="radio" name="term" /> Term 1</label>
                   <label className="flex items-center gap-1.5 font-semibold text-slate-800"><input type="radio" name="term" defaultChecked /> Term 2</label>
                </div>

                <div className="flex flex-col gap-1">
                   <span className="font-semibold text-slate-800">Marksheet Format</span>
                   <select className="border border-slate-400 rounded w-full h-6 bg-white">
                      <option>CBSE 1 to 8</option>
                      <option>Playgroup</option>
                      <option>CBSE 9, CBSE 11, CBSE 12</option>
                   </select>
                </div>

                <div className="flex flex-col gap-1">
                   <span className="font-semibold text-slate-800">Promoted to Class</span>
                   <select className="border border-slate-400 rounded w-full h-6 bg-white">
                      <option>IX</option>
                   </select>
                </div>

                <div className="flex gap-2 text-[10px] items-center -mb-2 mt-2">
                   <span>Do you want to print :</span>
                </div>
                <div className="flex justify-between font-semibold text-slate-700">
                   <label className="flex items-center gap-1"><input type="checkbox" defaultChecked /> Height</label>
                   <label className="flex items-center gap-1"><input type="checkbox" defaultChecked /> Weight</label>
                   <label className="flex items-center gap-1"><input type="checkbox" defaultChecked /> PTM</label>
                </div>
             </div>
          </div>

          {/* Right Heavy Grid Viewer */}
          <div className="flex-1 bg-white overflow-hidden flex flex-col relative">
             
             {/* Report Action Layer */}
             <div className="w-full flex items-center bg-[#fdfdfd] border-b border-slate-300 shrink-0 shadow-[0_2px_4px_rgba(0,0,0,0.02)] p-1.5 px-3 z-10 relative">
                <label className="flex items-center gap-2 font-bold text-slate-700">
                   <input type="checkbox" /> Select All
                </label>
             </div>

             {/* Dynamic Table */}
             <div className="flex-1 overflow-auto bg-slate-50">
                <table className="w-full text-left border-collapse border-b border-slate-300 border-t-0">
                  <thead className="bg-[#f5f5f5] sticky top-0 outline outline-1 outline-slate-300">
                    <tr>
                      <th className="font-bold border border-slate-300 p-1 w-12 text-center text-slate-700 border-t-0 border-l-0">Select</th>
                      <th className="font-bold border border-slate-300 p-1 w-24 text-slate-700 border-t-0">RegNumber</th>
                      <th className="font-bold border border-slate-300 p-1 text-slate-700 border-t-0">name</th>
                      <th className="font-bold border border-slate-300 p-1 w-20 text-slate-700 border-t-0">Class</th>
                      <th className="font-bold border border-slate-300 p-1 w-20 text-slate-700 border-t-0">Section</th>
                      <th className="font-bold border border-slate-300 p-1 w-24 text-slate-700 border-t-0">Total</th>
                      <th className="font-bold border border-slate-300 p-1 w-24 text-slate-700 border-t-0 border-r-0">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan={13} className="text-center py-4 font-bold text-slate-500">Loading Database...</td></tr>
                    ) : students.length === 0 ? (
                      <tr><td colSpan={13} className="text-center py-4 font-bold text-red-500 bg-red-50">No Students Found. Upload Excel data.</td></tr>
                    ) : students.map((s, idx) => (
                      <tr key={s.id} className="hover:bg-blue-50 bg-white">
                        <td className="border border-slate-300 p-1 text-center font-semibold text-slate-800">{idx + 1}</td>
                        <td className="border border-slate-300 p-1">
                          <input type="checkbox" className="mx-auto block" />
                        </td>
                        <td className="border border-slate-300 p-1 text-center font-bold text-slate-800">{s.sr}</td>
                        <td className="border border-slate-300 p-1 text-left pl-2 font-bold text-slate-800">{s.name}</td>
                        <td className="border border-slate-300 p-1 text-left pl-2 font-semibold text-slate-700">{s.fname}</td>
                        <td className="border border-slate-300 p-1 text-center font-semibold text-slate-700">{s.current_class || s.admit_class}</td>
                        <td className="border border-slate-300 p-1 text-center font-semibold text-slate-700">-</td>
                        <td className="border border-slate-300 p-1 text-center text-slate-700">{s.fcontact}</td>
                        <td className="border border-slate-300 p-1 text-center font-semibold text-slate-700">2026-27</td>
                        <td className="border border-slate-300 p-1 text-center font-bold text-green-700">Generated</td>
                        <td className="border border-slate-300 p-1 bg-red-100 text-center font-bold text-red-700">-</td>
                        <td className="border border-slate-300 p-1 bg-yellow-50 text-center">False</td>
                        <td className="border border-slate-300 p-1 bg-yellow-50 text-center border-r-0">False</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>

          </div>

       </div>

       {/* Footer Action Bar */}
       <div className="bg-[#ff8c8c] flex items-center gap-4 shrink-0 border-t border-slate-600 px-2 h-10 w-full z-20">
          <button className="bg-black text-white font-bold h-7 px-8 uppercase border border-black shadow hover:bg-slate-800 transition-colors">
             Print MarkSheet
          </button>
          <button className="bg-black text-white font-bold h-7 px-8 uppercase border border-black shadow hover:bg-slate-800 transition-colors">
             Exit
          </button>
       </div>

    </div>
  )
}
