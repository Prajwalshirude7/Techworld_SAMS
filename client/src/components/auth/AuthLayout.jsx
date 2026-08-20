import { motion } from "framer-motion";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-[#08131E] relative overflow-hidden flex items-center justify-center px-6">

      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-teal-500/20 rounded-full blur-3xl -top-24 -left-24"></div>
      <div className="absolute w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl bottom-0 right-0"></div>

      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex flex-col justify-center"
        >
          <h1 className="text-5xl font-extrabold text-white leading-tight">
            Skating Academy
            <br />
            <span className="text-teal-400">
              Management System
            </span>
          </h1>

          <p className="text-slate-300 mt-6 text-lg leading-8">
            Train with experienced coaches, improve your skating skills,
            manage registrations, and become part of a championship academy.
          </p>

          {/* Feature List */}
          <div className="mt-10 space-y-4">

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-teal-400"></div>
              <p className="text-slate-200">
                Professional Coaching
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-teal-400"></div>
              <p className="text-slate-200">
                Championship Training
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-teal-400"></div>
              <p className="text-slate-200">
                Secure Academy Management
              </p>
            </div>

          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {children}
        </motion.div>

      </div>
    </div>
  );
}