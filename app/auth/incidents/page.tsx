// app/auth/incidents/IncidentsPage.js
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // For navigation
import Button from '@/components/Button'; // Adjust path if necessary
import IncidentPosts from './IncidentPosts'; // Import the new IncidentPosts component
import { incidents } from './data'; // Import incidents data

const IncidentsPage = () => {
  const [status, setStatus] = useState('all'); // Default status is 'all' to show all incidents
  const router = useRouter();

  // Filter incidents based on the selected status
  const filteredIncidents = status === 'all'
    ? incidents
    : incidents.filter(incident => incident.status === status);

  // Handle button click to navigate to the page for raising a new incident
  const handleButtonClick = () => {
    router.push('/raise-incident');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Incidents</h1>

      {/* Status Buttons for Filtering Incidents */}
      <div className="mb-6">
        <button
          onClick={() => setStatus('all')}
          className={`mr-4 px-4 py-2 rounded-lg ${status === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          All Incidents
        </button>
        <button
          onClick={() => setStatus('Pending')}
          className={`mr-4 px-4 py-2 rounded-lg ${status === 'Pending' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Pending
        </button>
        <button
          onClick={() => setStatus('Resolved')}
          className={`mr-4 px-4 py-2 rounded-lg ${status === 'Resolved' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Resolved
        </button>
        <button
          onClick={() => setStatus('Informational')}
          className={`mr-4 px-4 py-2 rounded-lg ${status === 'Informational' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Informational
        </button>
        {/* Button to raise a new incident */}
        <Button
          text="Raise New Incident"
          className="bg-green-500 text-white hover:bg-green-600"
          onClick={handleButtonClick}
        />
      </div>

      {/* Display incidents */}
      <IncidentPosts incidents={filteredIncidents} />
    </div>
  );
};

export default IncidentsPage;
