import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Sidebar, Sidebar2 } from '@/components/common';
import { DoctorSideBarLinks } from '@/lib/SideBar';
import { useAuthentication } from '@/context/AuthenticationContext';
import { LoaderComponent } from '@/components/common/Loader';
import { Toaster } from "@/components/ui/sonner"


const DoctorLayout = () => {
  const {loading} = useAuthentication()

  if (loading) {
    return <LoaderComponent></LoaderComponent>
  }
  return (
      <div>
        <Navbar />
        <div className="flex overflow-hidden">
          {/* Sidebar with sticky positioning */}
          <Sidebar2
            links={DoctorSideBarLinks}
          />
          <main className="space-y-4 m-10 flex flex-col w-[100%]">
            <Toaster />
            <Outlet />
          </main>
        </div>
      </div>
  );
};

export default DoctorLayout;
