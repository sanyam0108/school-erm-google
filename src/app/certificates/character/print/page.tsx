import { Suspense } from 'react'
import CharacterClient from './CharacterClient'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 font-bold">Loading Certificate engine...</div>}>
      <CharacterClient />
    </Suspense>
  )
}
