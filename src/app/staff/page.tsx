"use client"

import { useState } from "react"

const mockStaff = [
  { id: 1, name: "RAMESH KUMAR", title: "Principal", area: "Administration", allocation: "N/A" },
  { id: 2, name: "SARITA SHARMA", title: "PGT", area: "Science", allocation: "XI, XII" },
  { id: 3, name: "AMIT SINGH", title: "TGT", area: "Mathematics", allocation: "IX-A, X-A" },
  { id: 4, name: "PRIYANKA VERMA", title: "PRT", area: "Primary", allocation: "I-A, II-A" },
]

export default function StaffManagement() {
  const [staffList, setStaffList] = useState(mockStaff)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  
  const [formData, setFormData] = useState({
     name: "",
     title: "",
     area: "",
     allocation: ""
  })

  const toggleSelect = (id: number, staff: any) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id))
      setFormData({ name: "", title: "", area: "", allocation: "" })
    } else {
      setSelectedIds([id]) // single selection for easy edit
      setFormData({
         name: staff.name,
         title: staff.title,
         area: staff.area,
         allocation: staff.allocation
      })
    }
  }

  const handleAdd = () => {
    if (!formData.name.trim()) return;
    const newId = staffList.length > 0 ? Math.max(...staffList.map(s => s.id)) + 1 : 1
    setStaffList([{ 
       id: newId, 
       name: formData.name.toUpperCase(), 
       title: formData.title, 
       area: formData.area, 
       allocation: formData.allocation 
    }, ...staffList])
    setFormData({ name: "", title: "", area: "", allocation: "" })
  }

  const handleUpdate = () => {
    if (selectedIds.length !== 1 || !formData.name.trim()) return;
    setStaffList(staffList.map(s => 
       s.id === selectedIds[0] ? {
           ...s,
           name: formData.name.toUpperCase(),
           title: formData.title,
           area: formData.area,
           allocation: formData.allocation
       } : s
    ))
    setSelectedIds([])
    setFormData({ name: "", title: "", area: "", allocation: "" })
  }

  const handleDelete = () => {
    if (selectedIds.length === 0) return;
    if (window.confirm("Are you sure you want to remove selected staff?")) {
       setStaffList(staffList.filter(s => !selectedIds.includes(s.id)))
       setSelectedIds([])
       setFormData({ name: "", title: "", area: "", allocation: "" })
    }
  }

  return (
    <div className="bg-white min-h-[700px] border shadow-sm mt-0 text-[11px] flex flex-col mx-auto max-w-6xl">
      
      {/* Top Banner */}
      <div className="bg-[#800080] text-white p-3 font-bold text-[14px] shadow-sm tracking-wider">
         STAFF & FACULTY MANAGEMENT
      </div>

      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 120px)" }}>
         
         {/* Left Edit Pane */}
         <div className="w-[280px] bg-[#fdfdfd] border-r-2 border-slate-300 p-4 shrink-0 flex flex-col gap-4 overflow-y-auto">
            <h3 className="text-teal-600 underline font-bold mb-2 text-[13px] uppercase">Staff Details Form</h3>
            
            <div className="flex flex-col gap-1">
               <span className="font-bold text-slate-700">Full Name *</span>
               <input 
                 type="text" 
                 value={formData.name}
                 onChange={(e) => setFormData({...formData, name: e.target.value})}
                 className="border border-slate-400 rounded px-2 h-7 font-bold text-slate-800" 
                 placeholder="e.g. AMIT SINGH"
               />
            </div>

            <div className="flex flex-col gap-1">
               <span className="font-bold text-slate-700">Title / Designation</span>
               <select 
                 value={formData.title}
                 onChange={(e) => setFormData({...formData, title: e.target.value})}
                 className="border border-slate-400 rounded px-2 h-7 font-semibold text-slate-700 bg-white"
               >
                  <option value="">-- Select Title --</option>
                  <option value="Principal">Principal</option>
                  <option value="Vice Principal">Vice Principal</option>
                  <option value="PGT">PGT (Post Grad Teacher)</option>
                  <option value="TGT">TGT (Trained Grad Teacher)</option>
                  <option value="PRT">PRT (Primary Teacher)</option>
                  <option value="Clerk">Clerk / Office Staff</option>
                  <option value="Support">Support Staff</option>
               </select>
            </div>

            <div className="flex flex-col gap-1">
               <span className="font-bold text-slate-700">Department Area</span>
               <select 
                 value={formData.area}
                 onChange={(e) => setFormData({...formData, area: e.target.value})}
                 className="border border-slate-400 rounded px-2 h-7 font-semibold text-slate-700 bg-white"
               >
                  <option value="">-- Select Area --</option>
                  <option value="Administration">Administration</option>
                  <option value="Science">Science Pipeline</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Humanities">Humanities / Arts</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Primary">Primary Floor</option>
                  <option value="Sports">Sports / P.E.</option>
               </select>
            </div>

            <div className="flex flex-col gap-1">
               <span className="font-bold text-slate-700">Class Allocation (Optional)</span>
               <input 
                 type="text" 
                 value={formData.allocation}
                 onChange={(e) => setFormData({...formData, allocation: e.target.value})}
                 className="border border-slate-400 rounded px-2 h-7 font-semibold text-slate-800" 
                 placeholder="e.g. IX-A, X-B"
               />
            </div>

            <div className="mt-4 flex flex-col gap-2">
               {selectedIds.length === 1 ? (
                  <button onClick={handleUpdate} className="bg-blue-600 text-white font-bold h-8 shadow hover:bg-blue-700 tracking-wider w-full rounded">
                     SAVE CHANGES
                  </button>
               ) : (
                  <button onClick={handleAdd} className="bg-green-600 text-white font-bold h-8 shadow hover:bg-green-700 tracking-wider w-full rounded">
                     ADD NEW STAFF
                  </button>
               )}
               {selectedIds.length > 0 && (
                  <button onClick={handleDelete} className="bg-red-600 text-white font-bold h-8 shadow hover:bg-red-700 tracking-wider w-full rounded">
                     DELETE SELECTED
                  </button>
               )}
               <button onClick={() => {setSelectedIds([]); setFormData({ name: "", title: "", area: "", allocation: "" })}} className="bg-slate-200 text-slate-800 border border-slate-400 font-bold h-8 shadow hover:bg-slate-300 tracking-wider w-full rounded">
                  CLEAR FORM
               </button>
            </div>
         </div>

         {/* Right Heavy Grid Viewer */}
         <div className="flex-1 bg-slate-50 overflow-auto relative p-4">
             <div className="border shadow rounded bg-white overflow-hidden">
                <table className="w-full text-left border-collapse text-[11px]">
                  <thead className="bg-[#a5d8dd] sticky top-0 shadow-sm outline outline-1 outline-slate-400">
                    <tr>
                      <th className="font-bold border border-slate-400 p-2 w-12 text-center text-slate-900 border-t-0 border-l-0">Select</th>
                      <th className="font-bold border border-slate-400 p-2 w-16 text-slate-900 border-t-0 text-center">ID</th>
                      <th className="font-bold border border-slate-400 p-2 w-48 text-slate-900 border-t-0">Staff Member Name</th>
                      <th className="font-bold border border-slate-400 p-2 w-32 text-slate-900 border-t-0">Title</th>
                      <th className="font-bold border border-slate-400 p-2 w-32 text-slate-900 border-t-0">Department Area</th>
                      <th className="font-bold border border-slate-400 p-2 text-slate-900 border-t-0 border-r-0">Class Allocation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffList.map((s) => (
                       <tr 
                          key={s.id} 
                          className={`hover:bg-blue-50/50 cursor-pointer ${selectedIds.includes(s.id) ? 'bg-blue-100/50' : 'bg-white'}`}
                          onClick={() => toggleSelect(s.id, s)}
                       >
                         <td className="border border-slate-400 p-1.5 border-l-0 text-center">
                            <input 
                              type="checkbox" 
                              checked={selectedIds.includes(s.id)} 
                              readOnly 
                              className="pointer-events-none"
                            />
                         </td>
                         <td className="border border-slate-400 p-1.5 text-slate-600 text-center font-bold">{s.id}</td>
                         <td className="border border-slate-400 p-1.5 pl-2 font-bold text-[#000080]">{s.name}</td>
                         <td className="border border-slate-400 p-1.5 font-bold text-slate-700">{s.title || "-"}</td>
                         <td className="border border-slate-400 p-1.5 font-semibold text-slate-700">{s.area || "-"}</td>
                         <td className="border border-slate-400 p-1.5 font-semibold text-slate-600 border-r-0">{s.allocation || "-"}</td>
                       </tr>
                    ))}
                    {Array.from({length: Math.max(0, 15 - staffList.length)}).map((_, i) => (
                       <tr key={`empty-${i}`} className="h-[28px] bg-white">
                         <td className="border border-slate-400 border-l-0"></td><td className="border border-slate-400"></td><td className="border border-slate-400"></td><td className="border border-slate-400"></td><td className="border border-slate-400"></td><td className="border border-slate-400 border-r-0"></td>
                       </tr>
                    ))}
                  </tbody>
                </table>
             </div>
         </div>

      </div>
    </div>
  )
}
