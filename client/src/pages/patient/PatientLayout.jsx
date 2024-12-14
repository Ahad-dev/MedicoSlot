import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Sidebar } from '@/components/common';
import { PatientSideBarLinks } from '@/lib/SideBar';
import { useAuthentication } from '@/context/AuthenticationContext';
import { LoaderComponent } from '@/components/common/Loader';
import { Toaster } from "@/components/ui/sonner"


const PatientLayout = () => {
  const {loading} = useAuthentication()

  if (loading) {
    return <LoaderComponent></LoaderComponent>
  }
  return (
      <div>
        <Navbar />
        <div className="flex overflow-hidden">
          {/* Sidebar with sticky positioning */}
          <Sidebar
            links={PatientSideBarLinks}
          />
          <main className="space-y-4 m-10 flex flex-col w-[100%]">
            <Toaster />
            <Outlet />
          </main>
        </div>
      </div>
  );
};

export default PatientLayout;
