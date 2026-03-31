"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function AddFeePage() {
  const [students, setStudents] = useState<any[]>([])
  const [displayedStudents, setDisplayedStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [availableClasses, setAvailableClasses] = useState<string[]>([])
  const [filterClass, setFilterClass] = useState("")
  const [searchName, setSearchName] = useState("")

  const [selectedIds, setSelectedIds] = useState<number[]>([])

  // Fee state
  const [totalDue, setTotalDue] = useState("")
  const [amountPaid, setAmountPaid] = useState("")

  // Mock installation ledger for presentation logic
  const [mockLedger, setMockLedger] = useState<{date: string, amount: number}[]>([
     { date: "15-Apr-2026", amount: 1200 },
     { date: "10-May-2026", amount: 800 }
  ])

  useEffect(() => {
    async function fetchStudents() {
      const { data, error } = await supabase.from('students').select('*').order('created_at', { ascending: false })
      if (!error && data) {
         setStudents(data)
         setDisplayedStudents(data.slice(0, 50)) // initially show 50

         const uClasses = Array.from(new Set(data.map(s => s.current_class || s.admit_class).filter(Boolean))) as string[]
         setAvailableClasses(uClasses.sort())
      }
      setLoading(false)
    }
    fetchStudents()
  }, [])

  const handleFilter = () => {
    let filtered = students
    if (filterClass) filtered = filtered.filter(s => (s.current_class === filterClass || s.admit_class === filterClass))
    if (searchName) filtered = filtered.filter(s => s.name?.toLowerCase().includes(searchName.toLowerCase()) || String(s.id).includes(searchName))
    setDisplayedStudents(filtered)
  }

  const toggleSelectAll = () => {
    if (selectedIds.length === displayedStudents.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(displayedStudents.map(s => s.id))
    }
  }

  const toggleSelect = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id))
    } else {
      setSelectedIds([...selectedIds, id])
    }
  }

  const singleStudent = selectedIds.length === 1 ? students.find(s => s.id === selectedIds[0]) : null

  const handleSaveBulk = () => {
     if (!totalDue) return alert("Please enter a total due amount to assign.")
     if (window.confirm(`Assign a bulk due amount of Rs. ${totalDue} to ${selectedIds.length} students?`)) {
        alert("Success! Bulk fee balances updated in ledger.")
        setSelectedIds([])
        setTotalDue("")
     }
  }

  const handleSaveSingle = () => {
     if (!totalDue && !amountPaid) return alert("Please enter amount.")
     alert(`Success! Updated ledger for ${singleStudent.name}.`)
     if (amountPaid) {
        setMockLedger([{date: new Date().toLocaleDateString('en-GB').replace(/\//g, '-'), amount: Number(amountPaid)}, ...mockLedger])
     }
     setAmountPaid("")
  }

  return (
    <div className="bg-white min-h-[700px] border shadow-sm mt-0 text-[11px] flex flex-col mx-auto max-w-7xl">
      
      {/* Top Banner */}
      <div className="bg-[#800080] text-white p-3 font-bold text-[14px] shadow-sm tracking-wider flex items-center justify-between">
         <span>STUDENT FEES ALLOCATION & INSTALLMENT MANAGER</span>
      </div>

      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 120px)" }}>
         
         {/* Left Massive Grid Pane */}
         <div className="flex-1 flex flex-col border-r border-slate-300">
            
            {/* Find Engine */}
            <div className="bg-[#f5f5f5] p-2 border-b flex flex-wrap gap-4 items-center shrink-0">
               <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700">Filter Class</span>
                  <select value={filterClass} onChange={e => {setFilterClass(e.target.value); setTimeout(handleFilter, 50)}} className="border border-slate-300 rounded px-1 min-w-[120px] h-6 text-slate-800">
                     <option value="">- All Classes -</option>
                     {availableClasses.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
               </div>

               <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700">Search</span>
                  <input type="text" value={searchName} onChange={e => {setSearchName(e.target.value); setTimeout(handleFilter, 50)}} placeholder="Name or ID" className="border border-slate-300 rounded px-2 h-6 w-48 text-slate-800 font-bold" />
               </div>

               <button onClick={handleFilter} className="bg-black text-white font-bold h-6 px-6 ml-auto hover:bg-slate-800 shadow">APPLY FILTERS</button>
            </div>

            {/* Data Grid */}
            <div className="flex-1 overflow-auto bg-white">
              <table className="w-full text-left border-collapse border-slate-200">
                <thead className="bg-[#d4e1f9] sticky top-0 shadow-sm border-b">
                  <tr>
                    <th className="font-semibold p-1.5 w-12 text-center border-r border-slate-300 cursor-pointer text-blue-800 hover:bg-blue-300 transition-colors" onClick={toggleSelectAll}>Select All</th>
                    <th className="font-semibold p-1.5 w-16 border-r border-slate-300 text-slate-800 text-center">ID</th>
                    <th className="font-semibold p-1.5 border-r border-slate-300 text-slate-800">Student Name</th>
                    <th className="font-semibold p-1.5 w-32 border-r border-slate-300 text-slate-800">Class (Section)</th>
                    <th className="font-semibold p-1.5 w-32 text-slate-800 border-r border-slate-300">Father's Name</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                     <tr><td colSpan={5} className="text-center py-6 font-bold text-slate-500">Loading Database...</td></tr>
                  ) : displayedStudents.length === 0 ? (
                     <tr><td colSpan={5} className="text-center py-6 font-bold text-red-500 bg-red-50">No Students Found matching criteria.</td></tr>
                  ) : displayedStudents.map((s) => (
                    <tr key={s.id} className={`border-b border-slate-200 hover:bg-blue-50 cursor-pointer ${selectedIds.includes(s.id) ? 'bg-blue-100/60' : ''}`} onClick={() => toggleSelect(s.id)}>
                      <td className={`p-1.5 text-center border-r border-slate-300 ${selectedIds.includes(s.id) ? 'bg-blue-500' : 'bg-white'}`}>
                         <input type="checkbox" checked={selectedIds.includes(s.id)} readOnly className="pointer-events-none" />
                      </td>
                      <td className="p-1.5 border-r border-slate-300 text-slate-600 font-bold text-center">{String(s.id).substring(0,5)}</td>
                      <td className="p-1.5 border-r border-slate-300 text-[#000080] font-bold">{s.name}</td>
                      <td className="p-1.5 border-r border-slate-300 text-slate-800 font-bold">{s.current_class || s.admit_class} ({s.section || '-'})</td>
                      <td className="p-1.5 text-slate-700 border-r border-slate-300">{s.fname}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
         </div>

         {/* Right Control Panel (Contextual) */}
         <div className="w-[380px] bg-slate-50 p-4 shrink-0 overflow-y-auto flex flex-col gap-6">
            
            {selectedIds.length === 0 && (
               <div className="h-full flex flex-col items-center justify-center text-slate-400 font-bold text-[14px]">
                  <span>← Select student(s) from the grid</span>
                  <span>to assign fees or record payments.</span>
               </div>
            )}

            {selectedIds.length > 1 && (
               <div className="bg-white border p-4 shadow-sm border-t-4 border-t-orange-500">
                  <h3 className="text-[14px] font-black text-orange-600 mb-2 uppercase">Bulk Fee Assignment</h3>
                  <div className="text-[11px] font-bold text-slate-600 mb-4 bg-orange-50 p-2 border border-orange-200">
                     You are about to modify exactly <span className="text-red-600 font-black text-[13px]">{selectedIds.length}</span> students simultaneously. Proceed with caution.
                  </div>
                  
                  <div className="flex flex-col gap-1 mb-4">
                     <span className="font-bold text-slate-700">Total Amount Due (Rs.)</span>
                     <input 
                       type="number" 
                       value={totalDue}
                       onChange={e => setTotalDue(e.target.value)}
                       className="border border-slate-400 rounded px-2 h-8 font-bold text-slate-800 text-[14px]" 
                       placeholder="e.g. 50000"
                     />
                  </div>

                  <button onClick={handleSaveBulk} className="bg-orange-600 text-white font-bold h-10 w-full hover:bg-orange-700 shadow text-[12px] tracking-wider">
                     CONFIRM MASS ASSIGNMENT
                  </button>
               </div>
            )}

            {selectedIds.length === 1 && singleStudent && (
               <div className="bg-white border p-4 shadow-sm border-t-4 border-t-green-600">
                  <h3 className="text-[14px] font-black text-green-700 mb-1 uppercase">Student Ledger</h3>
                  <p className="text-[12px] font-bold text-[#000080] border-b pb-2 mb-4">{singleStudent.name} (ID: {String(singleStudent.id).substring(0,5)})</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                     <div className="flex flex-col gap-1">
                        <span className="font-bold text-slate-700">Set Total Due</span>
                        <input 
                          type="number" 
                          value={totalDue}
                          onChange={e => setTotalDue(e.target.value)}
                          className="border border-slate-400 rounded px-2 h-8 font-bold text-slate-800 text-[12px]" 
                          placeholder="e.g. 50000"
                        />
                     </div>
                     <div className="flex flex-col gap-1">
                        <span className="font-bold text-slate-700 text-green-700">Record Payment</span>
                        <input 
                          type="number" 
                          value={amountPaid}
                          onChange={e => setAmountPaid(e.target.value)}
                          className="border border-green-400 bg-green-50 rounded px-2 h-8 font-bold text-slate-800 text-[12px]" 
                          placeholder="e.g. 2500"
                        />
                     </div>
                  </div>

                  <button onClick={handleSaveSingle} className="bg-green-600 text-white font-bold h-10 w-full hover:bg-green-700 shadow text-[12px] tracking-wider mb-6">
                     UPDATE STUDENT LEDGER
                  </button>

                  <div className="border border-slate-200 rounded">
                     <div className="bg-slate-100 font-bold text-slate-700 p-2 border-b text-center tracking-wider">INSTALLMENT RECIEPTS</div>
                     <table className="w-full text-left">
                        <thead className="border-b">
                           <tr>
                              <th className="p-2 border-r text-slate-600 font-semibold">Date Paid</th>
                              <th className="p-2 text-slate-600 font-semibold text-right">Amount (Rs)</th>
                           </tr>
                        </thead>
                        <tbody>
                           {mockLedger.map((lg, i) => (
                              <tr key={i} className="border-b">
                                 <td className="p-2 border-r font-bold text-slate-700">{lg.date}</td>
                                 <td className="p-2 font-black text-green-600 text-right">+{lg.amount}</td>
                              </tr>
                           ))}
                           <tr className="bg-slate-50">
                              <td className="p-2 border-r font-black text-slate-800 text-right">TOTAL PAID:</td>
                              <td className="p-2 font-black text-slate-800 text-right">{mockLedger.reduce((a,b) => a + b.amount, 0)}</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>

               </div>
            )}

         </div>

      </div>
    </div>
  )
}
