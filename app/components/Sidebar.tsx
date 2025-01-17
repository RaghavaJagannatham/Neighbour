'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  setFilter: (filter: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setFilter }) => {
    const router = useRouter();
  return (
    <aside className="w-64 h-screen bg-gray-100 shadow-md p-4">
      <h2 className="text-lg font-bold mb-4">Filters</h2>
      <ul className="space-y-2">
        <li>
          <button
            onClick={() => setFilter('for-you')}
            className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-100"
          >
            For You
          </button>
        </li>
        <li>
          <button
            onClick={() => setFilter('trending')}
            className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-100"
          >
            Trending
          </button>
        </li>
        <li>
          <button
            onClick={() => setFilter('incidents')}
            className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-100"
          >
            Incidents
          </button>
        </li>
      </ul>

      <hr className="my-6" />

      <h2 className="text-lg font-bold mb-4">Actions</h2>
      <ul className="space-y-2">
        <li>
          <button
            onClick={() => router.push('/posts/new')}
            className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-100"
          >
            Add New Post
          </button>
        </li>
        <li>
          <button
            onClick={() => alert('Navigate to Add New Incident')}
            className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-100"
          >
            Add New Incident
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
