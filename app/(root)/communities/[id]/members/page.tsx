import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { fetchCommunityDetails, fetchCommunityMembers } from "@/lib/actions/community.actions";

interface Member {
  id: string;
  name: string;
  username: string;
  image: string;
}

interface Community {
  id: string;
  name: string;
  username: string;
  bio: string;
  members: Member[];
}

function CommunityMembersPage() {
  const router = useRouter();
  const { id } = router.query; // Extract community ID from URL
  const [community, setCommunity] = useState<Community | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch community data and members on component mount or community ID change
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const communityData = await fetchCommunityDetails(id as string); // Fetch community details
          const membersData = await fetchCommunityMembers(id as string); // Fetch members of the community
          setCommunity({ ...communityData, members: membersData });
        } catch (error: any) {
          console.error("Error fetching community data:", error);
          setError("Failed to load community data.");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id]);

  const handleRemoveMember = async (memberId: string) => {
    // Example logic for removing a member
    try {
      setLoading(true);
      // Replace this with actual logic for removing the member (e.g., API call)
      console.log(`Removing member with ID: ${memberId}`);

      // Optionally update state after removing member
      setCommunity((prevCommunity) => {
        if (prevCommunity) {
          const updatedMembers = prevCommunity.members.filter((member) => member.id !== memberId);
          return { ...prevCommunity, members: updatedMembers };
        }
        return prevCommunity;
      });

      setLoading(false);
    } catch (error) {
      console.error("Error removing member:", error);
      setError("Failed to remove member.");
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p className="text-red-500">{error}</p>;

  if (!community) return <p>Community not found.</p>;

  return (
    <div className="community-members-page p-4">
      <h1 className="text-2xl font-bold text-gray-800">{community.name}</h1>
      <p className="text-sm text-gray-500">@{community.username}</p>
      <p className="mt-4 text-sm text-gray-600">{community.bio}</p>

      <div className="members-list mt-6">
        <h2 className="text-xl font-semibold text-gray-700">Members</h2>
        {community.members.length > 0 ? (
          <div className="members">
            {community.members.map((member) => (
              <div key={member.id} className="member-item flex items-center justify-between mt-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={member.image || "/path/to/default-image.jpg"}
                    alt={`${member.name}'s profile`}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{member.name}</p>
                    <p className="text-xs text-gray-500">@{member.username}</p>
                  </div>
                </div>

                {/* Admin Action to remove member */}
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleRemoveMember(member.id)}
                  disabled={loading} // Disable button during loading
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p>No members found.</p>
        )}
      </div>
    </div>
  );
}

export default CommunityMembersPage;
