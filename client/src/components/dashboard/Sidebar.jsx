import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCog,
  CalendarCheck,
  CreditCard,
  Layers,
  Trophy,
  FileBarChart,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    path: "/dashboard",
  },
  {
    name: "Students",
    icon: <Users size={20} />,
    path: "/students",
  },
  {
    name: "Coaches",
    icon: <UserCog size={20} />,
    path: "/coaches",
  },
  {
    name: "Attendance",
    icon: <CalendarCheck size={20} />,
    path: "/attendance",
  },
  {
    name: "Fees",
    icon: <CreditCard size={20} />,
    path: "/fees",
  },
  {
    name: "Batches",
    icon: <Layers size={20} />,
    path: "/batches",
  },
  {
    name: "Competitions",
    icon: <Trophy size={20} />,
    path: "/competitions",
  },
  {
    name: "Reports",
    icon: <FileBarChart size={20} />,
    path: "/reports",
  },
  {
    name: "Settings",
    icon: <Settings size={20} />,
    path: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 min-h-screen bg-[#102235] border-r border-teal-500/10 flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-teal-500/10">
        <h1 className="text-2xl font-bold text-white">
          🛼 SAMS
        </h1>
        <p className="text-sm text-teal-400">
          Skating Academy
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">

        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
              ${
                isActive
                  ? "bg-teal-500 text-white"
                  : "text-slate-300 hover:bg-[#17314B] hover:text-white"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}

      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-teal-500/10">
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500 hover:text-white transition-all">
          <LogOut size={20} />
          Logout
        </button>
      </div>

    </aside>
  );
}