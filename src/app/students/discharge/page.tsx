import { Checkbox } from "@/components/ui/checkbox"

export default function DischargeStudent() {
  return (
    <div className="max-w-6xl mx-auto bg-white h-[calc(100vh-48px)] border shadow-sm flex flex-col mt-2">
      
      {/* Search Header */}
      <div className="bg-[#f5f5f5] p-2 border-b flex items-center gap-6 text-[11px]">
        <div className="flex items-center gap-2">
          <label className="font-semibold text-slate-700">Session</label>
          <select className="h-6 border bg-white border-slate-300 rounded w-28 px-1">
            <option>2024-25</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input type="radio" defaultChecked name="searchBy" className="mt-0.5" />
          <label className="font-medium">Name</label>
          <input type="text" defaultValue="kapil" className="h-6 border border-slate-300 rounded w-48 px-2" />
        </div>

        <div className="flex items-center gap-2">
          <input type="radio" name="searchBy" className="mt-0.5" />
          <label className="font-medium">Class</label>
          <select className="h-6 bg-white border border-slate-300 rounded w-20 px-1">
            <option>I</option>
            <option>XII</option>
          </select>
          <select className="h-6 bg-white border border-slate-300 rounded w-16 px-1 ml-1">
            <option>A</option>
            <option>Science</option>
          </select>
        </div>
      </div>
      
      {/* Sub Header Links */}
      <div className="px-2 py-1.5 border-b flex items-center gap-4 text-[10px]">
        <label className="flex items-center gap-1 font-medium"><input type="checkbox" /> Select All</label>
        <a href="#" className="font-medium text-blue-700 hover:underline">View OR Edit Discharge Students</a>
      </div>

      {/* Main Table Grid Area */}
      <div className="flex-1 overflow-auto bg-white border-b border-b-2">
        <table className="w-full text-left border-collapse text-[11px]">
          <thead className="bg-[#f0f0f0] sticky top-0 shadow-sm border-b-2">
            <tr>
              <th className="font-semibold p-1 w-12 text-center border-r">Select</th>
              <th className="font-semibold p-1 w-20 border-r">RegNumber</th>
              <th className="font-semibold p-1 w-20 border-r">SR</th>
              <th className="font-semibold p-1 border-r">Name</th>
              <th className="font-semibold p-1 border-r">Fname</th>
              <th className="font-semibold p-1 border-r w-32">Class</th>
              <th className="font-semibold p-1 w-32 border-l">Section</th>
            </tr>
          </thead>
          <tbody>
            {/* Hardcoded result matching the screenshot */}
            <tr className="border-b border-slate-300 even:bg-slate-50">
              <td className="p-1 px-2 text-center border-r bg-[#3399ff]">
                <input type="checkbox" defaultChecked className="w-3 h-3 border-none bg-white" />
              </td>
              <td className="p-1 px-2 border-r">1109</td>
              <td className="p-1 px-2 border-r">1109</td>
              <td className="p-1 px-2 border-r">KAPIL RAMWANI</td>
              <td className="p-1 px-2 border-r">SHIV CHARN RAMWANI</td>
              <td className="p-1 px-2 border-r">XII</td>
              <td className="p-1 px-2">Science</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bottom Action Footer */}
      <div className="bg-[#f5f5f5] p-3 flex flex-wrap items-end gap-6 text-[11px] shrink-0 border-t-2">
        <div className="flex flex-col gap-1 w-32">
          <label className="font-semibold text-slate-700">Discharge Date</label>
          <input type="text" defaultValue="28/03/2026" className="h-6 border border-slate-300 rounded px-2 w-full" />
        </div>

        <div className="flex flex-col gap-1 w-64">
          <label className="font-semibold text-slate-700">Reason</label>
          <input type="text" defaultValue="FOR FURTHER STUDIES" className="h-6 border border-slate-300 rounded px-2 w-full" />
        </div>

        <div className="flex flex-col gap-1 w-48">
          <label className="font-semibold text-slate-700">Status</label>
          <select className="h-6 border border-slate-300 bg-white rounded px-2 w-full text-slate-600">
            <option></option>
            <option>Pass Out</option>
            <option>Drop Out</option>
            <option>Transfer</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 w-32">
          <label className="font-semibold text-slate-700">Last Session Studied</label>
          <select className="h-6 border border-slate-300 bg-white shadow-inner rounded px-1 w-full text-slate-600 bg-slate-200">
            <option>2024-25</option>
          </select>
        </div>

        <div className="flex items-center gap-2 mb-[2px]">
           <button className="bg-black text-white font-bold h-6 px-4 hover:bg-slate-800">DISCHARGE</button>
           <button className="bg-black text-white font-bold h-6 px-4 hover:bg-slate-800">EXIT</button>
        </div>
      </div>
      
    </div>
  )
}
