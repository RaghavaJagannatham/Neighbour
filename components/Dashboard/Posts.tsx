// Posts.js
import { posts, incidents } from './data'; // Adjust path as needed
import { format } from 'date-fns';

const Posts = ({ filter }) => {
  // Filter data based on the selected filter
  const filteredPosts = filter === 'all' 
    ? [...posts, ...incidents] 
    : filter === 'posts'
    ? posts
    : filter === 'incidents'
    ? incidents
    : filter === 'trending'
    ? posts.filter(post => post.likes > 20) // Example filter for trending posts
    : [];

  return (
    <div className="space-y-6">
      {filteredPosts.map((post) => (
        <div
          key={post.id}
          className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-[580px] max-h-[740px] mx-auto overflow-hidden"
        >
          {/* Post Header: User Name & Date */}
          <div className="flex items-center space-x-4">
            <img
              src={post.user?.avatar || '/default-avatar.jpg'}
              alt={post.user?.name || 'Anonymous'}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold">
                {post.user?.name || 'Anonymous'}
              </h3>
              <p className="text-sm text-gray-500">
                {format(new Date(post.date), 'MMMM dd, yyyy, h:mm a')}
              </p>
            </div>
          </div>

          {/* Post Title */}
          <h4 className="text-xl font-semibold">{post.title}</h4>

          {/* Post Content */}
          <p className="text-gray-600">{post.description || post.content}</p>

          {/* Post Image */}
          {post.image ? (
            <div className="mt-4">
              <div className="relative w-full h-[400px] overflow-hidden rounded-lg bg-gray-200">
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          ) : (
            <div className="h-20 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">No Image Available</span>
            </div>
          )}

          {/* Post Footer: Interactions */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <button className="flex items-center space-x-1 hover:text-gray-700 transition-colors">
                <span>👍</span> <span>Like ({post.likes})</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-gray-700 transition-colors">
                <span>💬</span> <span>Comment ({post.comments})</span>
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
          <div className="mt-4">
            <input
              type="text"
              placeholder="Write a comment..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
