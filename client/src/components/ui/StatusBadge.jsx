export default function StatusBadge({
  status = "pending",
  children,
}) {
  const variants = {
    success:
      "bg-green-500/20 text-green-400 border-green-500/30",

    warning:
      "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",

    danger:
      "bg-red-500/20 text-red-400 border-red-500/30",

    info:
      "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",

    pending:
      "bg-orange-500/20 text-orange-400 border-orange-500/30",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        border
        px-4
        py-1
        text-sm
        font-semibold
        ${variants[status]}
      `}
    >
      {children}
    </span>
  );
}