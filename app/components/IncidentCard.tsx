'use client';

import React from 'react';

interface IncidentCardProps {
  id: string;
  title: string;
  description: string;
  image?: string;
  profilePicture: string;
  name: string;
  timeCreated: string;
  upvotes: number;
  comments?: number;
  status: string; // Status of the incident (e.g., "Raised", "Resolved", "In Progress")
  tags?: string[];
  onUpvote: (id: string) => void;
  onComment: (id: string) => void;
}

const IncidentCard: React.FC<IncidentCardProps> = ({
  id,
  title,
  description,
  image,
  profilePicture,
  name,
  timeCreated,
  upvotes,
  comments = 0,
  status,
  tags = [],
  onUpvote,
  onComment,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      {/* Header */}
      <div className="flex items-center mb-4">
        <img
          src={profilePicture}
          alt={name}
          className="w-10 h-10 rounded-full mr-4"
        />
        <div>
          <h3 className="font-bold">{name}</h3>
          <p className="text-sm text-gray-500">{timeCreated}</p>
        </div>
      </div>

      {/* Content */}
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-700 mb-4">{description}</p>

      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Status */}
      <p
        className={`text-sm font-semibold mb-2 ${
          status === 'Resolved'
            ? 'text-green-500'
            : status === 'In Progress'
            ? 'text-yellow-500'
            : 'text-red-500'
        }`}
      >
        Status: {status}
      </p>

      {/* Actions */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => onUpvote(id)}
          className="flex items-center text-blue-600 hover:underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 10V5a2 2 0 00-4 0v5m0 0a2 2 0 01-4 0m4 0v9a2 2 0 004 0v-9m0 0a2 2 0 004 0"
            />
          </svg>
          Upvote ({upvotes})
        </button>

        <button
          onClick={() => onComment(id)}
          className="flex items-center text-blue-600 hover:underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 8h10M7 12h5m1 8a8.001 8.001 0 01-7.75-5.75A8 8 0 0112 3a8 8 0 018 8 8 8 0 01-8 8z"
            />
          </svg>
          Comment ({comments})
        </button>
      </div>
    </div>
  );
};

export default IncidentCard;
