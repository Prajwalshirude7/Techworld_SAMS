import { motion } from "framer-motion";

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  color,
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{ duration: 0.25 }}
      className="rounded-3xl bg-[#102235] border border-slate-700 p-6 shadow-lg"
    >
      <div className="flex justify-between items-start">

        <div>

          <p className="text-slate-400 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-white mt-2">
            {value}
          </h2>

          <p className={`mt-3 font-medium ${color}`}>
            {subtitle}
          </p>

        </div>

        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{
            backgroundColor: "rgba(255,255,255,.05)",
          }}
        >
          {icon}
        </div>

      </div>
    </motion.div>
  );
}