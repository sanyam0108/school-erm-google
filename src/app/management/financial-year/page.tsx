"use client"

import { useState } from "react"

export default function FinancialYearManager() {
  const [fys, setFys] = useState([
    { id: 1, name: "FY 2026-27", status: "ACTIVE" },
    { id: 2, name: "FY 2025-26", status: "PAST" }
  ])
  const [newFyInput, setNewFyInput] = useState("FY 2027-28")

  const handleAddFY = () => {
    if (!newFyInput.trim()) return;
    const newId = fys.length > 0 ? Math.max(...fys.map(f => f.id)) + 1 : 1;
    setFys([{ id: newId, name: newFyInput, status: "PAST" }, ...fys]);
    setNewFyInput("");
  }

  const handleSetActive = (id: number) => {
    setFys(fys.map(fy => ({
      ...fy,
      status: fy.id === id ? "ACTIVE" : "PAST"
    })))
  }

  return (
    <div className="max-w-4xl bg-white min-h-[400px] border shadow-sm mx-auto mt-4 text-[11px]">
       <div className="flex items-center gap-4 p-2 border-b bg-white">
        <label className="font-semibold text-slate-700">Financial Year Title</label>
        <input 
          type="text" 
          value={newFyInput} 
          onChange={(e) => setNewFyInput(e.target.value)}
          className="w-48 h-6 border border-slate-300 rounded px-2" 
        />
        
        <button 
          onClick={handleAddFY}
          className="bg-black text-white px-6 h-6 font-bold text-[11px] hover:bg-slate-800 ml-2"
        >
          ADD FY
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-slate-600 mb-2 border-b pb-1">Current Active FY List</h3>
        <table className="w-full text-left border-collapse border border-slate-200">
          <thead>
            <tr className="bg-slate-100">
              <th className="font-semibold p-2 border-r  w-12 text-center">ID</th>
              <th className="font-semibold p-2 border-r">Financial Year</th>
              <th className="font-semibold p-2 border-r text-center">Status</th>
              <th className="font-semibold p-2 text-center w-32">Action</th>
            </tr>
          </thead>
          <tbody>
            {fys.map(fy => (
              <tr key={fy.id} className={`border-b ${fy.status === 'ACTIVE' ? 'bg-green-50' : ''}`}>
                <td className="p-2 border-r text-center">{fy.id}</td>
                <td className="p-2 border-r font-semibold">{fy.name}</td>
                <td className={`p-2 border-r text-center font-bold ${fy.status === 'ACTIVE' ? 'text-green-700' : 'text-slate-500'}`}>
                  {fy.status}
                </td>
                <td className="p-2 text-center">
                  {fy.status === 'ACTIVE' ? (
                     <button disabled className="text-xs text-slate-400">Current</button>
                  ) : (
                     <button onClick={() => handleSetActive(fy.id)} className="text-xs text-blue-600 underline">Set as Active</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}
