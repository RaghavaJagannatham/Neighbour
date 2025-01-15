'use client';

import Sidebar from './Sidebar'; // Sidebar component
import CenterContent from './CentreComponent'; // CenterContent component
import { useState } from 'react'; // For managing state
import RightSidebar from './RightSideBar';

const Dashboard = () => {
  const userName = 'John Doe'; // Change dynamically based on logged-in user

  return (
    <div className="min-h-screen bg-gray-100">

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Center Content */}
        <section className="col-span-8">
          <CenterContent />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
