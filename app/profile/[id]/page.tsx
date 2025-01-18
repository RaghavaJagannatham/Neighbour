// app/profile/[id]/page.tsx

import { notFound } from 'next/navigation';
import { fetchUserData } from '@/app/utils/fetchUserData';
import Profile from './profile';

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const user = await fetchUserData(params.id);

  if (!user) {
    notFound(); // Display 404 if user is not found
  }

  return <Profile clientUser={user} />;
}
