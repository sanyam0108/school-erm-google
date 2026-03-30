"use client"

import { useState } from "react"

const mockClasses = [
  { code: 1, class: "Nursery", section: "A", priority: 0 },
  { code: 2, class: "LKG", section: "A", priority: 0 },
  { code: 3, class: "UKG", section: "A", priority: 0 },
  { code: 7, class: "I", section: "A", priority: 0 },
  { code: 8, class: "II", section: "A", priority: 0 },
  { code: 9, class: "III", section: "A", priority: 0 },
  { code: 10, class: "IV", section: "A", priority: 0 },
  { code: 11, class: "V", section: "A", priority: 0 },
  { code: 12, class: "VI", section: "A", priority: 0 },
  { code: 13, class: "VII", section: "A", priority: 0 },
  { code: 14, class: "VIII", section: "A", priority: 0 },
  { code: 15, class: "IX", section: "A", priority: 0 },
  { code: 16, class: "IX", section: "B", priority: 0 },
  { code: 17, class: "X", section: "A", priority: 0 },
]

export default function AddClasses() {
  const [selectAll, setSelectAll] = useState(false)
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([])
    } else {
      setSelectedIds(mockClasses.map(c => c.code))
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
            <span className="font-semibold text-slate-700">Group</span>
            <select className="border border-slate-300 rounded px-1 h-6 w-32"></select>
         </div>

         <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Class</span>
            <input type="text" className="border border-slate-300 rounded px-1 h-6 w-40" />
         </div>

         <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Section</span>
            <input type="text" className="border border-slate-300 rounded px-1 h-6 w-24" />
         </div>

         <button className="border border-slate-400 bg-slate-50 text-slate-800 font-bold px-4 h-6 hover:bg-slate-100 shadow-[inset_0px_1px_0px_0px_white]">ADD</button>

         <span className="text-slate-600 font-medium ml-2">Do not put '-' in class name.</span>

         <div className="flex-1" />

         <div className="flex items-center gap-2 ml-2">
            <span className="font-semibold text-slate-700">Search</span>
            <input type="text" className="border border-slate-300 rounded px-1 h-6 w-48" />
         </div>
      </div>

      {/* Select All Row */}
      <div className="bg-[#f5f5f5] p-1 border-b flex items-center gap-2 shrink-0">
         <input type="checkbox" checked={selectAll} onChange={toggleSelectAll} className="ml-1" />
         <span className="font-semibold text-slate-700">Select All</span>
      </div>

      {/* Data Grid */}
      <div className="flex-1 overflow-auto bg-white border-b">
        <table className="w-full text-left border-collapse border-slate-200">
          <thead className="bg-[#f5f5f5] sticky top-0 shadow-sm border-b">
            <tr>
              <th className="font-semibold p-1.5 w-12 text-center border-r">Select</th>
              <th className="font-semibold p-1.5 w-24 border-r text-slate-700">Code</th>
              <th className="font-semibold p-1.5 border-r text-slate-700">Class</th>
              <th className="font-semibold p-1.5 w-64 border-r text-slate-700">Section</th>
              <th className="font-semibold p-1.5 w-64 text-slate-700">priority</th>
            </tr>
          </thead>
          <tbody>
            {mockClasses.map((c) => (
              <tr key={c.code} className={`border-b border-slate-200 hover:bg-blue-50 ${selectedIds.includes(c.code) ? 'bg-blue-100/50' : ''}`}>
                <td className="p-1.5 text-center border-r">
                   <input 
                     type="checkbox" 
                     checked={selectedIds.includes(c.code)} 
                     onChange={() => toggleSelect(c.code)} 
                     className="cursor-pointer" 
                   />
                </td>
                <td className="p-1.5 border-r text-slate-800 select-all">{c.code}</td>
                <td className="p-1.5 border-r text-slate-800 font-bold">{c.class}</td>
                <td className="p-1.5 border-r text-slate-800">{c.section}</td>
                <td className="p-1.5 text-slate-800">{c.priority}</td>
              </tr>
            ))}
            {/* Fill remaining space */}
            {Array.from({length: 8}).map((_, i) => (
               <tr key={`empty-${i}`} className="border-b h-[27px]">
                  <td className="border-r"></td><td className="border-r"></td><td className="border-r"></td><td className="border-r"></td><td></td>
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
