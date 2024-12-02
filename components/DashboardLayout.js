'use client';

import Sidebar from './Sidebar';
import { useState } from 'react';

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <main 
        className={`flex-1 overflow-y-auto bg-gray-50 transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-16'
        } p-8`}
      >
        <div className="max-w-full">
          {children}
        </div>
      </main>
    </div>
  );
} 