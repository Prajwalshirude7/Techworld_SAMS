import {
  GraduationCap,
  CreditCard,
  CalendarCheck,
  Wallet,
} from "lucide-react";

import StatCard from "./StatCard";

export default function DashboardStats() {
  return (
    <section className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mt-8">

      <StatCard
        title="Admission"
        value="Approved"
        subtitle="✓ Verified"
        color="text-green-400"
        icon={<GraduationCap className="text-green-400" />}
      />

      <StatCard
        title="Membership"
        value="Active"
        subtitle="Premium Plan"
        color="text-cyan-400"
        icon={<CreditCard className="text-cyan-400" />}
      />

      <StatCard
        title="Attendance"
        value="92%"
        subtitle="Excellent"
        color="text-yellow-400"
        icon={<CalendarCheck className="text-yellow-400" />}
      />

      <StatCard
        title="Fees"
        value="Paid"
        subtitle="No Due"
        color="text-emerald-400"
        icon={<Wallet className="text-emerald-400" />}
      />

    </section>
  );
}