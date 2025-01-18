// app/utils/updateUserData.ts

export async function updateUserData(userId: string, formData: any) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      return true;
    } catch (error) {
      console.error('Error updating user data:', error);
      return false;
    }
  }
  