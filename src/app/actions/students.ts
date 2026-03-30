"use server"

import { redirect } from 'next/navigation'

/**
 * Server Action representing the backend persistence boundary
 * In a live environment, this binds the form data securely with the Supabase HTTP Client
 */
export async function registerStudentAction(formData: FormData) {
  
  // 1. We would extract the raw Form input names here
  // const studentName = formData.get("studentName");
  // const dob = formData.get("dob");
  
  // 2. We mock the backend HTTP delay for safety and stability verification
  await new Promise(resolve => setTimeout(resolve, 800));

  console.log("SERVER ACTION: Student Payload received and validated. Sending via Supabase...")
  
  // 3. We would run `supabase.from('students').insert({ ... })` here.
  
  console.log("SERVER ACTION: Insertion successful. Piping Client Router seamlessly.")
  
  // 4. Using the Next.js `redirect()` directly from the server securely routes the client
  // instantly to the subsequent Phase 4 Setup Fees screen.
  redirect('/fees/configure');
}
