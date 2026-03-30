"use client"

import { useState } from "react"

const mockSubjects = [
  { code: 1, subject: "ENGLISH", priority: 1 },
  { code: 2, subject: "HINDI", priority: 2 },
  { code: 3, subject: "MATHS", priority: 3 },
  { code: 4, subject: "EVS", priority: 4 },
  { code: 5, subject: "SCIENCE", priority: 5 },
  { code: 6, subject: "SOCIAL STUDIES", priority: 6 },
  { code: 7, subject: "SANSKRIT", priority: 7 },
  { code: 15, subject: "MATHEMATICS", priority: 8 },
  { code: 12, subject: "PHYSICS", priority: 9 },
  { code: 13, subject: "CHEMISTRY", priority: 10 },
  { code: 14, subject: "BIOLOGY", priority: 11 },
  { code: 16, subject: "PHYSICAL EDUCATION", priority: 12 },
  { code: 17, subject: "G.K.", priority: 13 },
  { code: 18, subject: "COMPUTER", priority: 14 },
]

export default function AddSubjects() {
  const [selectAll, setSelectAll] = useState(false)
  const [selectedIds, setSelectedIds] = useState<number[]>([1])

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([])
    } else {
      setSelectedIds(mockSubjects.map(s => s.code))
    }
    setSelectAll(!selectAll)
  }

  const toggleSelect = (code: number) => {
    if (selectedIds.includes(code)) {
      setSelectedIds(selectedIds.filter(id => id !== code))
    } else {
      setSelectedIds([...selectedIds, code])
    }
  }

  return (
    <div className="bg-white min-h-[600px] border shadow-sm mt-0 text-[11px] flex flex-col">
      
      {/* Top Filter Bar */}
      <div className="bg-white p-2 border-b flex flex-wrap gap-4 items-center shrink-0">
         <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Input Subject</span>
            <input type="text" className="border border-slate-300 rounded px-1 h-6 w-48" />
         </div>

         <button className="border border-slate-400 bg-slate-50 text-slate-800 font-bold px-4 h-6 hover:bg-slate-100 shadow-[inset_0px_1px_0px_0px_white]">Add</button>

         <div className="flex-1" />

         <div className="flex items-center gap-2 ml-2">
            <span className="font-semibold text-slate-700">Search</span>
            <input type="text" className="border border-slate-300 rounded px-1 h-6 w-48" />
         </div>
      </div>

      {/* Select All Context Row (Optional mapping of screenshot) */}
      <div className="bg-[#f5f5f5] p-1 border-b flex items-center gap-2 shrink-0">
         <span className="font-semibold text-slate-700 ml-1">Subjects Directory</span>
      </div>

      {/* Data Grid */}
      <div className="flex-1 overflow-auto bg-white border-b">
        <table className="w-full text-left border-collapse border-slate-200">
          <thead className="bg-[#f5f5f5] sticky top-0 shadow-sm border-b">
            <tr>
              <th className="font-semibold p-1.5 w-16 text-center border-r bg-blue-500 text-white cursor-pointer" onClick={toggleSelectAll}>Select</th>
              <th className="font-semibold p-1.5 w-32 border-r text-slate-700">Code</th>
              <th className="font-semibold p-1.5 border-r text-slate-700">Subject</th>
              <th className="font-semibold p-1.5 w-64 text-slate-700">priority</th>
            </tr>
          </thead>
          <tbody>
            {mockSubjects.map((s) => (
              <tr key={s.code} className={`border-b border-slate-200 hover:bg-blue-50 cursor-pointer ${selectedIds.includes(s.code) ? 'bg-blue-50' : ''}`} onClick={() => toggleSelect(s.code)}>
                <td className={`p-1.5 text-center border-r h-6 ${selectedIds.includes(s.code) ? 'bg-[#3b82f6]' : 'bg-white'}`}>
                   <input 
                     type="checkbox" 
                     checked={selectedIds.includes(s.code)}
                     readOnly
                     className="pointer-events-none"
                   />
                </td>
                <td className="p-1.5 border-r text-slate-800">{s.code}</td>
                <td className="p-1.5 border-r text-[#000080] font-bold uppercase">{s.subject}</td>
                <td className="p-1.5 text-slate-800">{s.priority}</td>
              </tr>
            ))}
            {/* Fill remaining space */}
            {Array.from({length: 8}).map((_, i) => (
               <tr key={`empty-${i}`} className="border-b h-[27px]">
                  <td className="border-r"></td><td className="border-r"></td><td className="border-r"></td><td></td>
               </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Action Bar */}
      <div className="bg-white p-2 border-t flex gap-2">
         <button className="bg-black text-white font-bold px-4 py-1.5 hover:bg-slate-800 text-[11px] shadow">UPDATE</button>
         <button className="bg-black text-white font-bold px-4 py-1.5 hover:bg-slate-800 text-[11px] shadow">DELETE</button>
         <button className="bg-black text-white font-bold px-4 py-1.5 hover:bg-slate-800 text-[11px] shadow">EXIT</button>
      </div>

    </div>
  )
}
