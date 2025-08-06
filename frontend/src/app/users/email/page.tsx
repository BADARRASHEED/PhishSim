import { Suspense } from 'react'
import UserDetailPage from '@/app/components/admin/UserDetailPage'

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading user details...</div>}>
      <UserDetailPage />
    </Suspense>
  )
}
