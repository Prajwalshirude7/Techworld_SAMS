import {
  GraduationCap,
  CalendarCheck,
  CreditCard,
  ShoppingBag,
  Trophy,
  User,
} from "lucide-react";

import QuickActionCard from "./QuickActionCard";

export default function QuickActions() {
  return (
    <div>

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-white">
          Quick Actions
        </h2>

        <button className="text-teal-400 hover:text-teal-300">
          View All
        </button>

      </div>

      <div className="grid grid-cols-2 gap-5">

        <QuickActionCard
          title="Admission"
          subtitle="View admission details"
          icon={<GraduationCap className="text-teal-400" />}
        />

        <QuickActionCard
          title="Attendance"
          subtitle="Today's attendance"
          icon={<CalendarCheck className="text-cyan-400" />}
        />

        <QuickActionCard
          title="Fees"
          subtitle="Pay pending fees"
          icon={<CreditCard className="text-green-400" />}
        />

        <QuickActionCard
          title="Store"
          subtitle="Buy academy products"
          icon={<ShoppingBag className="text-orange-400" />}
        />

        <QuickActionCard
          title="Events"
          subtitle="Upcoming competitions"
          icon={<Trophy className="text-yellow-400" />}
        />

        <QuickActionCard
          title="Profile"
          subtitle="Manage profile"
          icon={<User className="text-purple-400" />}
        />

      </div>

    </div>
  );
}