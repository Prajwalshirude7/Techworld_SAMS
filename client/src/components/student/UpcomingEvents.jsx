import EventCard from "./EventCard";

export default function UpcomingEvents() {
  return (
    <div>

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-white">
          Upcoming Events
        </h2>

        <button className="text-teal-400">
          View All
        </button>

      </div>

      <div className="space-y-5">

        <EventCard
          title="District Skating Championship"
          date="12 August 2026"
          location="Balewadi Stadium"
        />

        <EventCard
          title="Speed Skating Practice"
          date="18 August 2026"
          location="Academy Ground"
        />

        <EventCard
          title="Parents Meeting"
          date="25 August 2026"
          location="Main Hall"
        />

      </div>

    </div>
  );
}