import { motion } from "framer-motion";

export default function AuthInput({
  icon: Icon,
  type = "text",
  placeholder,
  ...props
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.01,
      }}
      className="relative"
    >
      {Icon && (
        <Icon
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-400"
        />
      )}

      <input
        type={type}
        placeholder={placeholder}
        {...props}
        className="
        w-full
        bg-[#08131E]
        border
        border-slate-700
        rounded-xl
        py-3
        pl-12
        pr-4
        text-white
        placeholder:text-slate-400
        outline-none
        transition-all
        focus:border-teal-400
        focus:ring-2
        focus:ring-teal-400/30
        "
      />
    </motion.div>
  );
}