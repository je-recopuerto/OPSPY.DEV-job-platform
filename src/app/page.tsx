import { Suspense } from 'react'
import CompanyFeed from "@/components/company-feed";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Suspense fallback={<p>Loading feed...</p>}>
        <CompanyFeed />
      </Suspense>
    </main>
  )
}