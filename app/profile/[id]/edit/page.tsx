'use client';
// app/profile/[id]/edit/page.tsx

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { fetchUserData } from '@/utils/fetchUserData';
// import { updateUserData } from '@/utils/updateUserData';
import { fetchUserData } from '@/app/utils/fetchUserData';
import { updateUserData } from '@/app/utils/updateUserData';

interface User {
  id: string;
  username: string;
  email: string;
  bio: string;
  profilePicture: string;
  contactInfo: string;
  location: string;
}

export default function EditProfilePage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<User | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const loadUserData = async () => {
      const data = await fetchUserData(params.id);
      if (data) {
        setUser(data);
        setFormData(data); // Pre-fill the form
      } else {
        setError('Failed to load user data');
      }
    };

    loadUserData();
  }, [params.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await updateUserData(params.id, formData);
    if (success) {
      router.push(`/profile/${params.id}`);
    } else {
      setError('Failed to update profile');
    }
    setLoading(false);
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center mb-6">Edit Profile</h1>

      {error && <div className="bg-red-500 text-white p-3 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block font-medium">Username</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            value={formData?.username || ''} 
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-medium">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData?.email || ''} 
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="bio" className="block font-medium">Bio</label>
          <input 
            type="text" 
            id="bio" 
            name="bio" 
            value={formData?.bio || ''} 
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="contactInfo" className="block font-medium">Contact Info</label>
          <input 
            type="text" 
            id="contactInfo" 
            name="contactInfo" 
            value={formData?.contactInfo || ''} 
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="location" className="block font-medium">Location</label>
          <input 
            type="text" 
            id="location" 
            name="location" 
            value={formData?.location || ''} 
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
}
