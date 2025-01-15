'use client';

import { useState } from 'react';

const PostForm = ({ onPostSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      setImage(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!title || !content) {
      alert('Title and content are required!');
      return;
    }

    const newPost = {
      id: Date.now(),
      title,
      content,
      likes: 0,
      comments: 0,
      image: imagePreview || '', // Use preview URL for now
      date: new Date().toISOString(),
    };

    console.log('Submitting Post:', newPost);

    // Call the parent function to handle the new post
    onPostSubmit(newPost);

    // Reset the form
    setTitle('');
    setContent('');
    setImage(null);
    setImagePreview(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 shadow-lg rounded-lg">
      {/* Title */}
      <div>
        <label className="block font-semibold mb-2">Title</label>
        <input
          type="text"
          className="w-full border rounded-lg p-2"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Content */}
      <div>
        <label className="block font-semibold mb-2">Content</label>
        <textarea
          className="w-full border rounded-lg p-2"
          placeholder="Write your post content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="5"
          required
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block font-semibold mb-2">Upload Image (Optional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block"
        />
        {imagePreview && (
          <div className="mt-4">
            <p className="text-sm text-gray-500">Image Preview:</p>
            <img
              src={imagePreview}
              alt="Post Preview"
              className="mt-2 w-full max-h-64 object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Submit Post
        </button>
      </div>
    </form>
  );
};

export default PostForm;
