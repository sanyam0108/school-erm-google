"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export default function BonafideCertificateGenerator() {
  const [students, setStudents] = useState<any[]>([])
  const [displayedStudents, setDisplayedStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [availableClasses, setAvailableClasses] = useState<string[]>([])
  const [availableSections, setAvailableSections] = useState<string[]>([])


  useEffect(() => {
    async function fetchStudents() {
      const { data, error } = await supabase.from('students').select('*').order('created_at', { ascending: false })
      if (!error && data) {
         const formatted = data.map(s => ({
            regNo: s.sr || String(s.id).substring(0,4),
            name: s.name || 'Unknown',
            fName: s.fname || '-',
            phone: s.phone_info || s.fcontact || '-',
            class: s.current_class || s.admit_class,
            section: s.section || 'A'
         }))
         setStudents(formatted)

         // Extract unique classes dynamically
         const uClasses = Array.from(new Set(formatted.map(s => s.class).filter(Boolean))) as string[]
         setAvailableClasses(uClasses.sort())
         const uSections = Array.from(new Set(formatted.map(s => s.section).filter(Boolean))) as string[]
         setAvailableSections(uSections.sort())

         setDisplayedStudents([]) // Require SHOW to populate
      }
      setLoading(false)
    }
    fetchStudents()

    const s = localStorage.getItem("globalSession")
    if (s) setSession(s)
    if (!localStorage.getItem("bonafide_serial")) {
       localStorage.setItem("bonafide_serial", "188")
    }
  }, [])

  const [selectedReg, setSelectedReg] = useState<string>("")
  const [purpose, setPurpose] = useState("SELF")
  const [session, setSession] = useState("2026-27")

  // Filter States
  const [filterClass, setFilterClass] = useState("")
  const [filterSection, setFilterSection] = useState("")
  const [searchName, setSearchName] = useState("")

  const handleShow = () => {
     let filtered = students;
     if (filterClass) filtered = filtered.filter(s => s.class === filterClass)
     if (filterSection) filtered = filtered.filter(s => s.section === filterSection)
     setDisplayedStudents(filtered)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
     const term = e.target.value.toLowerCase()
     setSearchName(term)
     if (!term) { setDisplayedStudents([]); return }
     setDisplayedStudents(students.filter(s => s.name.toLowerCase().includes(term) || s.regNo.toLowerCase().includes(term)))
  }

  return (
    <div className="mx-auto bg-white min-h-[600px] border shadow-sm mt-0 text-[11px] flex flex-col">
      
      {/* Top Filter Bar */}
      <div className="bg-white p-2 border-b flex flex-wrap gap-4 items-center shrink-0">
         <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Session</span>
            <select value={session} onChange={e => {
                setSession(e.target.value)
                localStorage.setItem("globalSession", e.target.value)
            }} className="border border-slate-300 rounded px-1 min-w-[100px] h-6">
               <option value="2024-25">2024-25</option>
               <option value="2025-26">2025-26</option>
               <option value="2026-27">2026-27</option>
               <option value="2027-28">2027-28</option>
               <option value="2028-29">2028-29</option>
            </select>
         </div>

         <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Issue Date</span>
            <input type="text" defaultValue="28/03/2026" className="border border-slate-300 rounded px-1 h-6 w-24" />
         </div>

         <label className="flex items-center gap-1 text-slate-700">
           <input type="checkbox" defaultChecked />
           Report Header
         </label>
      </div>

      {/* Second Filter Bar */}
      <div className="bg-white p-2 border-b flex flex-wrap gap-4 items-center shrink-0">
         <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Class</span>
            <select value={filterClass} onChange={e => setFilterClass(e.target.value)} className="border border-slate-300 rounded px-1 min-w-[120px] h-6 text-slate-800">
               <option value="">- All -</option>
               {availableClasses.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
         </div>

         <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Section</span>
            <select value={filterSection} onChange={e => setFilterSection(e.target.value)} className="border border-slate-300 rounded px-1 min-w-[80px] h-6 text-slate-800">
               <option value="">- All -</option>
               {availableSections.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
         </div>

         <button onClick={handleShow} className="border border-green-600 text-green-700 font-bold px-4 h-6 hover:bg-green-50">Show</button>

         <span className="text-red-500 font-bold ml-2">OR</span>

         <div className="flex items-center gap-2 ml-2">
            <span className="font-semibold text-slate-700">Search By Name / SR</span>
            <input type="text" value={searchName} onChange={handleSearch} className="border border-slate-300 rounded px-1 h-6 w-48 text-slate-800 font-bold" />
         </div>
      </div>

      {/* Data Grid */}
      <div className="flex-1 overflow-auto bg-white border-b">
        <table className="w-full text-left border-collapse border-slate-200">
          <thead className="bg-[#f5f5f5] sticky top-0 shadow-sm border-b">
            <tr>
              <th className="font-semibold p-1.5 w-8 text-center border-r"></th>
              <th className="font-semibold p-1.5 w-32 border-r text-slate-700">RegNumber</th>
              <th className="font-semibold p-1.5 border-r text-slate-700">Name</th>
              <th className="font-semibold p-1.5 border-r text-slate-700">Fname</th>
              <th className="font-semibold p-1.5 w-48 text-slate-700">PhoneInfo</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
               <tr><td colSpan={5} className="text-center py-4 font-bold text-slate-500">Loading Database...</td></tr>
            ) : displayedStudents.length === 0 ? (
               <tr><td colSpan={5} className="text-center py-4 font-bold text-blue-700 bg-blue-50">Please use filters or search to display students.</td></tr>
            ) : displayedStudents.map((s, i) => (
              <tr key={s.regNo} className={`border-b border-slate-200 hover:bg-blue-50 cursor-pointer ${selectedReg === s.regNo ? 'bg-blue-50' : ''}`} onClick={() => setSelectedReg(s.regNo)}>
                <td className="p-1.5 text-center border-r">
                   <input type="checkbox" checked={selectedReg === s.regNo} readOnly className="cursor-pointer" />
                </td>
                <td className="p-1.5 border-r text-slate-800 font-bold">{s.regNo}</td>
                <td className="p-1.5 border-r text-slate-800 font-bold">{s.name}</td>
                <td className="p-1.5 border-r text-slate-800">{s.fName}</td>
                <td className="p-1.5 text-slate-800">{s.phone}</td>
              </tr>
            ))}
            {/* Fill remaining space to match screenshot look */}
            {Array.from({length: 15}).map((_, i) => (
               <tr key={`empty-${i}`} className="border-b h-[27px]">
                  <td className="border-r"></td><td className="border-r"></td><td className="border-r"></td><td className="border-r"></td><td></td>
               </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Action Bar */}
      <div className="bg-[#ff8c8c] p-2 flex items-center gap-4 shrink-0">
         <div className="flex items-center bg-white border border-slate-400">
            <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-1 border-r border-slate-400">Purpose</span>
            <input type="text" value={purpose} onChange={e => setPurpose(e.target.value)} className="h-6 w-64 px-2 outline-none uppercase font-semibold text-blue-900" />
         </div>

         <Link href={`/certificates/bonafide/print?reg=${selectedReg}&session=${session}&purpose=${purpose}`} target="_blank">
           <button 
             onClick={() => {
                if (window.confirm("Do you want to finalise this serial number?\n\nThis will permanently lock CACS/2026/XXX and increment it for the next certificate generated.")) {
                    const currentSerial = Number(localStorage.getItem("bonafide_serial") || 188)
                    localStorage.setItem("bonafide_serial", String(currentSerial + 1))
                }
             }}
             className="bg-slate-50 border border-slate-400 text-slate-800 font-bold px-6 py-1 hover:bg-white shadow-[inset_0px_1px_0px_0px_white]">
              Generate BonaFide Certificate
           </button>
         </Link>

         <button className="bg-slate-50 border border-slate-400 text-slate-800 font-bold px-6 py-1 hover:bg-white shadow-[inset_0px_1px_0px_0px_white]">
            Exit
         </button>
      </div>

    </div>
  )
}
