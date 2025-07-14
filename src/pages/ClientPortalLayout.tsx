
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import ClientSidebar from '@/components/client/ClientSidebar';

const ClientPortalLayout = () => {
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
      <div className="min-h-screen flex w-full" style={{ '--sidebar-width': sidebarWidth } as React.CSSProperties}>
        <ClientSidebar onWidthChange={setSidebarWidth}/>
        <main className="flex-1 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ClientPortalLayout;
