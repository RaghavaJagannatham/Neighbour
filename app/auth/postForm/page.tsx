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
      const previewUrl = URL.createObjectURL(file);
      setImage(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert('Title and content are required!');
      return;
    }

    const postData = {
      title,
      content,
      image: imagePreview || '', // Add the image URL or placeholder
    };

    try {
      const res = await fetch('/api/auth/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      const data = await res.json();
      if (res.ok) {
        onPostSubmit(data); // Call the parent function to handle the new post
        setTitle('');
        setContent('');
        setImage(null);
        setImagePreview(null);
      } else {
        alert(data.error || 'Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 shadow-lg rounded-lg">
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
