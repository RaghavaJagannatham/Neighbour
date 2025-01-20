import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchIncidents } from "@/lib/actions/incident.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import ThreadCard from "@/components/cards/ThreadCard";
import IncidentCard from "@/components/cards/IncidentCard";
import Pagination from "@/components/shared/Pagination";

async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const activeFilter = searchParams.filter || "Posts";
  const page = searchParams.page ? +searchParams.page : 1;
  const itemsPerPage = 30;

  // Fetch appropriate data based on filter
  const result =
    activeFilter === "Posts"
      ? await fetchPosts(page, itemsPerPage)
      : await fetchIncidents(page, itemsPerPage);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold">Home</h1>

      {/* Filter Buttons */}
      <div className="flex space-x-4 mt-4">
        <a
          href="/?filter=Posts"
          className={`px-4 py-2 rounded ${
            activeFilter === "Posts"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          Posts
        </a>
        <a
          href="/?filter=Incidents"
          className={`px-4 py-2 rounded ${
            activeFilter === "Incidents"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          Incidents
        </a>
      </div>

      {/* Content */}
      <section className="mt-8 space-y-6">
        {result.posts.length === 0 ? (
          <p className="text-gray-500 text-center">
            No {activeFilter.toLowerCase()} found
          </p>
        ) : (
          result.posts.map((post) =>
            activeFilter === "Posts" ? (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user.id}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ) : (
              <IncidentCard
                key={post._id}
                id={post._id}
                currentUserId={user.id}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            )
          )
        )}
      </section>

      {/* Pagination */}
      <Pagination
        path={`/?filter=${activeFilter}`}
        pageNumber={page}
        isNext={result.isNext}
      />
    </div>
  );
}

export default Home;
