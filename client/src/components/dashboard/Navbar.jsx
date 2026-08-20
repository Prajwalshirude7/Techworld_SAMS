import { Bell, Search, Settings, UserCircle } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-20 bg-[#102235] border-b border-teal-500/10 px-8 flex items-center justify-between">

      {/* Left Side */}
      <div className="flex items-center gap-5">

        <h2 className="text-2xl font-bold text-white">
          Dashboard
        </h2>

        <div className="relative hidden md:block">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-80 bg-[#08131E] border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-400"
          />

        </div>

      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">

        <button className="relative p-3 rounded-xl bg-[#17314B] hover:bg-teal-500 transition-all">

          <Bell size={20} className="text-white" />

          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            3
          </span>

        </button>

        <button className="p-3 rounded-xl bg-[#17314B] hover:bg-teal-500 transition-all">
          <Settings size={20} className="text-white" />
        </button>

        <div className="flex items-center gap-3 bg-[#17314B] rounded-xl px-4 py-2">

          <UserCircle
            size={40}
            className="text-teal-400"
          />

          <div className="hidden md:block">
            <h4 className="text-white font-semibold">
              Admin
            </h4>

            <p className="text-slate-400 text-sm">
              Administrator
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}