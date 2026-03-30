"use client"

import { useState } from "react"

const mockData = [
  { sn: 1, sr: "1390", name: "LAKSHYA KANWAT", fname: "MUKESH KUMAR MEENA", mname: "SAROJ DEVI", fcontact: "8888888888", mcontact: "8888888888", phoneInfo: "9636139738", admitClass: "Nursery-A", gender: "M", caste: "ST", address: "MEENAPURA RAMGARH, ALWAR", regDate: "30/08/2013", dob: "27/09/2010" },
  { sn: 2, sr: "1407", name: "AKRITI SRIVASTAVA", fname: "BISHWA NAYAK SRIVASTAVA", mname: "NISHI SRIVASTAVA", fcontact: "8888888888", mcontact: "8888888888", phoneInfo: "9983578075", admitClass: "LKG-A", gender: "F", caste: "", address: "JANTA COLONY, ALWAR", regDate: "10/04/2014", dob: "04/05/2010" },
  { sn: 3, sr: "1585", name: "BHARAT RATAN PRAJAPAT", fname: "DEEPAK PRAJAPAT", mname: "KRIPA DEVI", fcontact: "8888888888", mcontact: "8888888888", phoneInfo: "9414641694", admitClass: "Nursery-A", gender: "M", caste: "OBC", address: "SEETAL LAXMANGARH, ALWAR", regDate: "03/08/2014", dob: "27/03/2011" },
  { sn: 4, sr: "4517", name: "NAITIK AGARWAL", fname: "RAKESH PRASAD", mname: "PINKY", fcontact: "", mcontact: "", phoneInfo: "9999999999", admitClass: "VIII-A", gender: "M", caste: "General", address: "KAROLI, ALWAR", regDate: "28/08/2023", dob: "02/12/2009" },
  { sn: 5, sr: "4519", name: "DIVYANSH SINGH", fname: "SHARAD SINGH", mname: "SUSHMA SINGH", fcontact: "", mcontact: "", phoneInfo: "9999999999", admitClass: "VIII-A", gender: "M", caste: "General", address: "ALWAR", regDate: "28/08/2023", dob: "13/07/2009" },
  { sn: 6, sr: "4669", name: "AVI GUPTA", fname: "SANJAY KUMAR GUPTA", mname: "SUMAN GUPTA", fcontact: "", mcontact: "", phoneInfo: "9460732507", admitClass: "VIII-A", gender: "M", caste: "General", address: "111, RANG BHARIO KI GALI NEAR SHIV TEMPLE ALWAR", regDate: "31/08/2023", dob: "10/06/2010" },
  { sn: 7, sr: "4689", name: "GUNTAAS SINGH", fname: "RAJENDRA SINGH", mname: "MANPREET KAUR", fcontact: "9351879797", mcontact: "", phoneInfo: "9983079797", admitClass: "VIII-B", gender: "M", caste: "General", address: "162, ADARSH COLONY DAUDPUR", regDate: "25/10/2023", dob: "15/10/2010" },
]

export default function ExportDataReport() {
  return (
    <div className="bg-white min-h-[600px] flex flex-col mx-auto text-[11px] font-sans border border-slate-300 shadow-md">
       
       {/* Top Filter Bar */}
       <div className="bg-[#fdfdfd] border-b border-slate-300 flex flex-col shrink-0 relative z-10 p-2 shadow-sm">
          
          <div className="flex items-center gap-4 mb-2">
             <span className="font-semibold text-slate-800 text-[12px]">Session</span>
             <select className="border border-slate-300 rounded px-1 h-6 w-32 bg-white">
                <option>2025-26</option>
             </select>
          </div>

          <div className="flex gap-4">
             <div className="flex gap-2 items-start">
               <span className="font-semibold text-slate-800 mt-[2px] w-8">Class</span>
               <select multiple className="border border-slate-400 w-32 h-20 p-1 text-[11px] bg-white outline-none">
                  <option>IV-B</option>
                  <option>V-C</option>
                  <option>IX-D</option>
                  <option selected className="bg-[#3b82f6] text-white">X-D</option>
               </select>
             </div>

             <div className="flex flex-col gap-1 ml-2">
                <label className="flex items-center gap-1.5 text-slate-600 font-semibold text-[10px]">
                   <input type="checkbox" /> Show Discharge Students
                </label>
                <label className="flex items-center gap-1.5 text-slate-600 font-semibold text-[10px]">
                   <input type="checkbox" /> All Class
                </label>

                <div className="flex items-center gap-2 mt-2">
                   <button className="bg-[#f0f0f0] border border-black text-black font-semibold h-6 px-4 hover:bg-slate-200">
                      Show
                   </button>
                   <button className="bg-[#e8f0fe] border border-indigo-600 text-indigo-700 font-semibold h-6 px-4 hover:bg-indigo-100">
                      Exit
                   </button>
                </div>
             </div>
          </div>
       </div>

       {/* Crystal Report Simulation Toolbar */}
       <div className="bg-[#f5f5f5] flex items-center p-1 border-b border-slate-300 shrink-0 gap-4 shadow-sm select-none">
          <div className="flex items-center gap-2 border-r border-slate-300 pr-4">
             <button className="text-slate-500 hover:text-slate-800 border p-0.5 bg-white"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg></button>
             <span className="font-bold">1</span>
             <span className="text-slate-600">of 5</span>
             <button className="text-slate-500 hover:text-slate-800 border p-0.5 bg-white"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg></button>
          </div>
          <div className="flex items-center gap-2 border-r border-slate-300 pr-4">
             <button className="text-slate-600 hover:bg-slate-200 p-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg></button>
             <button className="text-slate-600 hover:bg-slate-200 p-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg></button>
          </div>
          <select className="border border-slate-300 rounded text-[10px] w-16 h-5"><option>100%</option></select>
          <div className="flex items-center gap-2 ml-auto">
             <input type="text" placeholder="Find" className="border border-slate-300 w-32 h-5 indent-1 text-[10px]" />
             <button className="text-slate-500 text-[10px]">Next</button>
          </div>
       </div>

       {/* Grid Canvas Layer */}
       <div className="flex-1 overflow-auto bg-[#e5e7eb] p-2 relative flex justify-center">
            
          {/* Main Document Canvas mimicking crystal rendering */}
          <div className="bg-white border border-slate-400 shadow-xl overflow-hidden w-full max-w-full">
             <table className="w-full text-left border-collapse text-[10px] whitespace-nowrap">
               <thead className="bg-[#fdfdfd] border-b-2 border-slate-400 shadow-sm border-t border-slate-300">
                 <tr>
                   <th className="font-bold px-2 py-1.5 border-r border-slate-300 text-slate-800">SN</th>
                   <th className="font-bold px-2 py-1.5 border-r border-slate-300 text-slate-800">SR</th>
                   <th className="font-bold px-2 py-1.5 border-r border-slate-300 text-slate-800">Name</th>
                   <th className="font-bold px-2 py-1.5 border-r border-slate-300 text-slate-800">Fname</th>
                   <th className="font-bold px-2 py-1.5 border-r border-slate-300 text-slate-800">Mname</th>
                   <th className="font-bold px-2 py-1.5 border-r border-slate-300 text-slate-800">Fcontact</th>
                   <th className="font-bold px-2 py-1.5 border-r border-slate-300 text-slate-800">Mcontact</th>
                   <th className="font-bold px-2 py-1.5 border-r border-slate-300 text-slate-800">Phone Info</th>
                   <th className="font-bold px-2 py-1.5 border-r border-slate-300 text-slate-800">AdmitteClass</th>
                   <th className="font-bold px-2 py-1.5 border-r border-slate-300 text-slate-800">Gender</th>
                   <th className="font-bold px-2 py-1.5 border-r border-slate-300 text-slate-800">Caste</th>
                   <th className="font-bold px-2 py-1.5 border-r border-slate-300 text-slate-800 max-w-[200px]">Address</th>
                   <th className="font-bold px-2 py-1.5 border-r border-slate-300 text-slate-800">Reg Date</th>
                   <th className="font-bold px-2 py-1.5 text-slate-800">DOB</th>
                 </tr>
               </thead>
               <tbody>
                 {mockData.map((row) => (
                    <tr key={row.sn} className="border-b border-slate-300 hover:bg-slate-50 transition-colors">
                      <td className="px-2 py-1.5 border-r border-slate-300 text-right font-medium">{row.sn}</td>
                      <td className="px-2 py-1.5 border-r border-slate-300 text-slate-700">{row.sr}</td>
                      <td className="px-2 py-1.5 border-r border-slate-300 text-slate-800">{row.name}</td>
                      <td className="px-2 py-1.5 border-r border-slate-300 text-slate-700">{row.fname}</td>
                      <td className="px-2 py-1.5 border-r border-slate-300 text-slate-700">{row.mname}</td>
                      <td className="px-2 py-1.5 border-r border-slate-300 text-slate-600">{row.fcontact}</td>
                      <td className="px-2 py-1.5 border-r border-slate-300 text-slate-600">{row.mcontact}</td>
                      <td className="px-2 py-1.5 border-r border-slate-300 text-slate-700 font-medium">{row.phoneInfo}</td>
                      <td className="px-2 py-1.5 border-r border-slate-300 text-slate-800">{row.admitClass}</td>
                      <td className="px-2 py-1.5 border-r border-slate-300 text-slate-600 font-semibold">{row.gender}</td>
                      <td className="px-2 py-1.5 border-r border-slate-300 text-slate-600">{row.caste}</td>
                      <td className="px-2 py-1.5 border-r border-slate-300 text-slate-700 whitespace-normal text-[9px] w-[180px] leading-tight">{row.address}</td>
                      <td className="px-2 py-1.5 border-r border-slate-300 text-slate-700">{row.regDate}</td>
                      <td className="px-2 py-1.5 text-slate-700">{row.dob}</td>
                    </tr>
                 ))}
                 {/* Visual Empty Buffer Rows to simulate physical page bottom */}
                 {Array.from({length: 10}).map((_, i) => (
                    <tr key={`empty-${i}`} className="h-[30px]">
                      <td className="border-r border-slate-300"></td><td className="border-r border-slate-300"></td><td className="border-r border-slate-300"></td><td className="border-r border-slate-300"></td><td className="border-r border-slate-300"></td><td className="border-r border-slate-300"></td><td className="border-r border-slate-300"></td><td className="border-r border-slate-300"></td><td className="border-r border-slate-300"></td><td className="border-r border-slate-300"></td><td className="border-r border-slate-300"></td><td className="border-r border-slate-300"></td><td className="border-r border-slate-300"></td><td></td>
                    </tr>
                 ))}
               </tbody>
             </table>
          </div>

       </div>

    </div>
  )
}
