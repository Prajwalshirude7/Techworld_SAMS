import { CreditCard, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function MembershipCard() {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-[#102235] rounded-3xl p-6 border border-slate-700 shadow-lg"
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-slate-400">
            Membership Status
          </p>

          <h2 className="text-2xl font-bold text-red-400 mt-2">
            Not Enrolled
          </h2>

          <p className="text-slate-400 mt-3">
            Join a membership plan after your admission is approved.
          </p>

        </div>

        <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
          <CreditCard
            size={32}
            className="text-cyan-400"
          />
        </div>

      </div>

      <button
        onClick={() => navigate("/student/membership")}
        className="mt-6 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold"
      >
        View Membership Plans

        <ArrowRight size={18} />
      </button>

    </motion.div>
  );
}