"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function FeesConfiguration() {
  const router = useRouter();
  const [totalFees, setTotalFees] = useState(50000)
  const [discount, setDiscount] = useState(5000)
  const [transportFees, setTransportFees] = useState(12000)

  const remainingBalance = totalFees - discount + transportFees
  const totalPaid = 0 // Initial state

  return (
    <div className="max-w-4xl mx-auto bg-white min-h-[500px] border shadow-sm mt-4 text-[13px] flex flex-col">
      <div className="bg-[#000080] text-white px-4 py-2 font-bold text-sm flex justify-between">
        <span>Step 4: Configure Student Fees</span>
        <span className="text-blue-200">SR: 1109 | Name: KAPIL RAMWANI</span>
      </div>

      <div className="p-6 grid grid-cols-2 gap-8">
        
        {/* Left Side: Inputs */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-700 border-b pb-1 mb-3">Fee Structure Setup</h3>
          
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-slate-700">Annual Total Fees</label>
            <div className="relative">
              <span className="absolute left-2 top-1.5 text-slate-500">₹</span>
              <input type="number" value={totalFees} onChange={e => setTotalFees(Number(e.target.value))} className="h-8 pl-6 border border-slate-300 rounded w-full font-medium" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold text-slate-700">Discount (if applicable)</label>
            <div className="relative">
              <span className="absolute left-2 top-1.5 text-slate-500">₹</span>
              <input type="number" value={discount} onChange={e => setDiscount(Number(e.target.value))} className="h-8 pl-6 border border-slate-300 rounded w-full font-medium text-red-600" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold text-slate-700">Transport Fees</label>
            <div className="relative">
              <span className="absolute left-2 top-1.5 text-slate-500">₹</span>
              <input type="number" value={transportFees} onChange={e => setTransportFees(Number(e.target.value))} className="h-8 pl-6 border border-slate-300 rounded w-full font-medium" />
            </div>
          </div>

          <div className="flex flex-col gap-1 pt-2">
            <label className="font-semibold text-slate-700">Installment Type</label>
            <select className="h-8 border border-slate-300 rounded w-full bg-slate-50 font-medium">
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Half Yearly</option>
              <option>Yearly</option>
              <option>Custom</option>
            </select>
          </div>
        </div>

        {/* Right Side: Calculations Panel */}
        <div className="bg-slate-50 border p-4 rounded-sm flex flex-col justify-center">
          <h3 className="font-bold text-slate-700 border-b pb-1 mb-4 text-center">Summary Preview</h3>
          
          <div className="flex justify-between py-2 border-b border-dashed">
            <span className="text-slate-600">Total Charges:</span>
            <span className="font-bold text-slate-800">₹ {totalFees + transportFees}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-dashed">
            <span className="text-slate-600">Total Discount:</span>
            <span className="font-bold text-red-600">- ₹ {discount}</span>
          </div>
          
          <div className="flex justify-between py-3 mt-2 bg-blue-50 px-2 rounded">
            <span className="font-bold text-[#000080]">Remaining Balance:</span>
            <span className="font-bold text-[#000080] text-base">₹ {remainingBalance.toLocaleString()}</span>
          </div>

          <div className="flex justify-between py-3 mt-2">
            <span className="text-slate-600">Total Paid So Far:</span>
            <span className="font-bold text-green-600">₹ {totalPaid}</span>
          </div>

          <div className="flex justify-between py-3 border-t">
            <span className="font-bold text-slate-700">Next Installment Due Date:</span>
            <span className="font-bold text-orange-600">10 April 2026</span>
          </div>
        </div>

      </div>

      <div className="mt-auto border-t bg-slate-100 p-4 flex justify-end gap-3 rounded-b">
        <button className="px-6 py-2 bg-white border border-slate-300 font-bold hover:bg-slate-50 shadow-sm" onClick={() => router.back()}>BACK</button>
        <button className="px-6 py-2 bg-[#000080] text-white font-bold hover:bg-blue-900 shadow-sm" onClick={() => router.push('/students/ledger')}>FINALIZE & SAVE</button>
      </div>

    </div>
  )
}
