import Image from "next/image";
import Link from "next/link";

import { formatDateString } from "@/lib/utils";
import DeleteThread from "../forms/DeleteThread";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  title: string;
  image: string;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}

function ThreadCard({
  id,
  currentUserId,
  parentId,
  title,
  image,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
}: Props) {
  return (
    <article
      className={`flex flex-col rounded-lg bg-dark-2 p-6 w-full max-w-3xl mx-auto mb-6`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 gap-4">
          {/* Author Info */}
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="author_image"
                fill
                className="cursor-pointer rounded-full object-cover"
              />
            </Link>
            <div className="thread-card_bar" />
          </div>

          {/* Post Content */}
          <div className="flex flex-col w-full">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h4>
            </Link>

            {/* Display thread title */}
            <h3 className="mt-2 text-xl font-semibold text-light-1">{title}</h3>

            {/* Display thread content */}
            <p className="mt-2 text-sm text-light-2">{content}</p>

            {/* Conditionally render the image */}
            {image && (
              <div className="mt-4">
                <Image
                  src={image}
                  alt="Thread Image"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
            )}

            <div className="mt-4 flex items-center justify-between">
              <div className="flex gap-3.5">
                <Image
                  src="/assets/heart-gray.svg"
                  alt="like"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Link href={`/thread/${id}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="reply"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>
                <Image
                  src="/assets/repost.svg"
                  alt="repost"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Image
                  src="/assets/share.svg"
                  alt="share"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
              </div>

              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="text-sm text-gray-1">
                    {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Delete Button */}
        <DeleteThread
          threadId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        />
      </div>

      {/* Comment preview */}
      {!isComment && comments.length > 0 && (
        <div className="mt-3 flex items-center gap-2">
          {comments.slice(0, 2).map((comment, index) => (
            <Image
              key={index}
              src={comment.author.image}
              alt={`commenter_${index}`}
              width={24}
              height={24}
              className={`rounded-full object-cover ${index !== 0 ? "-ml-5" : ""}`}
            />
          ))}

          <Link href={`/thread/${id}`}>
            <p className="mt-1 text-sm text-gray-1">
              {comments.length} repl{comments.length > 1 ? "ies" : "y"}
            </p>
          </Link>
        </div>
      )}

      {/* Community Info */}
      {!isComment && community && (
        <Link href={`/communities/${community.id}`} className="mt-5 flex items-center">
          <p className="text-sm text-gray-1">
            {formatDateString(createdAt)}
            {community && ` - ${community.name} Community`}
          </p>

          <Image
            src={community.image}
            alt={community.name}
            width={14}
            height={14}
            className="ml-2 rounded-full object-cover"
          />
        </Link>
      )}
    </article>
  );
}

export default ThreadCard;
