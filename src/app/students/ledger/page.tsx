import Link from "next/link"

export default function StudentLedger() {
  return (
    <div className="max-w-6xl mx-auto bg-transparent min-h-screen mt-4 flex gap-4 text-[13px]">
      
      {/* Sidebar Profile */}
      <div className="w-64 shrink-0 flex flex-col gap-4">
        <div className="bg-white border rounded shadow-sm p-4 flex flex-col items-center">
          <div className="w-24 h-24 bg-slate-200 rounded-full mb-3 flex items-center justify-center font-bold text-slate-400">PHOTO</div>
          <h2 className="font-bold text-[#000080] text-base text-center">KAPIL RAMWANI</h2>
          <p className="text-slate-500 font-medium text-xs mb-2">Class XII - Science (1109)</p>
          <div className="w-full bg-red-50 border border-red-200 text-red-700 font-bold p-2 rounded text-center mb-2">
            Due: ₹ 52,000
          </div>
          <Link href="/fees/payment">
            <button className="w-full bg-green-600 text-white font-bold py-1.5 rounded hover:bg-green-700 text-xs">
              Take Payment
            </button>
          </Link>
        </div>

        <div className="bg-white border rounded shadow-sm p-4 flex flex-col gap-2 text-xs">
          <div className="flex justify-between border-b pb-1"><span className="text-slate-500">Father</span><span className="font-semibold">SHIV CHARN</span></div>
          <div className="flex justify-between border-b pb-1"><span className="text-slate-500">Contact</span><span className="font-semibold">+91 9876543210</span></div>
          <div className="flex justify-between border-b pb-1"><span className="text-slate-500">Transport</span><span className="font-semibold text-green-600">Active</span></div>
        </div>
      </div>

      {/* Main Ledger Dashboard */}
      <div className="flex-1 flex flex-col gap-4">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white border rounded p-4 shadow-sm border-t-4 border-t-[#000080]">
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total Base Fees</p>
            <p className="text-2xl font-bold mt-1 text-slate-800">₹ 50,000</p>
          </div>
          <div className="bg-white border rounded p-4 shadow-sm border-t-4 border-t-orange-400">
             <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Transport & Extras</p>
             <p className="text-2xl font-bold mt-1 text-slate-800">+ ₹ 12,000</p>
          </div>
          <div className="bg-white border rounded p-4 shadow-sm border-t-4 border-t-red-500">
             <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total Applied Discount</p>
             <p className="text-2xl font-bold mt-1 text-red-600">- ₹ 5,000</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded p-4 shadow-sm border-t-4 border-t-green-500">
             <p className="text-green-800 text-xs font-bold uppercase tracking-wider">Total Paid</p>
             <p className="text-2xl font-bold mt-1 text-green-700">₹ 5,000</p>
          </div>
        </div>

        <div className="bg-white border rounded shadow-sm flex flex-col flex-1">
          <div className="px-4 py-3 border-b bg-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-[#000080]">Transaction History (Ledger)</h3>
            <span className="bg-white text-xs px-2 py-1 border rounded shadow-inner font-bold text-slate-600">Installment Plan: Monthly</span>
          </div>

          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b bg-slate-100">
                <th className="p-2 border-r text-center w-24">Date</th>
                <th className="p-2 border-r">Description / Notes</th>
                <th className="p-2 border-r w-32 text-center">Mode</th>
                <th className="p-2 border-r w-32 text-right">Debit (Fee)</th>
                <th className="p-2 border-r w-32 text-right">Credit (Paid)</th>
                <th className="p-2 w-32 text-right">Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-slate-50">
                <td className="p-2 border-r text-center text-slate-500">01/04/2026</td>
                <td className="p-2 border-r font-medium">Opening Balance (Annual Fees + Transport - Discount)</td>
                <td className="p-2 border-r text-center text-slate-400">-</td>
                <td className="p-2 border-r text-right font-medium text-red-600">₹ 57,000</td>
                <td className="p-2 border-r text-right">-</td>
                <td className="p-2 text-right font-bold text-slate-800">₹ 57,000</td>
              </tr>
              <tr className="border-b bg-green-50">
                <td className="p-2 border-r text-center text-slate-600 font-medium">05/04/2026</td>
                <td className="p-2 border-r font-medium">April Installment Received (UPI ID: 9872)</td>
                <td className="p-2 border-r text-center font-bold text-slate-700">UPI</td>
                <td className="p-2 border-r text-right">-</td>
                <td className="p-2 border-r text-right font-bold text-green-700">₹ 5,000</td>
                <td className="p-2 text-right font-bold text-slate-800">₹ 52,000</td>
              </tr>
              {/* Empty state filling up the rest */}
              <tr>
                <td className="p-8 border-r text-center" colSpan={6}>
                  <p className="text-slate-400 font-medium italic">No further transactions logged.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

    </div>
  )
}
