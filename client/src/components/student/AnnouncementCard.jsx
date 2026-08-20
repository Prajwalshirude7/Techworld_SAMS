import { motion } from "framer-motion";

export default function AnnouncementCard({
  title,
  date,
}) {
  return (
    <motion.div
      whileHover={{ x: 6 }}
      className="border-l-4 border-teal-400 bg-[#102235] rounded-xl p-4"
    >
      <h3 className="text-white font-semibold">
        {title}
      </h3>

      <p className="text-slate-400 text-sm mt-2">
        {date}
      </p>
    </motion.div>
  );
}