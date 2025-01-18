'use client';

import { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    console.log("Retrieved userId from localStorage:", userId);

    if (!userId) {
      setError('User not found. Please log in again.');
      return;
    }

    // Fetch user data from backend using the userId
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/profile/${userId}`);
        console.log("API Response Status:", response.status);

        // Check if the response is OK (status 200)
        if (!response.ok) {
          const errorResponse = await response.json();
          setError(errorResponse.error || 'Failed to fetch user data');
          return;
        }

        // If the response is okay, extract the JSON data
        const data = await response.json();
        console.log("Fetched user data:", data);

        if (!data || Object.keys(data).length === 0) {
          setError('No data found for this user');
        } else {
          setSuccessMessage('User data loaded successfully!'); // Success message
          setUserData(data); // Store the user data
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError('Failed to fetch user data');
      }
    };

    fetchUserData();
  }, []); // Empty dependency array to run only once

  return (
    <div>
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>} {/* Success message */}

      {userData ? (
        <div className="profile-container">
          <h1>Profile: {userData.username}</h1>
          <p>Email: {userData.email}</p>
          <p>Username: {userData.username}</p>
          <p>Joined: {userData.createdAt}</p> {/* If your user model has a createdAt field */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;
