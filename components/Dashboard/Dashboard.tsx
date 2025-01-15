'use client';
import QuickActions from './QuickActions'; // QuickActions component
import Posts from './Posts'; // Posts component
import { useRouter } from 'next/navigation'; // For routing
import { useState } from 'react'; // For managing filter state

const Dashboard = () => {
  const userName = 'John Doe'; // Change dynamically based on logged-in user
  const router = useRouter();

  // Filter state to track which category is selected
  const [filter, setFilter] = useState('all'); // 'all', 'posts', 'incidents', 'trending'

  // Quick Actions handler
  const handleQuickAction = (action) => {
    if (action === 'reportIncident') {
      router.push('/report-incident');
    } else if (action === 'viewRecommendations') {
      router.push('/recommendations');
    } else if (action === 'viewPosts') {
      router.push('/posts');
    } else if (action === 'viewCommunityMap') {
      router.push('/community-map');
    }
  };

  // Handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Welcome, {userName}</h1>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar */}
        <aside className="col-span-2 hidden lg:block p-4 rounded-lg">
          <nav className="space-y-4">
            <button className="block w-full text-left hover:bg-gray-100 p-2 rounded-lg">Home</button>
            <button className="block w-full text-left hover:bg-gray-100 p-2 rounded-lg">Chats</button>
            <button className="block w-full text-left hover:bg-gray-100 p-2 rounded-lg">Notifications</button>
            <button className="block w-full text-left hover:bg-gray-100 p-2 rounded-lg">Discover</button>
            <button className="block w-full text-left hover:bg-gray-100 p-2 rounded-lg">Groups</button>
            <button className="block w-full text-left bg-blue-600 text-white p-2 rounded-lg">
              Post
            </button>
          </nav>
        </aside>

        {/* Center Content */}
        <section className="col-span-8">
          
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
            <button 
              onClick={() => handleFilterChange('incidents')}
              className={`mr-4 px-4 py-2 rounded-lg ${filter === 'incidents' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Incidents
            </button>
            <button 
              onClick={() => handleFilterChange('trending')}
              className={`px-4 py-2 rounded-lg ${filter === 'trending' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Trending
            </button>
          </div>
          {/* Pass the selected filter to the Posts component */}
          <Posts filter={filter} />
        </section>

        {/* Right Sidebar */}
        <aside className="col-span-2 hidden lg:block space-y-6">
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold">Own a Local Business?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Create a business page to connect with neighbors, post updates in the feed, and gain new customers.
            </p>
            <button className="text-blue-500 hover:text-blue-700">Create Page</button>
          </div>
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold">Sponsored</h3>
            <p className="text-sm text-gray-600">Ready to sweat? Dive into fitness classes at your neighborhood gym.</p>
            <button className="text-blue-500 hover:text-blue-700 mt-2">Sign Up</button>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Dashboard;