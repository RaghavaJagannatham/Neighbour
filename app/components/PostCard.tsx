'use client';

import { useState } from 'react';
import { format } from 'date-fns';

const PostCard = ({ post }) => {
  const [likes, setLikes] = useState(post.likes || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleLike = async () => {
    const updatedLikes = likes + 1;
    setLikes(updatedLikes);

    // Update likes in the database (make sure your API supports this)
    await fetch(`/api/posts/${post._id}/like`, {
      method: 'POST',
      body: JSON.stringify({ likes: updatedLikes }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const handleCommentToggle = () => {
    setShowComments(!showComments);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === '') return;

    // Add the new comment locally
    const newCommentObj = {
      id: Date.now(), // Using timestamp as a temporary ID
      text: newComment,
      createdAt: new Date(),
    };
    setComments([newCommentObj, ...comments]);

    // Send the comment to the server
    await fetch(`/api/posts/${post._id}/comment`, {
      method: 'POST',
      body: JSON.stringify({ text: newComment }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setNewComment(''); // Clear the comment input
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto mb-6">
      {/* Post Header: User Name & Date */}
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={post.user.image || '/default-user.jpg'}
          alt={post.user.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {post.user.name || 'Anonymous'}
          </h3>
          <p className="text-sm text-gray-500">
            {format(new Date(post.createdAt), 'MMMM dd, yyyy, h:mm a')}
          </p>
        </div>
      </div>

      {/* Post Title */}
      <h4 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h4>

      {/* Post Content */}
      <p className="text-gray-600 mb-4">{post.description}</p>

      {/* Post Image */}
      {post.image ? (
        <div className="mb-4">
          <div className="relative w-full h-[400px] overflow-hidden rounded-lg bg-gray-200">
            <img
              src={post.image}
              alt={post.title}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      ) : null}

      {/* Post Footer: Interactions */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <button
            onClick={handleLike}
            className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
          >
            <span>👍</span>
            <span>Like ({likes})</span>
          </button>
          <button
            onClick={handleCommentToggle}
            className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
          >
            <span>💬</span>
            <span>Comment ({comments.length})</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-gray-700 transition-colors">
            <span>🔗</span> <span>Share</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-gray-700 transition-colors">
            <span>⬆️</span> <span>Upvote ({post.upvotes || 0})</span>
          </button>
        </div>
      </div>

      {/* Comment Input */}
      {showComments && (
        <div className="mt-4">
          <form onSubmit={handleCommentSubmit} className="mb-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a comment..."
            />
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Post Comment
            </button>
          </form>

          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="border-b pb-4">
                <p className="text-sm text-gray-800">{comment.text}</p>
                <p className="text-xs text-gray-400">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
