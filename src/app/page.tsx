import {Suspense} from 'react'
import CompanyFeed from "@/components/company-feed";
import JobFeed from "@/components/job-feed";
import {auth, signIn} from "@/auth";
import {redirect} from "next/navigation";

export default async function Home() {
  const session = await auth()
  if(!session) return signIn();

  return redirect('/dashboard');
}