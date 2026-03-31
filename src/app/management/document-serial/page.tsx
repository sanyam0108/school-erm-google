"use client"

import { useState, useEffect } from "react"

export default function InitializeDocumentSerial() {
  const [bonafideSerial, setBonafideSerial] = useState("188")
  
  useEffect(() => {
     const stored = window.localStorage.getItem("bonafide_serial")
     if (stored) setBonafideSerial(stored)
  }, [])

  const handleUpdate = () => {
     window.localStorage.setItem("bonafide_serial", bonafideSerial)
     alert("Serial Numbers successfully locked to Memory!")
  }

  return (
    <div className="max-w-3xl bg-white min-h-[500px] border shadow-sm mx-auto mt-4 text-[13px]">
      
      <div className="p-6">
        <div className="flex flex-col gap-4">
          
          <div className="grid grid-cols-[200px_1fr] items-center gap-4">
            <label className="text-right font-medium text-slate-700">SR Number Start From</label>
            <input type="text" defaultValue="1" className="h-7 border border-slate-300 px-2 w-64" />
          </div>

          <div className="grid grid-cols-[200px_1fr] items-center gap-4">
            <label className="text-right font-medium text-slate-700">Fee Receipt Number Initial</label>
            <input type="text" defaultValue="1" className="h-7 border border-slate-300 px-2 w-64" />
          </div>

          <div className="grid grid-cols-[200px_1fr] items-center gap-4">
            <label className="text-right font-medium text-slate-700">Fee Receipt Pattern</label>
            <div className="flex items-center gap-4 font-bold text-slate-700">
               <label className="flex items-center gap-1.5"><input type="radio" name="pattern" /> Continue</label>
               <label className="flex items-center gap-1.5"><input type="radio" name="pattern" defaultChecked /> Restart from 1 for new FY</label>
            </div>
          </div>

          {/* Bonafide Serial State Bound */}
          <div className="grid grid-cols-[200px_1fr] items-center gap-4">
            <label className="text-right font-bold text-[#800080]">Bonafide Serial Initializer</label>
            <div className="flex gap-2">
               <div className="h-7 border border-slate-300 px-2 flex items-center bg-slate-100 text-slate-500 font-bold">
                 CACS/2026/
               </div>
               <input 
                 type="number" 
                 value={bonafideSerial} 
                 onChange={e => setBonafideSerial(e.target.value)} 
                 className="h-7 border border-slate-400 px-2 w-32 font-bold text-blue-800" 
               />
               <span className="text-[10px] items-center flex text-slate-400 font-bold italic">Global Memory</span>
            </div>
          </div>

          <div className="grid grid-cols-[200px_1fr] items-center gap-4">
            <label className="text-right font-medium text-slate-700">Study Certificate Initial</label>
            <input type="text" defaultValue="CACS/2026/" className="h-7 border border-slate-300 px-2 w-64" />
          </div>

          <div className="grid grid-cols-[200px_1fr] items-center gap-4">
            <label className="text-right font-medium text-slate-700">Character Certificate Initial</label>
            <input type="text" defaultValue="CACS/2026/" className="h-7 border border-slate-300 px-2 w-64" />
          </div>

          <div className="grid grid-cols-[200px_1fr] items-center gap-4 pt-4">
             <div />
             <div className="flex gap-2">
                <button onClick={handleUpdate} className="bg-black text-white font-bold px-6 py-1 hover:bg-slate-800 shadow shadow-[0_2px_0_0_gray]">UPDATE SERIALS</button>
                <button className="bg-slate-100 border shadow-sm border-slate-300 text-slate-800 font-bold px-6 py-1 hover:bg-slate-200">EXIT</button>
             </div>
          </div>

        </div>
      </div>
    </div>
  )
}
