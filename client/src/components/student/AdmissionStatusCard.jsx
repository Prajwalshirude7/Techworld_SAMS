import { FileText, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AdmissionStatusCard() {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-[#102235] rounded-3xl p-6 border border-slate-700 shadow-lg"
    >
      <div className="flex items-center justify-between">

        <div>
          <p className="text-slate-400">
            Admission Status
          </p>

          <h2 className="text-2xl font-bold text-yellow-400 mt-2">
            Not Applied
          </h2>

          <p className="text-slate-400 mt-3">
            Complete your admission to become an academy student.
          </p>
        </div>

        <div className="w-16 h-16 rounded-2xl bg-teal-500/20 flex items-center justify-center">
          <FileText size={32} className="text-teal-400" />
        </div>

      </div>

      <button
        onClick={() => navigate("/student/admission")}
        className="mt-6 flex items-center gap-2 text-teal-400 hover:text-teal-300 font-semibold"
      >
        Apply Now

        <ArrowRight size={18} />
      </button>

    </motion.div>
  );
}