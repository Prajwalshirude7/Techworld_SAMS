import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function WelcomeBanner() {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-700 p-6 md:p-8 lg:p-10"
    >
      {/* Background Glow */}
      <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-cyan-300/10 blur-3xl"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">

        {/* Left Content */}
        <div className="max-w-2xl">

          <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm text-white">
            Student Portal
          </span>

          <h1 className="mt-5 text-3xl md:text-5xl font-bold text-white leading-tight">
            Welcome Student 👋
          </h1>

          <p className="mt-5 text-cyan-50 text-base md:text-lg leading-8">
            Welcome to the Skating Academy Management System.
            Complete your admission process to unlock memberships,
            events, attendance, and all academy services.
          </p>

          <button
            onClick={() => navigate("/student/admission")}
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3 font-semibold text-teal-700 transition duration-300 hover:scale-105"
          >
            Apply for Admission
            <ArrowRight size={18} />
          </button>

        </div>

        {/* Right Side */}
        <div className="w-full max-w-sm">

          <img
            src="/src/assets/images/student-banner.png"
            alt="Student Banner"
            className="w-full"
          />

        </div>

      </div>
    </motion.section>
  );
}