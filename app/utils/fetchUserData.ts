// app/utils/fetchUserData.ts

export async function fetchUserData(userId: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${userId}`);
  if (!response.ok) {
    return null;
  }
  return response.json();
}
