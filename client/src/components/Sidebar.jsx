import React, { useState, useContext, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Link, Outlet } from "react-router-dom";
import {
  ChevronLast,
  ChevronFirst,
  LifeBuoy,
  Receipt,
  Boxes,
  Users,
  LayoutDashboard,
  SidebarIcon,
  UserPlus,
  Stethoscope,
} from "lucide-react";

const SidebarContext = createContext();
const deleteCookies = new Cookies();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const openSidebar = () => {
    setExpanded(true);
  };

  const navigate = useNavigate();

  const Logout = async () => {
    try {
      await axios.delete("http://localhost:5000/api/v1/logout/");
      deleteCookies.remove("refreshToken");
      console.log(document.cookie);

      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
      navigate("/");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <aside className={`h-screen ${expanded ? "w-64" : "w-16"}`}>
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <img
              src="https://gallery.sentramedikahospitals.com/storage/hospital_profile/hospital_sentra_cikarang/RSSM%20CIKARANG-2%20copy.png"
              className={`overflow-hidden transition-all ${
                expanded ? "w-32" : "w-0"
              }`}
              alt=""
            />
            <button
              onClick={toggleSidebar}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">
              <Link to="/dashboard" style={{ textDecoration: "none" }}>
                <SidebarItem
                  icon={<LayoutDashboard size={20} />}
                  text="Dashboard"
                  alert
                  openSidebar={openSidebar}
                />
              </Link>
              <SidebarItem icon={<Boxes size={20} />} text="Queue" />
              <Link to="lists" style={{ textDecoration: "none" }}>
                <SidebarItem icon={<Users size={20} />} text="Patient List" />
              </Link>
              <Link to="register" style={{ textDecoration: "none" }}>
                <SidebarItem
                  icon={<UserPlus size={20} />}
                  text="Patient Register"
                />
              </Link>
              <SidebarItem
                icon={<Stethoscope size={20} />}
                text="Medical Check Up "
              />
              <SidebarItem icon={<Receipt size={20} />} text="Report" />
              <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
              <button onClick={Logout}>
                <SidebarItem
                  icon={<SidebarIcon size={20} />}
                  text="Logout"
                  onClick={Logout}
                />
              </button>
            </ul>
          </SidebarContext.Provider>

          <div className="border-t flex p-3">
            <div
              className={`
                flex justify-between items-center
                overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
              `}
            ></div>
          </div>
        </nav>
      </aside>
      <Outlet />
    </div>
  );
}

export function SidebarItem({ icon, text, active, alert, openSidebar }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
      `}
    >
      {icon}
      {expanded && <span className="ml-3">{text}</span>}
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}
      {!expanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-indigo-100 text-indigo-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
