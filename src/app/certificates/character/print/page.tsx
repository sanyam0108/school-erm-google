"use client"

import { useSearchParams } from 'next/navigation'
import Image from 'next/image'

export default function CharacterCertificatePrint() {
  return (
    <div className="w-full bg-slate-200 min-h-screen py-8 flex justify-center print:bg-white print:py-0">
      
      {/* Action Menu Header */}
      <div className="fixed top-4 right-4 bg-white p-3 rounded shadow-md border flex gap-3 print:hidden z-50">
        <button onClick={() => window.print()} className="bg-blue-600 text-white font-bold px-4 py-2 rounded text-sm hover:bg-blue-700 shadow flex items-center gap-2">
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
           Print / Save PDF
        </button>
        <button onClick={() => window.close()} className="bg-slate-200 text-slate-800 font-bold px-4 py-2 rounded text-sm hover:bg-slate-300 shadow">
           Close
        </button>
      </div>

      {/* Certificate A4 Canvas */}
      <div className="w-[210mm] h-[297mm] bg-white border border-slate-300 shadow-xl overflow-hidden relative flex flex-col p-8 print:shadow-none print:border-none">
          
          {/* Header */}
          <div className="text-center mt-8">
             <h1 className="text-4xl font-serif font-bold text-red-600 tracking-wider">CHILDREN'S ACADEMY</h1>
             <p className="text-sm font-semibold mt-1 uppercase text-[#000080]">Delhi Road, Diwakri, Alwar-301001 (Raj.)</p>
             <div className="w-full flex justify-between px-12 mt-6">
                <span className="font-bold text-sm">Ref. No : CACS/2026/189</span>
                <span className="font-bold text-sm">Date : 28/03/2026</span>
             </div>
             
             <div className="w-full flex justify-center mt-10">
                <h2 className="text-2xl font-bold border-b-2 border-black pb-1 uppercase tracking-widest text-[#000080]">Character Certificate</h2>
             </div>
          </div>

          {/* Body */}
          <div className="mt-16 px-12 text-justify leading-10 text-lg font-serif">
             <p className="indent-12">
               This is to certify that <span className="font-bold border-b border-black px-4">DEVISH KUMAR</span>, 
               son/daughter of Shri <span className="font-bold border-b border-black px-4">MAHESH CHAND</span>, 
               has been a bonafide student of this institution in Class <span className="font-bold border-b border-black px-4">VIII 'A'</span> 
               during the academic session <span className="font-bold border-b border-black px-4">2025-26</span>.
             </p>
             <p className="mt-6 indent-12">
               To the best of my knowledge and belief, they bear a good moral character and have not taken part in any activity subversive of the rules and regulations of the institution. We wish them success in all their future endeavors.
             </p>
          </div>

          {/* Footer Signatures */}
          <div className="mt-auto mb-16 px-12 flex justify-between items-end">
             <div className="flex flex-col items-center">
                 <div className="w-48 border-b-2 border-black mb-2"></div>
                 <span className="font-bold">Prepared By</span>
             </div>
             <div className="flex flex-col items-center">
                 <div className="w-48 border-b-2 border-black mb-2"></div>
                 <span className="font-bold">Principal Signature</span>
             </div>
          </div>

      </div>

    </div>
  )
}
