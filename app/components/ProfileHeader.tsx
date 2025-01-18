import { useState } from 'react';

const ProfileHeader = ({ user, onSave }) => {
  const [name, setName] = useState(user.name || '');
  const [bio, setBio] = useState(user.bio || '');
  const [profileImage, setProfileImage] = useState(user.profileImage || null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result); // Set the image preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave({ name, bio, profileImage });
  };

  return (
    <div className="p-4 border-b">
      <div className="flex flex-col items-center space-y-4">
        {/* Profile Image */}
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}

        {/* Upload Image */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="text-sm text-gray-500"
        />

        {/* Editable Fields */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            rows={3}
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
