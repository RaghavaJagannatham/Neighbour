'use client'; // Mark this component as a Client Component

import { useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  bio: string;
  profilePicture: string;
  contactInfo: string;
  location: string;
}

export default function Profile({ clientUser }: { clientUser: User }) {
  const [user, setUser] = useState<User>(clientUser);

  useEffect(() => {
    // Only if we need to update state in future or re-fetch data
    // No need to refetch on the first render
  }, [clientUser]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center mb-6">{user.username}'s Profile</h1>
      
      {/* Profile Picture */}
      <div className="flex justify-center mb-6">
        <img 
          src={user.profilePicture} 
          alt="Profile Picture" 
          className="w-32 h-32 rounded-full object-cover"
        />
      </div>

      {/* User Details */}
      <div className="space-y-4 mb-6">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Bio:</strong> {user.bio}</p>
        <p><strong>Contact:</strong> {user.contactInfo}</p>
        <p><strong>Location:</strong> {user.location}</p>
      </div>

      {/* Edit Profile Button */}
      <div className="flex justify-center">
        <button 
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={() => window.location.href = `/profile/${user.id}/edit`}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}
