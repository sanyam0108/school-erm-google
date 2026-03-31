"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function StudentReportPage() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedClasses, setSelectedClasses] = useState<string[]>([])
  const [appliedClasses, setAppliedClasses] = useState<string[]>([])

  useEffect(() => {
    async function fetchStudents() {
      const { data: students, error } = await supabase
        .from('students')
        .select('*')
        .order('sn', { ascending: true, nullsFirst: false })
      
      if (!error && students) {
        setData(students)
      }
      setLoading(false)
    }
    fetchStudents()
  }, [])

  return (
    <div className="bg-[#f0f0f0] min-h-[700px] flex flex-col mx-auto text-[11px] font-sans border shadow-xl relative mt-0">
       
       {/* Master Top Control */}
       <div className="bg-white p-2 border-b-2 border-slate-400 flex shrink-0 shadow-sm relative z-10">
          <button className="bg-black text-white font-bold tracking-wider px-4 py-1.5 shadow-md border-x-2 border-black hover:bg-slate-800">
             SORT BY SR NUMBER
          </button>
       </div>

       {/* Horizontal Layout Split Container */}
       <div className="flex flex-1 overflow-hidden relative" style={{ height: "calc(100vh - 120px)" }}>
          
          {/* Left Vertical Filter Pane */}
          <div className="w-[200px] bg-[#fdfdfd] border-r-2 border-slate-300 p-3 shrink-0 flex flex-col gap-3 overflow-y-auto z-10 shadow-[4px_0_10px_rgba(0,0,0,0.02)]">
             <h3 className="text-teal-600 underline font-semibold mb-1 text-[12px]">Filters</h3>
             
             <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700 w-16">Till Date</span>
                <input type="text" defaultValue="28/03/2026" className="border border-slate-300 rounded px-1 h-6 flex-1 bg-white" />
             </div>

             <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700 w-16">Session</span>
                <select className="border border-slate-300 rounded px-1 h-6 flex-1 bg-white">
                   <option>2025-26</option>
                </select>
             </div>

             {/* Multi-Class List Box */}
             <div className="flex gap-2 mb-2">
                <span className="font-semibold text-slate-700 w-[42px] mt-1 shrink-0">Class</span>
                <div className="flex flex-col gap-2 w-full">
                  <label className="flex items-center gap-1 font-semibold text-slate-600 text-[10px]">
                     <input type="checkbox" onChange={(e) => {
                        if (e.target.checked) setSelectedClasses([])
                     }} checked={selectedClasses.length === 0} /> All Classes
                  </label>
                  <select 
                     multiple 
                     value={selectedClasses}
                     onChange={(e) => {
                        const values = Array.from(e.target.selectedOptions, option => option.value);
                        setSelectedClasses(values);
                     }}
                     className="border border-slate-300 w-full h-32 p-1 text-[11px] font-semibold text-slate-700 bg-white"
                  >
                     <option value="Nursery">NURSERY</option>
                     <option value="LKG-A">LKG</option>
                     <option value="UKG-A">UKG</option>
                     <option value="I-A">I-A</option>
                     <option value="II-A">II</option>
                     <option value="III-A">III</option>
                     <option value="IV-A">IV</option>
                     <option value="V-A">V-A</option>
                     <option value="V-B">V-B</option>
                     <option value="VI-A">VI-A</option>
                     <option value="VI-B">VI-B</option>
                     <option value="VII-A">VII-A</option>
                     <option value="VII-B">VII-B</option>
                     <option value="VIII-A">VIII-A</option>
                     <option value="VIII-B">VIII-B</option>
                     <option value="IX-A">IX-A</option>
                     <option value="IX-B">IX-B</option>
                     <option value="XI">XI</option>
                     <option value="XII">XII</option>
                  </select>
                </div>
             </div>

             {/* Dropdown Filters Block */}
             <div className="flex flex-col gap-1">
                <span className="font-semibold text-slate-700">Caste</span>
                <select className="border border-slate-300 rounded h-6 w-full"><option></option></select>
             </div>
             <div className="flex flex-col gap-1">
                <span className="font-semibold text-slate-700">Religion</span>
                <select className="border border-slate-300 rounded h-6 w-full"><option></option></select>
             </div>
             <div className="flex justify-between gap-2">
                 <div className="flex flex-col gap-1 w-1/3">
                    <span className="font-semibold text-slate-700">Transport</span>
                    <select className="border border-slate-300 rounded h-6"><option></option></select>
                 </div>
                 <div className="flex flex-col gap-1 w-1/3">
                    <span className="font-semibold text-slate-700">Discount</span>
                    <select className="border border-slate-300 rounded h-6"><option></option></select>
                 </div>
                 <div className="flex flex-col gap-1 w-1/3">
                    <span className="font-semibold text-slate-700">Gender</span>
                    <select className="border border-slate-300 rounded h-6"><option></option></select>
                 </div>
             </div>

             <hr className="border-slate-300 my-2" />

             {/* Age Filter Block */}
             <h3 className="text-red-500 underline font-bold mb-1 -mt-1 tracking-wide">AGE FILTER</h3>
             <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-slate-700">Till Date</span>
                <input type="text" defaultValue="28/03/2026" className="border border-slate-300 rounded px-1 h-6 w-[100px] bg-white" />
             </div>
             <div className="flex gap-1 text-[10px] justify-between text-slate-600 font-semibold text-center mb-1">
                <span>Less than</span><span>Greater than</span><span>Equals to</span>
             </div>
             <div className="flex gap-1 justify-between mb-2">
                <input type="text" className="border border-slate-300 w-[50px] h-6" />
                <input type="text" className="border border-slate-300 w-[50px] h-6" />
                <input type="text" className="border border-slate-300 w-[50px] h-6" />
             </div>

             <hr className="border-slate-300 my-1" />

             {/* Options Block */}
             <div className="flex gap-4 mb-2">
                <label className="flex items-center gap-1 font-semibold text-slate-600"><input type="checkbox" /> SR Generated</label>
                <label className="flex items-center gap-1 font-semibold text-slate-600"><input type="checkbox" /> SR not generated</label>
             </div>
             <label className="flex items-center gap-1 font-semibold text-slate-600 mb-2"><input type="checkbox" /> Show Discharged Students</label>

             <label className="flex items-center gap-1 font-semibold text-slate-800"><input type="radio" name="studentType" defaultChecked /> All Students</label>
             <label className="flex items-center gap-1 font-semibold text-slate-800 mb-2"><input type="radio" name="studentType" /> This Session Admitted Students</label>

             <div className="flex gap-2 w-full mt-auto pb-4">
                 <button 
                   onClick={() => {
                      if (selectedClasses.length === 0) {
                         alert("Please select at least one class to generate the report.")
                         return
                      }
                      setAppliedClasses([...selectedClasses])
                   }}
                   className="bg-black text-white font-bold h-8 flex-1 shadow hover:bg-slate-800 w-1/2 rounded-none border border-slate-600 tracking-wider">
                     SHOW
                 </button>
                 <button onClick={() => setAppliedClasses([])} className="bg-black text-white font-bold h-8 flex-1 shadow hover:bg-slate-800 w-1/2 rounded-none border border-slate-600 tracking-wider">
                     CLEAR
                 </button>
             </div>

          </div>

          {/* Right Heavy Grid Viewer */}
          <div className="flex-1 bg-white overflow-hidden flex flex-col relative z-0">
             
             {/* Report Title & Metadata Header */}
             <div className="w-full flex flex-col bg-white border-b border-slate-300 shrink-0 shadow-[0_4px_10px_rgba(0,0,0,0.02)]">
                <h2 className="text-center font-bold text-[#800080] text-[16px] py-4">Student Report</h2>
                <div className="px-4 py-2 text-[10px] font-bold text-slate-800 flex flex-col gap-2">
                   <span>Session :2025-26 ; Gender : All ; Caste : All ; Transport : All ; Discount : All ; Religion : All</span>
                   <span className="text-[12px]">Total Records: {appliedClasses.length > 0 ? data.filter(s => appliedClasses.includes(s.admit_class) || appliedClasses.includes(s.current_class)).length : 0}</span>
                </div>
             </div>

             {/* The Super Grid Array */}
             <div className="flex-1 overflow-auto bg-slate-50 relative p-4">
                 <div className="border shadow rounded bg-white overflow-hidden">
                    <table className="w-full text-center border-collapse text-[10.5px]">
                      <thead className="bg-[#a5d8dd] sticky top-0 shadow-sm outline outline-1 outline-slate-400">
                        <tr>
                          <th className="font-bold border border-slate-400 p-1.5 w-10 text-slate-900 border-t-0 border-l-0">S.No</th>
                          <th className="font-bold border border-slate-400 p-1.5 w-16 text-slate-900 border-t-0">ID</th>
                          <th className="font-bold border border-slate-400 p-1.5 w-16 text-slate-900 border-t-0">SR.No</th>
                          <th className="font-bold border border-slate-400 p-1.5 w-48 text-slate-900 border-t-0">Name</th>
                          <th className="font-bold border border-slate-400 p-1.5 w-48 text-slate-900 border-t-0">Father's name</th>
                          <th className="font-bold border border-slate-400 p-1.5 w-24 text-slate-900 border-t-0">Fcontact</th>
                          <th className="font-bold border border-slate-400 p-1.5 w-24 text-slate-900 border-t-0">Mcontact</th>
                          <th className="font-bold border border-slate-400 p-1.5 w-24 text-slate-900 border-t-0">Contact No</th>
                          <th className="font-bold border border-slate-400 p-1.5 w-16 text-slate-900 border-t-0">Class</th>
                          <th className="font-bold border border-slate-400 p-1.5 w-16 text-slate-900 border-t-0">Section</th>
                          <th className="font-bold border border-slate-400 p-1.5 w-20 text-slate-900 border-t-0">DOB</th>
                          <th className="font-bold border border-slate-400 p-1.5 w-24 text-slate-900 border-t-0 border-r-0">Reg Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                           <tr><td colSpan={12} className="text-center p-4 font-bold text-slate-500">Loading Databse Records...</td></tr>
                        ) : appliedClasses.length === 0 ? (
                           <tr><td colSpan={12} className="text-center p-4 font-bold text-blue-700 bg-blue-50">Please select classes from the left and press SHOW to generate the report.</td></tr>
                        ) : data.length === 0 ? (
                           <tr><td colSpan={12} className="text-center p-4 font-bold text-red-500 bg-red-50">No Student Records Found. Ensure Excel Upload is complete.</td></tr>
                        ) : data.filter(s => appliedClasses.includes(s.admit_class) || appliedClasses.includes(s.current_class)).map((s, idx) => (
                           <tr key={s.id} className="hover:bg-blue-50/50 bg-white">
                             <td className="border border-slate-400 p-1 border-l-0 font-semibold">{s.sn || idx + 1}</td>
                             <td className="border border-slate-400 p-1 text-slate-700">{s.id ? String(s.id).substring(0,6) : "N/A"}</td>
                             <td className="border border-slate-400 p-1 text-slate-700 font-bold">{s.sr || "-"}</td>
                             <td className="border border-slate-400 p-1 text-left pl-2 font-bold text-slate-800">{s.name}</td>
                             <td className="border border-slate-400 p-1 text-left pl-2 font-semibold text-slate-700">{s.fname}</td>
                             <td className="border border-slate-400 p-1 text-slate-700">{s.fcontact}</td>
                             <td className="border border-slate-400 p-1 text-slate-700">{s.mcontact}</td>
                             <td className="border border-slate-400 p-1 font-semibold">{s.phone_info}</td>
                             <td className="border border-slate-400 p-1 font-semibold">{s.current_class || s.admit_class}</td>
                             <td className="border border-slate-400 p-1 font-semibold text-slate-500">-</td>
                             <td className="border border-slate-400 p-1 text-slate-700">{s.dob}</td>
                             <td className="border border-slate-400 p-1 text-slate-700 border-r-0">{s.reg_date}</td>
                           </tr>
                        ))}
                        {Array.from({length: 12}).map((_, i) => (
                           <tr key={`empty-${i}`} className="h-[25px] bg-white">
                             <td className="border border-slate-400 border-l-0"></td><td className="border border-slate-400"></td><td className="border border-slate-400"></td><td className="border border-slate-400"></td><td className="border border-slate-400"></td><td className="border border-slate-400"></td><td className="border border-slate-400"></td><td className="border border-slate-400"></td><td className="border border-slate-400"></td><td className="border border-slate-400"></td><td className="border border-slate-400"></td><td className="border border-slate-400 border-r-0"></td>
                           </tr>
                        ))}
                      </tbody>
                    </table>
                 </div>
             </div>

          </div>

       </div>

    </div>
  )
}
