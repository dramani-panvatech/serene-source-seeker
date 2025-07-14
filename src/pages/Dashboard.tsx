
import React, { useEffect, useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import DashboardContent from '../components/dashboard/DashboardContent';

const Dashboard = () => {
  const [sidebarWidth, setSidebarWidth] = useState('250px');

  // Listen for sidebar width changes
  useEffect(() => {
    const handleSidebarWidthChange = () => {
      const width = document.documentElement.style.getPropertyValue('--sidebar-width') || '250px';
      setSidebarWidth(width);
    };

    // Set up a MutationObserver to watch for style changes
    const observer = new MutationObserver(handleSidebarWidthChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <SidebarProvider>
      <div 
        className="min-h-screen flex w-full bg-gray-50" 
        style={{ '--sidebar-width': sidebarWidth } as React.CSSProperties}
      >
        <AdminSidebar onWidthChange={setSidebarWidth} />
        <main className="flex-1 transition-all duration-300 ease-in-out">
          <DashboardContent />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
