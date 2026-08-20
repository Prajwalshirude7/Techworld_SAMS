import AnnouncementCard from "./AnnouncementCard";

export default function Announcements() {
  return (
    <div>

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-white">
          Announcements
        </h2>

        <button className="text-teal-400">
          View All
        </button>

      </div>

      <div className="space-y-4">

        <AnnouncementCard
          title="District Championship Registration Started"
          date="Today"
        />

        <AnnouncementCard
          title="August Training Schedule Updated"
          date="Yesterday"
        />

        <AnnouncementCard
          title="Fee Payment Due on 10 August"
          date="2 Days Ago"
        />

      </div>

    </div>
  );
}