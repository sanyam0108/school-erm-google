"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function PaymentEntry() {
  const router = useRouter();
  const [studentSearch, setStudentSearch] = useState("1109 - KAPIL RAMWANI")
  
  // Mock Database state
  const initialBalance = 57000;
  const [amount, setAmount] = useState<number | string>(5000);
  
  const paymentAmount = Number(amount) || 0;
  const newBalance = initialBalance - paymentAmount;

  return (
    <div className="max-w-3xl mx-auto bg-white min-h-[500px] border shadow-sm mt-4 text-[13px] flex flex-col">
      <div className="bg-[#000080] text-white px-4 py-2 font-bold text-sm flex items-center justify-between">
        <span>Receive Payment Entry</span>
      </div>

      <div className="p-6">
        {/* Student Lookup area */}
        <div className="bg-slate-50 p-3 border rounded mb-6 flex items-end gap-4">
          <div className="flex-1 flex flex-col gap-1">
            <label className="font-semibold text-slate-700 text-xs">Search Student (SR No / Name)</label>
            <input type="text" value={studentSearch} onChange={e => setStudentSearch(e.target.value)} className="h-8 border border-slate-300 rounded px-2 w-full font-bold text-blue-800" />
          </div>
          <div className="flex flex-col gap-1 w-48">
             <label className="font-semibold text-slate-700 text-xs">Current Balance</label>
             <div className="h-8 flex items-center px-2 bg-red-50 text-red-700 font-bold border border-red-200 rounded">
                ₹ {initialBalance.toLocaleString()}
             </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-slate-700 border-l-4 border-green-500 pl-2">Amount Received</label>
            <div className="relative">
              <span className="absolute left-2 top-1.5 text-slate-500 font-bold">₹</span>
              <input 
                type="number" 
                value={amount} 
                onChange={e => setAmount(e.target.value)} 
                className="h-8 pl-6 border-2 border-green-500 rounded w-full font-bold text-green-700 text-base" 
                autoFocus
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold text-slate-700">Payment Date</label>
            <input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="h-8 border border-slate-300 rounded px-2 w-full font-medium" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold text-slate-700">Payment Mode</label>
            <select className="h-8 border border-slate-300 rounded w-full bg-slate-50 font-medium">
              <option>Cash</option>
              <option>UPI</option>
              <option>Bank Transfer</option>
              <option>Card</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold text-slate-700">Notes / Details</label>
            <input type="text" placeholder="e.g. Transaction ID, Cheque No..." className="h-8 border border-slate-300 rounded px-2 w-full" />
          </div>
          
        </div>

        {/* Dynamic Result Footer */}
        <div className="mt-8 bg-blue-50 border border-blue-100 p-4 rounded flex justify-between items-center text-sm">
          <div className="flex gap-2 items-center">
            <span className="text-slate-600">Calculated New Balance:</span>
            <span className="font-bold text-2xl text-[#000080]">₹ {newBalance.toLocaleString()}</span>
          </div>
          <button className="bg-[#000080] text-white px-8 py-2 font-bold rounded shadow-lg hover:bg-blue-900" onClick={() => router.push('/students/ledger')}>
             PROCESS PAYMENT
          </button>
        </div>

      </div>
    </div>
  )
}
