import { Suspense } from 'react'
import RoleUserDetailsPage from '@/app/components/admin/RoleUserDetailsPage'

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading...</div>}>
      <RoleUserDetailsPage />
    </Suspense>
  )
}
