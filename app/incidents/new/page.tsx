'use client';

import React, { useState } from 'react';

const NewIncident = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
  
    if (!userId || !username) {
      setError('User not logged in or user data not available.');
      return;
    }
  
    if (!title || !description) {
      setError('Title and description are required.');
      return;
    }
  
    const incidentData = {
      title,
      description,
      image,
      userId,
      username,
    };
  
    try {
      const response = await fetch('/api/incidents/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(incidentData),
      });
  
      let data;
      try {
        data = await response.json(); // Attempt to parse JSON
      } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError);
        setError('Unexpected response from server.');
        return;
      }
  
      if (response.ok) {
        setSuccess('Incident created successfully');
        console.log('Incident created successfully:', data);
      } else {
        setError(data?.error || 'Failed to create incident');
        console.error('Failed to create incident:', data);
      }
    } catch (error) {
      setError('Error submitting incident');
      console.error('Error submitting incident:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);  // Store base64 image string
      };
      reader.readAsDataURL(file);  // Read the file as base64 string
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Incident</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewIncident;
