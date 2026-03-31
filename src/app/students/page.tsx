"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export default function StudentDirectory() {
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStudents() {
      const { data, error } = await supabase.from('students').select('*').order('created_at', { ascending: false })
      if (!error && data) {
         const formatted = data.map(s => ({
            id: s.id,
            srNo: s.sr || String(s.id).substring(0,4),
            name: s.name || 'Unknown',
            class: s.current_class || s.admit_class || '-',
            section: "-",
            status: "Current Student"
         }))
         setStudents(formatted)
      }
      setLoading(false)
    }
    fetchStudents()
  }, [])

  const [filter, setFilter] = useState("All")
  const [search, setSearch] = useState("")

  const filteredStudents = students.filter(student => {
    const matchesFilter = filter === "All" || student.status === filter;
    const matchesSearch = student.name.toLowerCase().includes(search.toLowerCase()) || 
                          student.srNo.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto bg-white min-h-[600px] border shadow-sm mt-4 text-[13px] flex flex-col">
      {/* Header Panel */}
      <div className="bg-[#f5f5f5] p-3 border-b border-b-2 flex flex-col gap-3 shrink-0">
        <div className="flex justify-between items-center">
           <h2 className="font-bold text-[#000080] text-lg">Student Directory Dashboard</h2>
           <Link href="/students/register">
              <button className="bg-green-600 text-white font-bold px-4 py-1.5 shadow-sm hover:bg-green-700">
                + NEW REGISTRATION
              </button>
           </Link>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Filter Status:</span>
            <select 
              value={filter} 
              onChange={e => setFilter(e.target.value)}
              className="h-7 border border-slate-300 rounded px-2 w-48 font-medium bg-white"
            >
              <option value="All">All Categories</option>
              <option value="Current Student">Current Student</option>
              <option value="New Student">New Student</option>
              <option value="Ex Student / Alumni">Ex Student / Alumni</option>
            </select>
          </div>

          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <span className="font-semibold text-slate-700">Search:</span>
            <input 
              type="text" 
              placeholder="Name or SR No..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="h-7 border border-slate-300 rounded px-2 w-full"
            />
          </div>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="flex-1 overflow-auto bg-white">
        <table className="w-full text-left border-collapse border-slate-200">
          <thead className="bg-[#e8f0fe] sticky top-0 shadow-sm border-b-2 border-[#000080]">
            <tr>
              <th className="font-semibold p-2 w-16 text-center border-r border-slate-300">SR No</th>
              <th className="font-semibold p-2 border-r border-slate-300">Student Name</th>
              <th className="font-semibold p-2 w-24 border-r border-slate-300">Class</th>
              <th className="font-semibold p-2 w-24 border-r border-slate-300">Section</th>
              <th className="font-semibold p-2 w-48 border-r border-slate-300">Category Tag</th>
              <th className="font-semibold p-2 w-24 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center p-8 text-slate-500 font-bold">Loading Database...</td>
              </tr>
            ) : filteredStudents.length > 0 ? filteredStudents.map((s, i) => (
              <tr key={s.id} className={`border-b border-slate-200 hover:bg-yellow-50 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                <td className="p-2 text-center border-r font-medium border-slate-200">{s.srNo}</td>
                <td className="p-2 font-bold text-[#000080] border-r border-slate-200">{s.name}</td>
                <td className="p-2 border-r border-slate-200">{s.class}</td>
                <td className="p-2 border-r border-slate-200">{s.section}</td>
                <td className="p-2 border-r border-slate-200">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    s.status === 'Current Student' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                    s.status === 'New Student' ? 'bg-green-100 text-green-800 border border-green-200' :
                    'bg-slate-200 text-slate-700 border border-slate-300'
                  }`}>
                    {s.status}
                  </span>
                </td>
                <td className="p-2 text-center">
                  <Link href="/students/ledger" className="text-blue-600 hover:underline font-bold text-xs pr-2">Ledger</Link>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6} className="text-center p-8 text-red-500 font-bold bg-red-50">
                  No students found matching filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Footer Meta */}
      <div className="bg-[#f5f5f5] p-2 border-t text-[11px] text-slate-500 font-medium flex justify-between">
        <span>Showing {filteredStudents.length} of {students.length} entries.</span>
      </div>
    </div>
  )
}
