"use client"

import { useState } from "react"

export default function FeeManagement() {
  const [feeHeads, setFeeHeads] = useState([
    { id: 1, name: "Tuition Fee", type: "Mandatory", defaultAmount: 50000 },
    { id: 2, name: "Transport Fee", type: "Optional", defaultAmount: 12000 },
    { id: 3, name: "Library Fee", type: "Mandatory", defaultAmount: 2000 },
    { id: 4, name: "Late Fine", type: "Penalty", defaultAmount: 500 }
  ])

  const [newName, setNewName] = useState("")
  const [newType, setNewType] = useState("Mandatory")
  const [newAmount, setNewAmount] = useState<number | string>("")

  const handleAddFeeHead = () => {
    if (!newName.trim()) return
    const newId = feeHeads.length > 0 ? Math.max(...feeHeads.map(f => f.id)) + 1 : 1
    
    setFeeHeads([
      ...feeHeads, 
      { 
        id: newId, 
        name: newName, 
        type: newType, 
        defaultAmount: Number(newAmount) || 0 
      }
    ])
    
    setNewName("")
    setNewAmount("")
  }

  return (
    <div className="max-w-4xl bg-white min-h-[400px] border shadow-sm mx-auto mt-4 text-[11px] flex flex-col">
       
      {/* Add Bar */}
      <div className="flex items-center gap-4 p-2 border-b bg-[#f5f5f5]">
        <div className="flex flex-col gap-0.5">
           <label className="font-semibold text-slate-700">Fee Head Name</label>
           <input 
             type="text" 
             value={newName} 
             onChange={(e) => setNewName(e.target.value)}
             className="w-48 h-6 border border-slate-300 rounded px-2" 
             placeholder="e.g. Examination Fee"
           />
        </div>

        <div className="flex flex-col gap-0.5">
           <label className="font-semibold text-slate-700">Category Type</label>
           <select 
             value={newType}
             onChange={(e) => setNewType(e.target.value)}
             className="w-32 h-6 border border-slate-300 rounded px-2 bg-white"
           >
              <option>Mandatory</option>
              <option>Optional</option>
              <option>Penalty</option>
           </select>
        </div>

        <div className="flex flex-col gap-0.5">
           <label className="font-semibold text-slate-700">Default Base Amount</label>
           <div className="relative">
              <span className="absolute left-1.5 top-1 text-slate-400 font-bold">₹</span>
              <input 
                type="number" 
                value={newAmount} 
                onChange={(e) => setNewAmount(e.target.value)}
                className="w-32 h-6 pl-5 border border-slate-300 rounded" 
              />
           </div>
        </div>
        
        <button 
          onClick={handleAddFeeHead}
          className="bg-[#000080] text-white px-6 h-6 mt-4 font-bold text-[11px] hover:bg-blue-900 ml-auto shadow-sm"
        >
          ADD FEE HEAD
        </button>
      </div>

      <div className="p-4 flex-1">
        <h3 className="font-bold text-[#000080] text-sm mb-2 border-b pb-1">Configured Base Fee Structures</h3>
        <table className="w-full text-left border-collapse border border-slate-200 shadow-sm mt-3">
          <thead className="bg-[#e8f0fe] border-b-2 border-[#000080]">
            <tr>
              <th className="font-semibold p-2 border-r border-slate-300 w-12 text-center">ID</th>
              <th className="font-semibold p-2 border-r border-slate-300">Fee Head Name</th>
              <th className="font-semibold p-2 border-r border-slate-300 w-32 text-center">Type</th>
              <th className="font-semibold p-2 border-r border-slate-300 w-48 text-right">Default Amount (₹)</th>
              <th className="font-semibold p-2 text-center w-32">Status</th>
            </tr>
          </thead>
          <tbody>
            {feeHeads.map(fee => (
              <tr key={fee.id} className="border-b border-slate-200 hover:bg-slate-50">
                <td className="p-2 border-r text-center text-slate-500 font-medium">{fee.id}</td>
                <td className="p-2 border-r font-bold text-slate-700">{fee.name}</td>
                <td className="p-2 border-r text-center font-semibold">
                  <span className={`px-2 py-0.5 rounded text-[10px] ${
                    fee.type === 'Mandatory' ? 'bg-blue-100 text-blue-800' :
                    fee.type === 'Optional' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {fee.type}
                  </span>
                </td>
                <td className="p-2 border-r text-right font-bold text-green-700">₹ {fee.defaultAmount.toLocaleString()}</td>
                <td className="p-2 text-center text-green-600 font-bold">Active</td>
              </tr>
            ))}
            {feeHeads.length === 0 && (
               <tr>
                 <td colSpan={5} className="text-center p-8 text-slate-400 italic font-medium">No fee heads configured yet.</td>
               </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  )
}
