'use client';

import { useState } from 'react';
import { format } from 'date-fns';

const IncidentCard = ({ incident }) => {
  const [comments, setComments] = useState(incident.comments || []);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

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
    await fetch(`/api/incidents/${incident._id}/comment`, {
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
      {/* Incident Header: User Name & Date */}
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={incident.user.image || '/default-user.jpg'}
          alt={incident.user.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {incident.user.name || 'Anonymous'}
          </h3>
          <p className="text-sm text-gray-500">
            {format(new Date(incident.createdAt), 'MMMM dd, yyyy, h:mm a')}
          </p>
        </div>
      </div>

      {/* Incident Title */}
      <h4 className="text-xl font-semibold text-gray-800 mb-2">{incident.title}</h4>

      {/* Incident Content */}
      <p className="text-gray-600 mb-4">{incident.description}</p>

      {/* Incident Image */}
      {incident.image && (
        <div className="mb-4">
          <div className="relative w-full h-[400px] overflow-hidden rounded-lg bg-gray-200">
            <img
              src={incident.image}
              alt={incident.title}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      )}

      {/* Incident Status */}
      <div className="mb-4">
        <span
          className={`px-4 py-2 text-white rounded-lg ${
            incident.status === 'Raised'
              ? 'bg-yellow-500'
              : incident.status === 'Resolved'
              ? 'bg-green-500'
              : 'bg-gray-500'
          }`}
        >
          {incident.status}
        </span>
      </div>

      {/* Incident Footer: Interactions */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm text-gray-500">
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

export default IncidentCard;
