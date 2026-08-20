import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function StatusCard({
  icon: Icon,
  title,
  value,
  description,
  color,
  buttonText,
}) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="bg-[#102235] rounded-3xl p-6 border border-slate-700 hover:border-teal-500 shadow-lg"
    >
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color}`}
      >
        <Icon size={28} className="text-white" />
      </div>

      <h3 className="text-slate-400 mt-6 text-sm">
        {title}
      </h3>

      <h2 className="text-3xl font-bold text-white mt-2">
        {value}
      </h2>

      <p className="text-slate-400 mt-2">
        {description}
      </p>

      <button className="mt-6 flex items-center gap-2 text-teal-400 hover:text-white transition">
        {buttonText}
        <ArrowRight size={16} />
      </button>
    </motion.div>
  );
}