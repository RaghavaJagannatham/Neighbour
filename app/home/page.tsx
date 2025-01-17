'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import PostCard from '../components/PostCard';
import useFetchPosts from '../hooks/usefetchPosts';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('for-you');
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const router = useRouter();
  const { data, loading, error } = useFetchPosts(`/api/home?filter=${filter}&page=${page}`);

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
    }
  }, [router]);

  // Handle new data fetch
  useEffect(() => {
    if (data) {
      // If page is 1, replace posts; otherwise, append
      setPosts((prevPosts) => (page === 1 ? data.posts : [...prevPosts, ...data.posts]));
    }
  }, [data, page]);

  // Handle filter change
  useEffect(() => {
    setPosts([]); // Clear posts when filter changes
    setPage(1); // Reset to the first page
  }, [filter]);

  // Infinite scroll logic
  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !loading && !loadingMore) {
      setLoadingMore(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

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
              <h2 className="text-2xl font-bold mb-4">Posts</h2>
              {posts.length > 0 ? (
                posts.map((post) => <PostCard key={post._id} post={post} />)
              ) : (
                <p className="text-center text-gray-500">No posts found.</p>
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
