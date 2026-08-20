import { motion } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";

export default function EventCard({
  title,
  date,
  location,
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      className="bg-[#102235] border border-slate-700 rounded-2xl p-5"
    >
      <h3 className="text-white font-semibold text-lg">
        {title}
      </h3>

      <div className="flex items-center gap-2 mt-4 text-slate-300">
        <CalendarDays size={18} />
        <span>{date}</span>
      </div>

      <div className="flex items-center gap-2 mt-2 text-slate-300">
        <MapPin size={18} />
        <span>{location}</span>
      </div>
    </motion.div>
  );
}