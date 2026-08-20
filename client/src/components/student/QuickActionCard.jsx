import { motion } from "framer-motion";

export default function QuickActionCard({
  title,
  subtitle,
  icon,
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      className="bg-[#102235] border border-slate-700 rounded-2xl p-5 cursor-pointer transition-all"
    >
      <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center mb-4">
        {icon}
      </div>

      <h3 className="text-white font-semibold text-lg">
        {title}
      </h3>

      <p className="text-slate-400 mt-2 text-sm">
        {subtitle}
      </p>
    </motion.div>
  );
}