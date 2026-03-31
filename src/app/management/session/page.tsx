import { Input } from "@/components/ui/input"

export default function ManagementSession() {
  // Mock data mimicking the screenshot
  const sessions = [
    { code: 1, session: "2017-18", startMonth: "April" },
    { code: 2, session: "2018-19", startMonth: "April" },
    { code: 3, session: "2019-20", startMonth: "April" },
    { code: 4, session: "2020-21", startMonth: "April" },
    { code: 5, session: "2021-22", startMonth: "April" },
    { code: 6, session: "2022-23", startMonth: "April" },
    { code: 7, session: "2023-24", startMonth: "April" },
    { code: 8, session: "2024-25", startMonth: "April" },
    { code: 29, session: "2025-26", startMonth: "April" }
  ]

  return (
    <div className="max-w-4xl bg-white min-h-[500px] border shadow-sm mx-auto mt-4">
      {/* Top action bar */}
      <div className="flex items-center gap-4 p-2 border-b bg-white text-[11px]">
        <label className="font-semibold text-slate-700">Session</label>
        <input type="text" className="w-24 h-6 border border-slate-300 rounded px-1" />
        
        <label className="font-semibold text-slate-700 ml-4">Starting month of this Session</label>
        <select className="h-6 border border-slate-300 rounded px-1 text-[11px] w-24">
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April" selected>April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
        
        <button className="bg-black text-white px-6 h-6 font-bold text-[11px] hover:bg-slate-800 ml-2">ADD</button>
      </div>

      {/* Data Table */}
      <div className="w-full">
        <table className="w-full text-left border-collapse text-[11px]">
          <thead>
            <tr className="border-b bg-white">
              <th className="font-semibold p-1.5 w-12 text-center">Select</th>
              <th className="font-semibold p-1.5 w-16">Code</th>
              <th className="font-semibold p-1.5">Session</th>
              <th className="font-semibold p-1.5">Session_Start_Month</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((s, idx) => (
              <tr 
                key={s.code} 
                className={`border-b ${idx === 0 ? "bg-[#3399ff] text-white" : "even:bg-slate-50"}`}
              >
                <td className="p-1 px-2 text-center">
                  <input type="checkbox" className="w-3 h-3 border-slate-300" />
                </td>
                <td className="p-1 px-2 font-bold">{idx + 1}</td>
                <td className="p-1 px-2 font-semibold text-[#000080]">{s.session}</td>
                <td className="p-1 px-2 font-semibold">{s.startMonth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
