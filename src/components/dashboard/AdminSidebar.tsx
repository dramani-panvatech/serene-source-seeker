
import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Calendar,
  Users,
  Settings,
  LayoutDashboard,
  UserCheck,
  Clock,
  Package,
  CreditCard,
  HelpCircle,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Gift,
  Database,
  MapPin,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

interface AdminSidebarProps {
  onWidthChange?: (width: string) => void;
}

const AdminSidebar = ({ onWidthChange }: AdminSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const homeItems = [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Customers', url: '/dashboard/customers', icon: Users },
    { title: 'Staff', url: '/dashboard/provider', icon: UserCheck },
    { title: 'Calendar', url: '/dashboard/calendar', icon: Calendar },
    { title: 'Services', url: '/dashboard/services', icon: Package },
    { title: 'Payment', url: '/dashboard/payment', icon: CreditCard },
    { title: 'Resource', url: '/dashboard/resource', icon: Database },
    { title: 'Location', url: '/dashboard/location', icon: MapPin },
    { title: 'Settings', url: '/dashboard/settings', icon: Settings },
    { title: 'Offering', url: '/dashboard/offering', icon: Gift },
    { title: 'Help', url: '/dashboard/help', icon: HelpCircle },
    { title: 'Profile', url: '/dashboard/profile', icon: User },
  ];

  const toggleSidebar = () => {
    setCollapsed((prev) => {
      const newCollapsed = !prev;
      const newWidth = newCollapsed ? '80px' : '250px';
      
      // Update CSS variable for sidebar width
      document.documentElement.style.setProperty('--sidebar-width', newWidth);
      
      // Notify parent component
      if (onWidthChange) {
        onWidthChange(newWidth);
      }
      
      return newCollapsed;
    });
  };

  const renderMenuItem = (item: any) => {
    const isActive = location.pathname === item.url;

    return (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton asChild>
          <NavLink
            to={item.url}
            className={`group flex items-center gap-3 rounded-lg transition-all duration-200 p-3 relative
              ${isActive
                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700'
              }
            `}
            title={collapsed ? item.title : undefined}
          >
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-lg
                ${isActive ? 'bg-blue-600 dark:bg-blue-400' : 'opacity-0 group-hover:opacity-100 transition-opacity'}
              `}
            />
            <item.icon
              className="h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            />
            {!collapsed && <span className="font-medium">{item.title}</span>}
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  const handleSignOut = () => {
    console.log('User signed out');
    navigate('/signin');
  };

  return (
    <Sidebar
      className="border-r bg-white dark:bg-gray-900 dark:border-gray-800 shadow-sm w-[--sidebar-width] transition-all duration-300 ease-in-out"
    >
      <SidebarHeader className="p-4 border-b dark:border-gray-800 relative">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
            <Clock className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Admin Panel</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Dashboard</p>
            </div>
          )}
        </div>

        {/* Toggle IconButton at top-right */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 p-1 rounded-md text-gray-600 dark:text-gray-300 bg-border dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          type="button" style={{ right: -13 }}
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </SidebarHeader>

      <SidebarContent className="px-2 py-6">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">{homeItems.map((item) => renderMenuItem(item))}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t dark:border-gray-800">
        <Button
          onClick={handleSignOut}
          variant="ghost"
          className={`w-full justify-start gap-3 p-3 rounded-lg transition-all duration-200
            text-gray-600 dark:text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-900
          `}
          title="Sign Out"
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="font-medium">Sign Out</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
