import {
  ClipboardCheck,
  CreditCard,
  CalendarCheck,
  Wallet,
} from "lucide-react";

import StatusCard from "./StatusCard";

export default function DashboardStats() {
  return (
    <section className="grid gap-6 mt-8 md:grid-cols-2 xl:grid-cols-4">

      <StatusCard
        icon={ClipboardCheck}
        title="Admission"
        value="Pending"
        description="Application Under Review"
        buttonText="View Details"
        color="bg-emerald-500"
      />

      <StatusCard
        icon={CreditCard}
        title="Membership"
        value="Not Enrolled"
        description="Join Membership"
        buttonText="Explore Plans"
        color="bg-purple-500"
      />

      <StatusCard
        icon={CalendarCheck}
        title="Attendance"
        value="85%"
        description="17 / 20 Classes"
        buttonText="View Attendance"
        color="bg-blue-500"
      />

      <StatusCard
        icon={Wallet}
        title="Fees"
        value="₹0"
        description="No Pending Dues"
        buttonText="Payment History"
        color="bg-orange-500"
      />

    </section>
  );
}