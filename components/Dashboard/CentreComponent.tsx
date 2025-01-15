'use client';

import { useState } from 'react';
import Link from 'next/link'; // Use Link for navigation
import Posts from './Posts';
import { posts} from './data'; // Import posts and incidents data

const CenterContent = () => {
  const [filter, setFilter] = useState('all'); // Default filter is 'all'
  const [type, setType] = useState('posts'); // Default type is 'posts'

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    setFilter('all'); // Reset filter when switching type
  };

  // Determine the data to pass to the Posts component
  let dataToShow = [];
  if (filter === 'all') {
    dataToShow = [...posts]; // Combine posts and incidents for 'all' filter
  } else if (filter === 'posts') {
    dataToShow = posts; // Show only posts
  } else if (filter === 'trending') {
    dataToShow = [...posts]; // Combine for trending
    // Sort data by upvotes or any other metric for trending
    dataToShow.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
  }

  return (
    <section>
      {/* Filter Buttons */}
      <div className="mb-4">
        <button
          onClick={() => handleFilterChange('all')}
          className={`mr-4 px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        <button
          onClick={() => handleFilterChange('posts')}
          className={`mr-4 px-4 py-2 rounded-lg ${filter === 'posts' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Posts
        </button>

        {/* Incidents Link Button */}
        <Link
          href="/auth/incidents"
          className={`mr-4 px-4 py-2 rounded-lg ${filter === 'incidents' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => handleTypeChange('incidents')}
        >
          Incidents
        </Link>

        <button
          onClick={() => handleFilterChange('trending')}
          className={`px-4 py-2 rounded-lg ${filter === 'trending' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Trending
        </button>
      </div>

      {/* Posts List */}
      <Posts filter={filter} type={type} data={dataToShow} />
    </section>
  );
};

export default CenterContent;
