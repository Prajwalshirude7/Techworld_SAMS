import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

import AuthCard from "../../components/auth/AuthCard";
import AuthButton from "../../components/auth/AuthButton";
import AuthInput from "../../components/auth/AuthInput";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen bg-[#08131E] flex items-center justify-center px-6">
      <AuthCard>
        <div className="bg-[#102235] rounded-3xl p-10 border border-teal-500/20 shadow-2xl">
          <h2 className="text-3xl font-bold text-center text-white">
            Forgot Password
          </h2>

          <p className="text-center text-slate-400 mt-2 mb-8">
            Enter your registered email.
          </p>

          <div className="space-y-5">
            <AuthInput
              icon={Mail}
              type="email"
              placeholder="Email Address"
            />

            <AuthButton>
              Send OTP
            </AuthButton>

            <p className="text-center">
              <Link
                to="/login"
                className="text-teal-400 hover:text-teal-300"
              >
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </AuthCard>
    </div>
  );
}