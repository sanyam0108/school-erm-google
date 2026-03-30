"use client"

import { useState } from "react"

const mockStudents = [
  { reg: "3576", name: "DEVISH KUMAR", grade: "A+" },
  { reg: "3722", name: "AYUSH KUMAR MEENA", grade: "A+" },
  { reg: "4130", name: "MOHAMMAD MAAZ", grade: "A+" },
  { reg: "4177", name: "AAFIYA KHAN", grade: "A+" },
  { reg: "4180", name: "ARSALAN KHAN", grade: "A+" },
  { reg: "4187", name: "YUVILKSHA YADAV", grade: "A+" },
  { reg: "4366", name: "IRAM", grade: "A+" },
  { reg: "4368", name: "JIYANSH", grade: "A+" },
  { reg: "4556", name: "STEEPHEN", grade: "A+" },
  { reg: "4557", name: "HARSH MEENA", grade: "A+" },
  { reg: "4639", name: "ANAM BANO", grade: "A+" },
]

export default function CoScholasticResultEntry() {
  const [selectedReg, setSelectedReg] = useState<string>("3576")
  
  return (
    <div className="bg-[#e5e7eb] min-h-[600px] flex flex-col mx-auto text-[11px] font-sans border shadow-sm">
       
       {/* Top Session Header */}
       <div className="bg-[#000080] p-1.5 border-b-2 border-[#ff8c8c] flex items-center shrink-0 z-10 shadow tracking-wide">
          <span className="font-bold text-white ml-2 text-xs">Session</span>
          <select className="border-none rounded shadow-inner px-1 h-6 w-32 bg-[#f0f0f0] ml-4 font-bold text-[#000080]">
             <option>2025-26</option>
          </select>
       </div>

       {/* Red-Text Category Header Bar */}
       <div className="bg-[#fcfcfc] border-b border-slate-400 flex shrink-0 shadow items-stretch select-none">
          
          {/* Class/Section Splice */}
          <div className="flex flex-col p-2 border-r border-slate-300 w-[240px]">
             <span className="text-[#cc0000] font-semibold tracking-wide mb-1 text-[11px]">Which Class n Section</span>
             <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-slate-700 w-12 text-left">Class</span>
                <select className="border border-slate-300 rounded px-1 h-[22px] flex-1"><option>I</option></select>
             </div>
             <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700 w-12 text-left">Section</span>
                <select className="border border-slate-300 rounded px-1 h-[22px] flex-1"><option>A</option></select>
             </div>
          </div>

          {/* Term Splice */}
          <div className="flex flex-col p-2 border-r border-slate-300 w-[120px]">
             <span className="text-[#cc0000] font-semibold tracking-wide mb-1 text-[11px]">Which Term</span>
             <select className="border border-slate-300 rounded px-1 h-[22px] w-full"><option>1</option></select>
          </div>

          {/* Category Splice */}
          <div className="flex flex-col p-2 border-r border-slate-300 flex-1 relative">
             <span className="text-[#cc0000] font-semibold tracking-wide mb-1 text-[11px]">Which Category n Parameter</span>
             <div className="flex items-center flex-1 pr-16 relative">
                 <div className="flex flex-col gap-1 flex-1">
                     <div className="flex items-center justify-between max-w-[300px]">
                        <span className="font-semibold text-slate-700 w-16 text-left">Category</span>
                        <select className="border border-slate-300 rounded px-1 h-[22px] flex-1 shadow-inner bg-white"><option>Co-Scholastic</option></select>
                     </div>
                     <div className="flex items-center justify-between max-w-[300px]">
                        <span className="font-semibold text-slate-700 w-16 text-left">Parameter</span>
                        <select className="border border-[#4ba3e3] rounded px-1 h-[22px] flex-1 shadow-inner bg-[#e6f4ff] font-semibold text-[#0060a0]">
                           <option>Art & Craft</option>
                           <option>Work Education</option>
                           <option>Music</option>
                           <option>Sports</option>
                        </select>
                     </div>
                 </div>
                 {/* Internal Show Button right next to the selects */}
                 <button className="absolute right-0 bottom-0 bg-[#f5f5f5] border border-slate-400 font-bold w-14 h-6 text-[10px] hover:bg-slate-200">Show</button>
             </div>
          </div>

          {/* Action Splice */}
          <div className="flex items-center p-2 gap-2 h-[72px]">
             <button className="bg-white border border-slate-400 font-bold px-4 h-[24px] hover:bg-slate-100 shadow-sm transition-colors text-[11px]">Save</button>
             <button className="bg-white border border-slate-400 font-bold px-4 h-[24px] hover:bg-slate-100 shadow-sm transition-colors text-[11px]">Print</button>
             <button className="bg-white border border-slate-400 font-bold px-4 h-[24px] hover:bg-slate-100 shadow-sm transition-colors text-[11px]">Exit</button>
          </div>

       </div>

       {/* Data Grid Viewer */}
       <div className="flex-1 bg-white overflow-hidden flex flex-col relative outline outline-1 outline-slate-400 z-0">
          
          <div className="flex-1 overflow-auto bg-white border-b-2 border-slate-400">
             <table className="w-full text-left border-collapse border-b border-slate-300">
               <thead className="bg-[#f5f5f5] sticky top-0 outline outline-1 outline-slate-300 shadow-sm z-10">
                 <tr>
                   <th className="font-bold border border-slate-300 p-1 px-2 w-[160px] text-slate-700 border-t-0 border-l-0">RegNumber</th>
                   <th className="font-bold border border-slate-300 p-1 w-[400px] text-slate-700 border-t-0"></th>
                   <th className="font-bold border border-slate-300 p-1 text-slate-700 border-t-0 border-r-0">Grade</th>
                 </tr>
               </thead>
               <tbody>
                 {mockStudents.map((s) => (
                    <tr key={s.reg} className={`hover:bg-blue-50/80 cursor-pointer ${selectedReg === s.reg ? 'bg-[#3b82f6] text-white font-bold shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)]' : 'bg-white'}`} onClick={() => setSelectedReg(s.reg)}>
                      <td className="border border-slate-300 p-1 px-2 border-l-0 w-[160px] h-[22px]">
                         {s.reg}
                      </td>
                      <td className={`border border-slate-300 p-1 uppercase ${selectedReg === s.reg ? 'text-white' : 'text-slate-700'}`}>
                         {s.name}
                      </td>
                      <td className="border border-slate-300 border-r-0 p-0 h-[22px]">
                         <select className={`w-full h-full border-none outline-none pl-1 cursor-pointer bg-transparent focus:bg-white focus:text-slate-800 focus:shadow-inner ${selectedReg === s.reg ? 'text-white' : 'text-slate-800'}`}>
                             <option selected>A+</option>
                             <option>A</option>
                             <option>B+</option>
                             <option>B</option>
                             <option>C</option>
                         </select>
                      </td>
                    </tr>
                 ))}
                 {Array.from({length: 15}).map((_, i) => (
                    <tr key={`empty-${i}`} className="h-[22px] bg-white">
                      <td className="border border-slate-300 border-l-0"></td>
                      <td className="border border-slate-300"></td>
                      <td className="border border-slate-300 border-r-0"></td>
                    </tr>
                 ))}
               </tbody>
             </table>
          </div>
       </div>

    </div>
  )
}
