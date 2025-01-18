import { useState, useEffect } from 'react';

const useFetchUserContent = (userId, type) => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`/api/${type}?userId=${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.error(`Error fetching user ${type}:`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [userId, type]);

  return { content, loading };
};

export default useFetchUserContent;
