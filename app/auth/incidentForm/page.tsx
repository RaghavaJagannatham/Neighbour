
'use client';

import { useState } from 'react';

const IncidentForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [location, setLocation] = useState('');
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation
    if (!title || !description) {
      alert('Title and Description are required!');
      return;
    }

    const incidentData = {
      title,
      description,
      isAnonymous,
      location,
      file,
      category,
    };

    console.log('Submitting Incident:', incidentData);
    // Send to backend (API integration here)
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 shadow-lg rounded-lg">
      {/* Title */}
      <div>
        <label className="block font-semibold mb-2">Title</label>
        <input
          type="text"
          className="w-full border rounded-lg p-2"
          placeholder="Enter a brief title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block font-semibold mb-2">Description</label>
        <textarea
          className="w-full border rounded-lg p-2"
          placeholder="Provide detailed information about the incident"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="5"
          required
        />
      </div>

      {/* File Upload */}
      <div>
        <label className="block font-semibold mb-2">Upload Image/Video</label>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="block"
        />
      </div>

      {/* Location */}
      <div>
        <label className="block font-semibold mb-2">Location (Optional)</label>
        <input
          type="text"
          className="w-full border rounded-lg p-2"
          placeholder="Enter location or leave blank"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* Category */}
      <div>
        <label className="block font-semibold mb-2">Category</label>
        <select
          className="w-full border rounded-lg p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="theft">Theft</option>
          <option value="vandalism">Vandalism</option>
          <option value="noise">Noise Complaint</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Anonymous Reporting */}
      <div>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
          />
          Report Anonymously
        </label>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Submit Incident
        </button>
      </div>
    </form>
  );
};

export default IncidentForm;
