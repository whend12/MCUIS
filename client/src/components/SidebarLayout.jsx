import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Sidebar, { SidebarItem } from "./Sidebar.jsx";
import {
  LifeBuoy,
  Receipt,
  Boxes,
  Users,
  SidebarIcon,
  LayoutDashboard,
} from "lucide-react";

const SidebarLayout = () => {
  const [expanded, setExpanded] = useState(true);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const openSidebar = () => {
    setExpanded(true);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar expanded={expanded} toggleSidebar={toggleSidebar}>
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            text="Dashboard"
            alert
            openSidebar={openSidebar}
          />
        </Link>
        <SidebarItem icon={<Boxes size={20} />} text="Queue" />
        <Link to="/patient/list" style={{ textDecoration: "none" }}>
          <SidebarItem icon={<Users size={20} />} text="Patient" />
        </Link>
        <SidebarItem icon={<Receipt size={20} />} text="Report" />
        <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
        <SidebarItem icon={<SidebarIcon size={20} />} text="Logout" />
      </Sidebar>
      <Outlet />
    </div>
  );
};

export default SidebarLayout;
