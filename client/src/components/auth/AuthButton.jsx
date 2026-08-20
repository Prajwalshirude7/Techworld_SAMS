import { motion } from "framer-motion";

export default function AuthButton({
  children,
  type = "button",
}) {
  return (
    <motion.button
      type={type}
      whileHover={{
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.97,
      }}
      className="
      w-full
      py-3
      rounded-xl
      font-semibold
      text-white
      bg-gradient-to-r
      from-teal-500
      to-cyan-500
      hover:shadow-lg
      hover:shadow-teal-500/40
      transition-all
      "
    >
      {children}
    </motion.button>
  );
}