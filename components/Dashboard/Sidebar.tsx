'use client';

const Sidebar = () => {
  return (
    <aside className="p-4 space-y-4 rounded-lg">
      <nav className="space-y-4">
        <button className="block w-full text-left hover:bg-gray-100 p-2 rounded-lg">Home</button>
        <button className="block w-full text-left hover:bg-gray-100 p-2 rounded-lg">Chats</button>
        <button className="block w-full text-left hover:bg-gray-100 p-2 rounded-lg">Notifications</button>
        <button className="block w-full text-left hover:bg-gray-100 p-2 rounded-lg">Discover</button>
        <button className="block w-full text-left hover:bg-gray-100 p-2 rounded-lg">Groups</button>
        <button className="block w-full text-left bg-blue-600 text-white p-2 rounded-lg">
          Create New Post
        </button>
        <button className="block w-full text-left hover:bg-gray-100 p-2 rounded-lg mt-8">
          Settings
        </button>
        <button className="block w-full text-left hover:bg-gray-100 p-2 rounded-lg">Logout</button>
      </nav>
    </aside>
  );
};

export default Sidebar;
