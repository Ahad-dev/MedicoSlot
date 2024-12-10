import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Sidebar } from '@/components/common';
import { PatientSideBarLinks } from '@/lib/SideBar';

const PatientLayout = () => {
  return (
      <div>
        <Navbar />
        <div className="flex overflow-hidden">
          {/* Sidebar with sticky positioning */}
          <Sidebar
            links={PatientSideBarLinks}
          />
          <main className="space-y-4 m-10 flex flex-col w-[100%]">
            <Outlet />
          </main>
        </div>
      </div>
  );
};

export default PatientLayout;
