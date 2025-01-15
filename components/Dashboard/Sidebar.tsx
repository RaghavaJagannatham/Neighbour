'use client';

import Link from 'next/link'; // Import Link from Next.js

const Sidebar = () => {
  return (
    <aside className="p-4 space-y-4 rounded-lg">
      <nav className="space-y-4">
        {/* Link for Home */}
        <Link href="/auth/home">
          <button className="block w-full text-left hover:bg-gray-100 p-2 rounded-lg">Home</button>
        </Link>

        {/* Link for Chats */}
        <Link href="/chats">
          <button className="block w-full text-left hover:bg-gray-100 p-2 rounded-lg">Chats</button>
        </Link>

        {/* Link for Notifications */}
        <Link href="/notifications">
          <button className="block w-full text-left hover:bg-gray-100 p-2 rounded-lg">Notifications</button>
        </Link>

        {/* Link for Discover */}
        <Link href="/discover">
          <button className="block w-full text-left hover:bg-gray-100 p-2 rounded-lg">Discover</button>
        </Link>

        {/* Link for Groups */}
        <Link href="/groups">
          <button className="block w-full text-left hover:bg-gray-100 p-2 rounded-lg">Groups</button>
        </Link>

        {/* Link for Create New Post */}
        <Link href="/auth/postForm">
          <button className="block w-full text-left bg-blue-600 text-white p-2 rounded-lg">
            Create New Post
          </button>
        </Link>
        <Link href="/auth/incidentForm">
          <button className="block w-full mt-2 text-left bg-blue-600 text-white p-2 rounded-lg">
            Create New Incident
          </button>
        </Link>

        {/* Link for Settings */}
        <Link href="/settings">
          <button className="block w-full text-left hover:bg-gray-100 p-2 rounded-lg mt-8">
            Settings
          </button>
        </Link>

        {/* Link for Logout */}
        <Link href="/logout">
          <button className="block w-full text-left hover:bg-gray-100 p-2 rounded-lg">Logout</button>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
