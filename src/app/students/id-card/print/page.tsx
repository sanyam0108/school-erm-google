"use client"

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function IDCardPrintView() {
  // Example of using URL search param to pull dynamic ID in a real app
  // const searchParams = useSearchParams()
  // const regNo = searchParams.get('reg')
  
  return (
    <div className="w-full bg-slate-200 min-h-screen py-8 flex justify-center print:bg-white print:py-0">
      
      {/* Floating Action Menu Header (Hidden when printing) */}
      <div className="fixed top-4 right-4 bg-white p-3 rounded shadow-md border flex gap-3 print:hidden z-50">
        <button onClick={() => window.print()} className="bg-blue-600 text-white font-bold px-4 py-2 rounded text-sm hover:bg-blue-700 shadow flex items-center gap-2">
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
           Print / Save PDF
        </button>
        <button onClick={() => window.close()} className="bg-slate-200 text-slate-800 font-bold px-4 py-2 rounded text-sm hover:bg-slate-300 shadow">
           Close
        </button>
      </div>

      {/* A single realistic ID Card Boundary */}
      <div className="w-[3.375in] h-[2.125in] bg-white border border-slate-300 shadow-xl overflow-hidden relative flex flex-col font-sans print:shadow-none print:border-none">
         
         {/* Beautiful ID Card Header Area */}
         <div className="w-full py-1.5 flex flex-col items-center justify-center relative">
            <h1 className="text-[#000080] font-extrabold font-serif tracking-tight text-[11px] leading-tight mb-0">CHILDREN'S ACADEMY</h1>
            <span className="text-[7.5px] font-bold absolute left-1 top-2.5 text-[#000080]">Session : 2025-26</span>
         </div>

         {/* Middle Flex Body (Photo left, Data right) */}
         <div className="flex flex-1 px-1.5 gap-2 mt-1 relative z-10 w-full">
            
            {/* Student Photo block */}
            <div className="w-[66px] h-[82px] border-2 border-slate-300 bg-red-600 overflow-hidden shrink-0 shadow-sm relative mt-2">
                <img src="https://ui-avatars.com/api/?name=BHAGAT+SINGH&background=dc2626&color=fff&size=200" className="object-cover w-full h-full opacity-80" alt="Student" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/20 to-transparent h-4"></div>
            </div>

            {/* Student Information Block */}
            <div className="flex flex-col flex-1 pl-1 items-center justify-center text-[7.5px] font-bold text-[#000080] leading-[1.3] text-center mt-[-6px]">
               <span className="text-[10px] font-extrabold text-black uppercase mb-0.5 tracking-wide">BHAGAT SINGH</span>
               <span>F : RAJEEV KUMAR</span>
               <span>XI-A</span>
               <span className="font-semibold text-black leading-tight max-w-[120px]">JANTA COLONY DIWAKRI, ALWAR</span>
               <span className="mt-0.5">DOB : <span className="text-black">21/06/2008</span></span>
               <span className="mt-1 font-bold text-[#b45309]">Call : 9462806485</span>
            </div>

         </div>

         {/* Standard Footer Address Box spanning the bottom */}
         <div className="w-full border-t border-[#f97316] mt-auto pt-0.5 pb-1 flex flex-col items-center justify-center text-[#475569] text-[6.5px] leading-tight tracking-tight bg-white z-10">
            <span>DELHI ROAD, DIWAKRI, ALWAR-301001 (RAJ.) - 9461230218,</span>
            <span>0144-3249344</span>
            <span className="text-[#000080] mt-[1px]">Email: childrenacademy7@rediffmail.com | Ph: 9461230218</span>
         </div>

      </div>

    </div>
  )
}
