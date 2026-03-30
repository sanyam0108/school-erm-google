"use client"

import { useState } from "react"
import * as xlsx from "xlsx"
import { supabase } from "@/lib/supabase"

export default function DataUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [parsedData, setParsedData] = useState<any[]>([])
  const [status, setStatus] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)

  // Expected array mapping to the 26 legacy Excel Headers
  const expectedHeaders = [
    "SN", "SR", "Name", "Fname", "Mname", "Fcontact", "Mcontact", "Phone Info", 
    "AdmitteClass", "Gender", "Caste", "Address", "Reg Date", "DOB", "Blood Group", 
    "FProf", "MProf", "Email Address", "Last School", "Last Class", "Religion", 
    "DOM", "Guardian", "Current Class", "Transport", "TC"
  ]

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return
    setFile(selectedFile)
    setStatus("File selected. Parsing data...")

    const reader = new FileReader()
    reader.onload = (evt) => {
      const bstr = evt.target?.result
      const wb = xlsx.read(bstr, { type: "binary" })
      const wsname = wb.SheetNames[0]
      const ws = wb.Sheets[wsname]
      const rawData = xlsx.utils.sheet_to_json(ws)
      // Hard sanitize all headers because Excel often has hidden trailing spaces, like "Name " instead of "Name"
      const sanitizedData = rawData.map((row: any) => {
         const cleanRow: any = {}
         Object.keys(row).forEach(k => {
            cleanRow[k.trim()] = typeof row[k] === 'string' ? row[k].trim() : row[k]
         })
         return cleanRow
      })
      setParsedData(sanitizedData)
      setStatus(`Successfully parsed ${sanitizedData.length} student records! Ready for database insertion.`)
    }
    reader.readAsBinaryString(selectedFile)
  }

  const handleDatabaseInsert = async () => {
    if (parsedData.length === 0) return
    setIsUploading(true)
    setStatus("Uploading to Supabase Production Database...")
    
    try {
      const payload = parsedData.map(row => ({
        sn: row["SN"] || null,
        sr: String(row["SR"] || ""),
        name: row["Name"] || "Unknown Student",
        fname: row["Fname"] || null,
        mname: row["Mname"] || null,
        fcontact: String(row["Fcontact"] || ""),
        mcontact: String(row["Mcontact"] || ""),
        phone_info: String(row["Phone Info"] || ""),
        admit_class: String(row["AdmitteClass"] || ""),
        gender: row["Gender"] || null,
        caste: row["Caste"] || null,
        address: row["Address"] || null,
        reg_date: String(row["Reg Date"] || ""),
        dob: String(row["DOB"] || ""),
        blood_group: row["Blood Group"] || null,
        fprof: String(row["FProf"] || ""),
        mprof: String(row["MProf"] || ""),
        email_address: row["Email Address"] || null,
        last_school: row["Last School"] || null,
        last_class: String(row["Last Class"] || ""),
        religion: row["Religion"] || null,
        dom: String(row["DOM"] || ""),
        guardian: row["Guardian"] || null,
        current_class: String(row["Current Class"] || ""),
        transport: row["Transport"] || null,
        tc: String(row["TC"] || "")
      }))

      // Batch insert 500 rows at a time just to be safe
      const chunkSize = 500
      for (let i = 0; i < payload.length; i += chunkSize) {
         const chunk = payload.slice(i, i + chunkSize)
         const { error } = await supabase.from('students').insert(chunk)
         if (error) {
            console.error("SUPABASE ERROR:", error)
            throw new Error(`Database Error: ${error.message} (Hint: Did you run the schema.sql in Supabase?)`)
         }
      }
      
      setStatus(`✅ Mass Upload Complete! Successfully committed ${payload.length} rows to database!`)
    } catch (error: any) {
      setStatus(`❌ Upload Failed: ${error.message}`)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="bg-slate-200 min-h-[600px] flex flex-col p-8 items-center font-sans">
       
       <div className="w-full max-w-4xl bg-white shadow-xl border border-slate-300 flex flex-col p-6 relative">
          
          <h1 className="text-2xl font-bold text-[#000080] mb-2 border-b-2 border-slate-300 pb-2">Student Data Upload Pipeline</h1>
          <p className="text-sm text-slate-600 mb-6 font-semibold">Upload your legacy Excel sheet (.xlsx, .csv). The system parses the exact 26 column map structure before writing to PostgreSQL.</p>

          {/* Upload Dropzone */}
          <div className="border-2 border-dashed border-slate-400 bg-slate-50 p-12 text-center rounded-sm mb-6 flex flex-col items-center">
             <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} className="hidden" id="excel-upload" />
             <label htmlFor="excel-upload" className="cursor-pointer bg-[#000080] text-white px-8 py-2 font-bold shadow hover:bg-blue-800 transition-colors">
                Select Excel File
             </label>
             <span className="text-sm mt-3 text-slate-500 font-semibold">{file ? file.name : "No file selected"}</span>
          </div>

          <div className="w-full bg-[#fdfdfd] border p-4 shadow-inner mb-6 text-center text-sm font-bold text-teal-700 min-h-[40px]">
             {status}
          </div>

          {/* Data Preview Array Grid (Only showing mapping status) */}
          {parsedData.length > 0 && (
            <div className="w-full h-48 overflow-auto border border-slate-300 bg-slate-100 mb-6 shadow-inner p-2">
                 <table className="w-full text-left text-[11px] whitespace-nowrap bg-white border">
                    <thead className="bg-[#a5d8dd]">
                       <tr>
                          {expectedHeaders.map(header => (
                             <th key={header} className="p-1 border text-black">{header}</th>
                          ))}
                       </tr>
                    </thead>
                    <tbody>
                       {parsedData.slice(0, 10).map((row: any, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                             {expectedHeaders.map(header => (
                                <td key={`${idx}-${header}`} className="p-1 border border-slate-300">{row[header] || ""}</td>
                             ))}
                          </tr>
                       ))}
                       {parsedData.length > 10 && (
                          <tr><td colSpan={26} className="text-center p-2 text-slate-500 font-bold border">... {parsedData.length - 10} more rows pending</td></tr>
                       )}
                    </tbody>
                 </table>
            </div>
          )}

          <div className="flex justify-between items-center mt-auto border-t border-slate-300 pt-4">
             <button className="bg-slate-200 text-slate-700 px-6 py-1.5 font-bold shadow-sm border border-slate-400 hover:bg-slate-300">
                Cancel
             </button>
             <button onClick={handleDatabaseInsert} disabled={parsedData.length === 0 || isUploading} className="bg-red-600 text-white px-8 py-1.5 font-bold shadow-md hover:bg-red-700 disabled:opacity-50 transition-colors border-2 border-red-800">
                {isUploading ? "INJECTING..." : "COMMIT TO DATABASE"}
             </button>
          </div>

       </div>
    </div>
  )
}
