"use client"

export default function InitializeDocumentSerial() {
  return (
    <div className="max-w-3xl bg-white min-h-[500px] border shadow-sm mx-auto mt-4 text-[13px]">
      
      <div className="p-6">
        <div className="flex flex-col gap-4">
          
          <div className="grid grid-cols-[200px_1fr] items-center gap-4">
            <label className="text-right font-medium text-slate-700">SR Number Start From</label>
            <input type="text" defaultValue="1" className="h-7 border border-slate-300 px-2 w-64" />
          </div>

          <div className="grid grid-cols-[200px_1fr] items-center gap-4">
            <label className="text-right font-medium text-slate-700">Fee Receipt Number Initial</label>
            <input type="text" defaultValue="1" className="h-7 border border-slate-300 px-2 w-64" />
          </div>

          <div className="grid grid-cols-[200px_1fr] items-center gap-4">
            <label className="text-right font-medium text-slate-700">Fee Receipt Pattern</label>
            <div className="flex items-center gap-4 font-bold text-slate-700">
               <label className="flex items-center gap-1.5"><input type="radio" name="pattern" /> Continue</label>
               <label className="flex items-center gap-1.5"><input type="radio" name="pattern" defaultChecked /> Restart from 1 for new FY</label>
            </div>
          </div>

          <div className="grid grid-cols-[200px_1fr] items-center gap-4">
            <label className="text-right font-medium text-slate-700">Bonafide Certificate Initial</label>
            <input type="text" defaultValue="CACS/2026/" className="h-7 border border-slate-300 px-2 w-64" />
          </div>

          <div className="grid grid-cols-[200px_1fr] items-center gap-4">
            <label className="text-right font-medium text-slate-700">Study Certificate Initial</label>
            <input type="text" defaultValue="CACS/2026/" className="h-7 border border-slate-300 px-2 w-64" />
          </div>

          <div className="grid grid-cols-[200px_1fr] items-center gap-4">
            <label className="text-right font-medium text-slate-700">Character Certificate Initial</label>
            <input type="text" defaultValue="CACS/2026/" className="h-7 border border-slate-300 px-2 w-64" />
          </div>

          <div className="grid grid-cols-[200px_1fr] items-center gap-4">
            <label className="text-right font-medium text-slate-700">Fee Certificate Initial</label>
            <input type="text" defaultValue="CACS/2025/" className="h-7 border border-slate-300 px-2 w-64" />
          </div>

          <div className="grid grid-cols-[200px_1fr] items-center gap-4">
            <label className="text-right font-medium text-slate-700">Transfer Certificate Initial</label>
            <input type="text" defaultValue="CACS/2025/" className="h-7 border border-slate-300 px-2 w-64" />
          </div>

          <div className="grid grid-cols-[200px_1fr] items-center gap-4 pt-4">
             <div />
             <div className="flex gap-2">
                <button className="bg-slate-100 border shadow-sm border-slate-300 text-slate-800 font-medium px-6 py-1 hover:bg-slate-200">Update</button>
                <button className="bg-slate-100 border shadow-sm border-slate-300 text-slate-800 font-medium px-6 py-1 hover:bg-slate-200">Exit</button>
             </div>
          </div>

        </div>
      </div>
    </div>
  )
}
