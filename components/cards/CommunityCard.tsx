import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

interface Member {
  image: string;
}

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  members: Member[]; // Array of members, each with an image property
}

function CommunityCard({ id, name, username, imgUrl, bio, members = [] }: Props) {
  // Fallback image for community logo and member profile images
  const fallbackImage = "/path/to/default-image.jpg"; // Replace with a real placeholder image URL

  return (
    <article className="community-card p-4 border rounded-lg shadow-md">
      <div className="flex items-center gap-3">
        {/* Community Logo */}
        <Link href={`/communities/${id}`} className="relative h-16 w-16">
          <Image
            src={imgUrl || fallbackImage} // Use fallback image if imgUrl is empty
            alt="community_logo"
            fill
            className="rounded-full object-cover"
          />
        </Link>

        {/* Community Info */}
        <div>
          <Link href={`/communities/${id}`}>
            <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
          </Link>
          <p className="text-sm text-gray-500">@{username}</p>
        </div>
      </div>

      {/* Community Bio */}
      <p className="mt-4 text-sm text-gray-600">{bio}</p>

      {/* Members Section */}
      <div className="mt-5 flex items-center justify-between">
        <Link href={`/communities/${id}`}>
          <Button size="sm" className="community-card_btn">
            View
          </Button>
        </Link>

        {/* Display Members */}
        {members && members.length > 0 && (
          <div className="flex items-center">
            {members.slice(0, 3).map((member, index) => (
              <Image
                key={index}
                src={member.image || fallbackImage} // Use fallback image if member.image is empty
                alt={`user_${index}`}
                width={28}
                height={28}
                className={`${
                  index !== 0 ? "-ml-2" : ""
                } rounded-full object-cover`}
              />
            ))}
            {members.length > 3 && (
              <p className="ml-2 text-sm text-gray-500">
                {members.length}+ Users
              </p>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default CommunityCard;
