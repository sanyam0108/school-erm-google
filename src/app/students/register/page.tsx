"use client"

import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

function Field({ label, required, children, className }: { label: string, required?: boolean, children: React.ReactNode, className?: string }) {
  return (
    <div className={`flex flex-col gap-0.5 ${className}`}>
      <label className="text-[11px] font-medium text-slate-700 whitespace-nowrap overflow-hidden text-ellipsis">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  )
}

function DenseInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="h-6 text-[11px] px-1.5 border border-slate-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full" />
}

export default function RegistrationForm() {
  const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto bg-white min-h-screen border-x shadow-sm">
      {/* Top Header / Search */}
      <div className="bg-[#f5f5f5] p-2 border-b flex flex-wrap gap-4 items-end text-[11px]">
        <Field label="Session">
          <select className="h-6 text-[11px] border border-slate-300 rounded w-24 px-1"><option>2026-27</option></select>
        </Field>
        <Field label="Admission Date">
          <DenseInput type="text" defaultValue="28/03/2026" className="w-24" />
        </Field>
        <div className="flex-1" />
        <Field label="Search">
          <div className="flex items-center gap-2">
            <DenseInput type="text" className="w-48" />
            <label className="flex items-center gap-1 text-[10px]"><input type="checkbox" /> Show Discharge Students</label>
          </div>
        </Field>
      </div>

      <div className="p-4">
        {/* Main Grid container */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-3">
            
            {/* Row 1: IDs */}
            <div className="grid grid-cols-4 gap-3 border-b pb-3">
              <Field label="Student ID"><div className="flex"><DenseInput defaultValue="5598" className="bg-slate-100" /><button className="bg-slate-200 border border-slate-300 px-1 text-[10px]">▼</button></div></Field>
              <Field label="SR No"><DenseInput /></Field>
              <Field label="Admission No"><DenseInput /></Field>
              <Field label="Current Class"><DenseInput className="bg-slate-100" readOnly /></Field>
            </div>

            {/* Row 2: Names */}
            <div className="grid grid-cols-[2fr_2fr_2fr_1fr_0.5fr] gap-3">
              <Field label="Students's Name" required><DenseInput /></Field>
              <Field label="Father's Name" required><DenseInput /></Field>
              <Field label="Mother's Name" required><DenseInput /></Field>
              <Field label="DOB (dd/mm/yyyy)"><DenseInput /></Field>
              <Field label="Age"><DenseInput className="bg-slate-100" readOnly /></Field>
            </div>

            {/* Row 3: Admission & Background */}
            <div className="grid grid-cols-[1fr_1fr_2fr_2fr_1.5fr_1.5fr_1.5fr] gap-3">
              <Field label="Admitted in" required><select className="h-6 text-[11px] border border-slate-300 rounded"><option></option></select></Field>
              <Field label="Section"><select className="h-6 text-[11px] border border-slate-300 rounded"><option></option></select></Field>
              <Field label="Father's Profession"><DenseInput /></Field>
              <Field label="Mother's Profession"><DenseInput /></Field>
              <Field label="Father's Contact"><DenseInput /></Field>
              <Field label="Mother's Contact"><DenseInput /></Field>
              <Field label="Information Number" required><DenseInput /></Field>
            </div>

            {/* Row 4: Address & Demographics */}
            <div className="grid grid-cols-[3fr_1fr_1fr_1fr_1fr] gap-3">
              <Field label="Address" required><DenseInput /></Field>
              <Field label="Gender"><select className="h-6 text-[11px] border border-slate-300 rounded"><option></option></select></Field>
              <Field label="Caste"><select className="h-6 text-[11px] border border-slate-300 rounded"><option></option></select></Field>
              <Field label="Blood Grp"><select className="h-6 text-[11px] border border-slate-300 rounded"><option></option></select></Field>
              <Field label="Religion"><select className="h-6 text-[11px] border border-slate-300 rounded"><option></option></select></Field>
            </div>

            {/* Row 5: Guardian */}
            <div className="grid grid-cols-[2fr_3fr_1.5fr_1fr] gap-3">
              <Field label="Guardian's Name"><DenseInput /></Field>
              <Field label="Guardian's Address"><DenseInput /></Field>
              <Field label="Guardian's Prof"><DenseInput /></Field>
              <Field label="DOM (dd/mm/yyyy)"><DenseInput /></Field>
            </div>

            {/* Row 6: Previous Schooling */}
            <div className="grid grid-cols-[3fr_1fr_1.5fr_2fr] gap-3">
              <Field label="Last School Attended"><DenseInput /></Field>
              <Field label="Last Class Studied"><DenseInput /></Field>
              <Field label="Email Address"><select className="h-6 text-[11px] border border-slate-300 rounded"><option></option></select></Field>
              <Field label="Relative Reg No"><DenseInput /></Field>
            </div>

            {/* Row 7: Toggles */}
            <div className="flex items-center gap-4 py-2 border-b">
              <label className="flex items-center gap-1.5 text-[11px]"><input type="checkbox" /> Concession</label>
              <label className="flex items-center gap-1.5 text-[11px] text-slate-500">Concession Remark <DenseInput className="w-48 bg-slate-100" readOnly /></label>
              <div className="flex-1" />
              <label className="flex items-center gap-1.5 text-[11px]"><input type="checkbox" /> RTE</label>
              <label className="flex items-center gap-1.5 text-[11px]"><input type="checkbox" /> Transport</label>
              <label className="flex items-center gap-1.5 text-[11px] text-slate-400"><input type="checkbox" disabled /> TC Issued</label>
            </div>

            {/* Documents Section */}
            <div className="py-2">
              <p className="text-[11px] font-semibold text-orange-700 mb-2">Documents Section <span className="text-red-600 font-bold ml-2">Tick mark the document not received</span></p>
              <div className="flex items-center gap-4 text-[11px]">
                <label className="flex items-center gap-1.5"><input type="checkbox" /> Photo</label>
                <label className="flex items-center gap-1.5"><input type="checkbox" /> DOB Certificate</label>
                <label className="flex items-center gap-1.5"><input type="checkbox" /> TC</label>
                <label className="flex items-center gap-1.5"><input type="checkbox" /> Mark Sheet</label>
                <label className="flex items-center gap-1.5"><input type="checkbox" /> Aadhar Card</label>
                <label className="flex items-center gap-1.5 ml-4">Aadhar Card No <DenseInput className="w-32" /></label>
              </div>
            </div>

          </div>

          {/* Right Side: Photos */}
          <div className="w-48 flex flex-col gap-2 shrink-0">
            <div className="h-28 border-2 border-slate-300 bg-slate-50 relative flex items-center justify-center">
              <span className="absolute bottom-0 w-full bg-black text-white text-center text-[10px] py-0.5">Student</span>
            </div>
            <div className="h-28 border-2 border-slate-300 bg-slate-50 relative flex items-center justify-center">
              <span className="absolute bottom-0 w-full bg-black text-white text-center text-[10px] py-0.5">Father</span>
            </div>
            <div className="h-28 border-2 border-slate-300 bg-slate-50 relative flex items-center justify-center">
              <span className="absolute bottom-0 w-full bg-black text-white text-center text-[10px] py-0.5">Mother</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="border-t p-3 flex gap-2">
         <button onClick={() => router.push('/fees/configure')} className="bg-black text-white text-[11px] font-bold px-4 py-1.5 hover:bg-slate-800 transition-colors shadow">SAVE</button>
         <button className="bg-black text-white text-[11px] font-bold px-4 py-1.5 hover:bg-slate-800 transition-colors shadow">RESET</button>
         <button className="bg-black text-white text-[11px] font-bold px-4 py-1.5 hover:bg-slate-800 transition-colors shadow">EXIT</button>
      </div>

    </div>
  )
}
