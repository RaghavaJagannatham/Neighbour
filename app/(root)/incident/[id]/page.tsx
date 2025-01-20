import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import Comment from "@/components/forms/CommentIncident";
// import incidentCard from "@/components/cards/incidentCard";
import IncidentCard from "@/components/cards/IncidentCard";

import { fetchUser } from "@/lib/actions/user.actions";
import { fetchIncidentdById } from "@/lib/actions/incident.actions";
// import { fetchincidentById } from "@/lib/actions/incident.actions";


export const revalidate = 0;

async function page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

//   const incident = await fetchIncidentById(params.id);
    const incident = await fetchIncidentdById(params.id)

  return (
    <section className='relative'>
      <div>
        <IncidentCard
          id={incident._id}
          currentUserId={user.id}
          parentId={incident.parentId}
          content={incident.text}
          author={incident.author}
          community={incident.community}
          createdAt={incident.createdAt}
          comments={incident.children}
        />
      </div>

      <div className='mt-7'>
        <Comment
          incidentId={params.id}
          currentUserImg={user.imageUrl}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      <div className='mt-10'>
        {incident.children.map((childItem: any) => (
          <IncidentCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={user.id}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            isComment
          />
        ))}
      </div>
    </section>
  );
}

export default page;
