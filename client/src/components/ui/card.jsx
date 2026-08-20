import { motion } from "framer-motion";

export default function Card({
  children,
  className = "",
  hover = true,
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : {}}
      transition={{ duration: 0.2 }}
      className={`
        bg-[#102235]
        border
        border-slate-700
        rounded-3xl
        p-6
        shadow-lg
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}