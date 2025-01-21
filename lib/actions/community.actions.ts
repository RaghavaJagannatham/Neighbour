"use server";

import Community from "../models/community.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { FilterQuery, SortOrder } from "mongoose";


export async function createCommunity(
  id: string,
  name: string,
  username: string,
  image: string,
  bio: string,
  createdById: string
) {
  try {
    await connectToDB();

    const user = await User.findOne({ id: createdById });
    if (!user) throw new Error("User not found");

    const newCommunity = new Community({
      id,
      name,
      username,
      image,
      bio,
      createdBy: user._id,
    });

    const createdCommunity = await newCommunity.save();

    user.communities.push(createdCommunity._id);
    await user.save();

    return createdCommunity;
  } catch (error) {
    console.error("Error creating community:", error);
    throw error;
  }
}
export async function fetchCommunityDetails(id: string) {
  try {
    await connectToDB();

    const community = await Community.findOne({ id }).populate("createdBy members threads");
    if (!community) throw new Error("Community not found");

    return community;
  } catch (error) {
    console.error("Error fetching community details:", error);
    throw error;
  }
}
export async function fetchCommunityPosts(id: string) {
  try {
    await connectToDB();

    const community = await Community.findOne({ id }).populate("threads");
    if (!community) throw new Error("Community not found");

    return community.threads;
  } catch (error) {
    console.error("Error fetching community posts:", error);
    throw error;
  }
}
// export async function fetchCommunities(
//   filters: FilterQuery<any> = {},
//   sort: "asc" | "desc" = "asc",
//   pageSize: number = 4
// ) {
//   try {
//     // Connect to the database
//     await connectToDB();

//     // Fetch communities with filters, sorting, and pagination
//     const communities = await Community.find(filters)
//       .sort({ createdAt: sort })
//       .limit(pageSize); // Limit the number of communities fetched

//     return {
//       communities,
//     };
//   } catch (error) {
//     console.error("Error fetching communities:", error);
//     throw error;
//   }
// }

// In your community.actions.ts file
export async function fetchCommunities(filters: any = {}, sort: string = "asc", pageSize: number = 4) {
  // Simulating hardcoded communities without images
  const communities = [
    {
      id: "1",
      username: "community1",
      name: "Neighborhood Watch 1",
      image: "", // No image for now
      bio: "A community focused on neighborhood safety.",
      members: [
        { image: "" }, 
        { image: "" },
        { image: "" },
      ],
    },
    {
      id: "2",
      username: "community2",
      name: "Neighborhood Watch 2",
      image: "", // No image for now
      bio: "A community that keeps an eye out for local incidents.",
      members: [
        { image: "" },
        { image: "" },
      ],
    },
    {
      id: "3",
      username: "community3",
      name: "Neighborhood Watch 3",
      image: "", // No image for now
      bio: "Ensuring the safety of our streets and homes.",
      members: [
        { image: "" },
        { image: "" },
        { image: "" },
      ],
    },
    {
      id: "4",
      username: "community4",
      name: "Neighborhood Watch 4",
      image: "", // No image for now
      bio: "A community that strives for peace and security.",
      members: [
        { image: "" },
        { image: "" },
      ],
    },
  ];

  // Simulate pagination by slicing the array
  return { communities: communities.slice(0, pageSize) };
}


export async function addMemberToCommunity(communityId: string, userId: string) {
  try {
    await connectToDB();

    const community = await Community.findOne({ id: communityId });
    if (!community) throw new Error("Community not found");

    const user = await User.findOne({ id: userId });
    if (!user) throw new Error("User not found");

    if (!community.members.includes(user._id)) {
      community.members.push(user._id);
      user.communities.push(community._id);
      await community.save();
      await user.save();
    }

    return community;
  } catch (error) {
    console.error("Error adding member to community:", error);
    throw error;
  }
}
export async function removeUserFromCommunity(communityId: string, userId: string) {
  try {
    await connectToDB();

    const community = await Community.findOne({ id: communityId });
    if (!community) throw new Error("Community not found");

    const user = await User.findOne({ id: userId });
    if (!user) throw new Error("User not found");

    community.members = community.members.filter(
      (memberId: any) => memberId.toString() !== user._id.toString()
    );
    user.communities = user.communities.filter(
      (commId : any) => commId.toString() !== community._id.toString()
    );

    await community.save();
    await user.save();

    return community;
  } catch (error) {
    console.error("Error removing user from community:", error);
    throw error;
  }
}
export async function updateCommunityInfo(
  id: string,
  updates: Partial<{ name: string; username: string; image: string; bio: string }>
) {
  try {
    await connectToDB();

    const community = await Community.findOneAndUpdate({ id }, updates, { new: true });
    if (!community) throw new Error("Community not found");

    return community;
  } catch (error) {
    console.error("Error updating community:", error);
    throw error;
  }
}
export async function deleteCommunity(id: string) {
  try {
    await connectToDB();

    const community = await Community.findOne({ id });
    if (!community) throw new Error("Community not found");

    // Remove community references in users
    await User.updateMany(
      { communities: community._id },
      { $pull: { communities: community._id } }
    );

    // Delete the community
    await Community.deleteOne({ id });

    return { message: "Community deleted successfully" };
  } catch (error) {
    console.error("Error deleting community:", error);
    throw error;
  }
}

export async function fetchCommunityMembers(communityId: string) {
  try {
    await connectToDB();

    // Find the community by its ID and populate the 'members' field to include user details
    const community = await Community.findOne({ id: communityId })
      .populate("members", "id name username image"); // Populate member details such as id, name, username, and image

    if (!community) throw new Error("Community not found");

    // Return the members' details
    return community.members;
  } catch (error) {
    console.error("Error fetching community members:", error);
    throw error;
  }
}

