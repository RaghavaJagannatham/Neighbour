'use client';
import React, { useEffect, useState } from "react";
import CommunityCard from "@/components/cards/CommunityCard"; // Adjust this import if necessary
import { fetchCommunities } from "@/lib/actions/community.actions";

interface Community {
  id: string;
  name: string;
  username: string;
  image?: string;
  bio?: string;
}

const CommunitiesPage: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCommunities = async () => {
      try {
        setLoading(true);
        const data = await fetchCommunities({}, "asc", 4); // Fetch hardcoded communities
        console.log("Fetched communities:", data.communities); // Log communities for debugging
        setCommunities(data.communities); // Set the state with hardcoded data
      } catch (err) {
        console.error("Error fetching communities:", err);
        setError("Failed to load communities.");
      } finally {
        setLoading(false);
      }
    };

    loadCommunities();
  }, []);

  if (loading) return <div>Loading communities...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Communities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {communities.length > 0 ? (
          communities.map((community) => (
            <CommunityCard key={community.id} community={community} />
          ))
        ) : (
          <p>No communities found.</p>
        )}
      </div>
    </div>
  );
};

export default CommunitiesPage;
