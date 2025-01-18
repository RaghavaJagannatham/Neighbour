'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import PostCard from '../components/PostCard';
import IncidentCard from '../components/IncidentCard'; // This will handle incidents
import useFetchPosts from '../hooks/usefetchPosts';

const HomePage = () => {
  const [filter, setFilter] = useState('for-you');
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const router = useRouter();
  const { data, loading, error } = useFetchPosts(`/api/home?filter=${filter}&page=${page}`);

  const isIncidentFilter = filter === 'incidents'; // Check if the filter is set to incidents

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
    }
  }, [router]);

  // Handle infinite scroll
  const handleScroll = (e: React.UIEvent) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !loadingMore) {
      setLoadingMore(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Get the appropriate data (posts or incidents) based on the filter
  const dataToDisplay = isIncidentFilter ? data?.incidents : data?.posts;

  return (
    <div className="flex min-h-screen" onScroll={handleScroll}>
      <Sidebar setFilter={setFilter} />
      <div className="flex-1">
        <Header />
        <div className="p-4">
          {loading && page === 1 ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">Error: {error}</p>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-4">{isIncidentFilter ? 'Incidents' : 'Posts'}</h2>
              {dataToDisplay && dataToDisplay.length > 0 ? (
                dataToDisplay.map((item: any) => (
                  isIncidentFilter ? (
                    <IncidentCard key={item._id} incident={item} />
                  ) : (
                    <PostCard key={item._id} post={item} />
                  )
                ))
              ) : (
                <p className="text-center text-gray-500">No {isIncidentFilter ? 'incidents' : 'posts'} found.</p>
              )}
            </div>
          )}
          {loadingMore && <p className="text-center text-gray-500 mt-4">Loading more...</p>}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
