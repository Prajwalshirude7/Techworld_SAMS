import { Bell, Search } from "lucide-react";

export default function PageHeader({
  title,
  subtitle,
  user = "Student",
}) {
  return (
    <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">

      {/* Left */}
      <div>

        <h1 className="text-3xl font-bold text-white">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2 text-slate-400">
            {subtitle}
          </p>
        )}

      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <div className="hidden md:flex items-center bg-[#102235] border border-slate-700 rounded-xl px-4 py-3 w-72">

          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            placeholder="Search..."
            className="ml-3 bg-transparent outline-none text-white w-full placeholder:text-slate-500"
          />

        </div>

        {/* Notification */}

        <button className="w-12 h-12 rounded-xl bg-[#102235] border border-slate-700 flex items-center justify-center hover:border-teal-500 transition">

          <Bell
            size={20}
            className="text-white"
          />

        </button>

        {/* User */}

        <div className="flex items-center gap-3 bg-[#102235] border border-slate-700 rounded-xl px-4 py-2">

          <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold">

            S

          </div>

          <div>

            <p className="text-white font-semibold">
              {user}
            </p>

            <p className="text-xs text-slate-400">
              Student Portal
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}