import { motion } from "framer-motion";

export default function AnimatedBorder({ children }) {
  return (
    <div className="relative rounded-3xl overflow-hidden">
      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{
          background:
            "linear-gradient(90deg,#14B8A6,#00D4C0,#14B8A6,#00D4C0)",
          backgroundSize: "300% 300%",
          padding: "2px",
        }}
        animate={{
          backgroundPosition: [
            "0% 50%",
            "100% 50%",
            "0% 50%",
          ],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="w-full h-full bg-[#102235] rounded-3xl">
          {children}
        </div>
      </motion.div>
    </div>
  );
}