import { motion } from "framer-motion";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  type = "button",
  onClick,
  icon,
}) {
  const baseStyle =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 focus:outline-none";

  const variants = {
    primary:
      "bg-teal-500 hover:bg-teal-600 text-white shadow-lg",

    secondary:
      "bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg",

    outline:
      "border border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-white",

    danger:
      "bg-red-500 hover:bg-red-600 text-white",

    success:
      "bg-green-500 hover:bg-green-600 text-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",

    md: "px-6 py-3 text-base",

    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyle}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {icon && icon}

      {children}
    </motion.button>
  );
}