'use client';

import Posts from './Posts';
import { useState } from 'react';

const CenterContent = () => {
  const [filter, setFilter] = useState('all');

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <section>
      {/* Filter Buttons */}
      <div className="mb-4">
        <button
          onClick={() => handleFilterChange('all')}
          className={`mr-4 px-4 py-2 rounded-lg ${
            filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => handleFilterChange('posts')}
          className={`mr-4 px-4 py-2 rounded-lg ${
            filter === 'posts' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          Posts
        </button>
        <button
          onClick={() => handleFilterChange('incidents')}
          className={`mr-4 px-4 py-2 rounded-lg ${
            filter === 'incidents' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          Incidents
        </button>
        <button
          onClick={() => handleFilterChange('trending')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'trending' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          Trending
        </button>
      </div>

      {/* Posts List */}
      <Posts filter={filter} />
    </section>
  );
};

export default CenterContent;
