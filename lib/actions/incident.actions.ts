"use server";

import { revalidatePath } from "next/cache";

import { connectToDB } from "../mongoose";

import User from "../models/user.model";
import Community from "../models/community.model";
import Incident from "../models/incident.model";

export async function fetchIncidents(pageNumber = 1, pageSize = 20) {
  connectToDB();

  // Calculate the number of posts to skip based on the page number and page size.
  const skipAmount = (pageNumber - 1) * pageSize;

  // Create a query to fetch the posts that have no parent (top-level incidents) (a incident that is not a comment/reply).
  const postsQuery = Incident.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
      path: "author",
      model: User,
    })
    .populate({
      path: "community",
      model: Community,
    })
    .populate({
      path: "children", // Populate the children field
      populate: {
        path: "author", // Populate the author field within children
        model: User,
        select: "_id name parentId image", // Select only _id and username fields of the author
      },
    });

  // Count the total number of top-level posts (incidents) i.e., incidents that are not comments.
  const totalPostsCount = await Incident.countDocuments({
    parentId: { $in: [null, undefined] },
  }); // Get the total count of posts

  const posts = await postsQuery.exec();

  const isNext = totalPostsCount > skipAmount + posts.length;

  return { posts, isNext };
}

interface Params {
  text: string,
  author: string,
  communityId: string | null,
  path: string,
}


export async function createIncident({ text, author, communityId, path }: Params
) {
  try {
    connectToDB();

    const communityIdObject = await Community.findOne(
      { id: communityId },
      { _id: 1 }
    );

    const createdIncident = await Incident.create({
      text,
      author,
      community: communityIdObject, // Assign communityId if provided, or leave it null for personal account
    });

    // Update User model
    await User.findByIdAndUpdate(author, {
      $push: { incidents: createdIncident._id },
    });

    if (communityIdObject) {
      // Update Community model
      await Community.findByIdAndUpdate(communityIdObject, {
        $push: { incidents: createdIncident._id },
      });
    }

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create Incident: ${error.message}`);
  }
}


async function fetchAllChildIncidents(incidentId: string): Promise<any[]> {
  const childIncidents = await Incident.find({ parentId: incidentId });

  const descendantIncidents = [];
  for (const childIncident of childIncidents) {
    const descendants = await fetchAllChildIncidents(childIncident._id);
    descendantIncidents.push(childIncident, ...descendants);
  }

  return descendantIncidents;
}

export async function deleteIncident(id: string, path: string): Promise<void> {
  try {
    connectToDB();

    // Find the incident to be deleted (the main incident)
    const mainIncident = await Incident.findById(id).populate("author community");

    if (!mainIncident) {
      throw new Error("Incident not found");
    }

    // Fetch all child incidents and their descendants recursively
    const descendantIncidents = await fetchAllChildIncidents(id);

    // Get all descendant incident IDs including the main incident ID and child incident IDs
    const descendantIncidentIds = [
      id,
      ...descendantIncidents.map((incident) => incident._id),
    ];

    // Extract the authorIds and communityIds to update User and Community models respectively
    const uniqueAuthorIds = new Set(
      [
        ...descendantIncidents.map((incident) => incident.author?._id?.toString()), // Use optional chaining to handle possible undefined values
        mainIncident.author?._id?.toString(),
      ].filter((id) => id !== undefined)
    );

    const uniqueCommunityIds = new Set(
      [
        ...descendantIncidents.map((incident) => incident.community?._id?.toString()), // Use optional chaining to handle possible undefined values
        mainIncident.community?._id?.toString(),
      ].filter((id) => id !== undefined)
    );

    // Recursively delete child incidents and their descendants
    await Incident.deleteMany({ _id: { $in: descendantIncidentIds } });

    // Update User model
    await User.updateMany(
      { _id: { $in: Array.from(uniqueAuthorIds) } },
      { $pull: { incidents: { $in: descendantIncidentIds } } }
    );

    // Update Community model
    await Community.updateMany(
      { _id: { $in: Array.from(uniqueCommunityIds) } },
      { $pull: { incidents: { $in: descendantIncidentIds } } }
    );

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to delete Incident: ${error.message}`);
  }
}

export async function fetchIncidentdById(incidentId: string) {
  connectToDB();

  try {
    const incident = await Incident.findById(incidentId)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      }) // Populate the author field with _id and username
      .populate({
        path: "community",
        model: Community,
        select: "_id id name image",
      }) // Populate the community field with _id and name
      .populate({
        path: "children", // Populate the children field
        populate: [
          {
            path: "author", // Populate the author field within children
            model: User,
            select: "_id id name parentId image", // Select only _id and username fields of the author
          },
          {
            path: "children", // Populate the children field within children
            model: Incident, // The model of the nested children (assuming it's the same "incident" model)
            populate: {
              path: "author", // Populate the author field within nested children
              model: User,
              select: "_id id name parentId image", // Select only _id and username fields of the author
            },
          },
        ],
      })
      .exec();

    return incident;
  } catch (err) {
    console.error("Error while fetching incident:", err);
    throw new Error("Unable to fetch incident");
  }
}

export async function addCommentToIncident(
  incidentId: string,
  commentText: string,
  userId: string,
  path: string
) {
  connectToDB();

  try {
    // Find the original incident by its ID
    const originalIncident = await Incident.findById(incidentId);

    if (!originalIncident) {
      throw new Error("Incident not found");
    }

    // Create the new comment incident
    const commentIncident = new Incident({
      text: commentText,
      author: userId,
      parentId: incidentId, // Set the parentId to the original incident's ID
    });

    // Save the comment incident to the database
    const savedCommentIncident = await commentIncident.save();

    // Add the comment incident's ID to the original incident's children array
    originalIncident.children.push(savedCommentIncident._id);

    // Save the updated original incident to the database
    await originalIncident.save();

    revalidatePath(path);
  } catch (err) {
    console.error("Error while adding comment:", err);
    throw new Error("Unable to add comment");
  }
}
