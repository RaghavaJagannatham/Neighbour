'use client';

const RightSidebar = () => {
  return (
    <aside className="space-y-6">
      <div className="bg-white p-4 shadow-lg rounded-lg">
        <h3 className="text-lg font-semibold">Own a Local Business?</h3>
        <p className="text-sm text-gray-600 mb-4">
          Create a business page to connect with neighbors, post updates in the feed, and gain new customers.
        </p>
        <button className="text-blue-500 hover:text-blue-700">Create Page</button>
      </div>
      <div className="bg-white p-4 shadow-lg rounded-lg">
        <h3 className="text-lg font-semibold">Sponsored</h3>
        <p className="text-sm text-gray-600">Ready to sweat? Dive into fitness classes at your neighborhood gym.</p>
        <button className="text-blue-500 hover:text-blue-700 mt-2">Sign Up</button>
      </div>
    </aside>
  );
};

export default RightSidebar;
