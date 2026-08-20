import { motion } from "framer-motion";

export default function AttendanceProgress() {
  const percentage = 92;

  return (
    <div className="bg-[#102235] rounded-3xl border border-slate-700 p-8">
      <h2 className="text-2xl font-bold text-white">
        Attendance Progress
      </h2>

      <div className="mt-10 flex justify-center">
        <div className="relative w-44 h-44">

          <svg
            className="rotate-[-90deg]"
            width="176"
            height="176"
          >
            <circle
              cx="88"
              cy="88"
              r="70"
              stroke="#1e293b"
              strokeWidth="14"
              fill="none"
            />

            <motion.circle
              cx="88"
              cy="88"
              r="70"
              stroke="#14b8a6"
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: percentage / 100 }}
              transition={{ duration: 2 }}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-4xl font-bold text-white">
              {percentage}%
            </h2>

            <p className="text-slate-400">
              Attendance
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}