import { useEffect, useState } from 'react';

const useFetchPosts = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        if (response.ok) {
          setData(result);
        } else {
          setError(result.error || 'Failed to fetch data');
        }
      } catch (err) {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [url]);

  return { data, loading, error };
};

export default useFetchPosts;
