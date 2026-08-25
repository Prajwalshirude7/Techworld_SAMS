import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import { motion } from "framer-motion";
import toast from "react-hot-toast";

import AuthCard from "../../components/auth/AuthCard";
import AuthButton from "../../components/auth/AuthButton";
import AuthInput from "../../components/auth/AuthInput";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5001/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      console.log("LOGIN RESPONSE:", data);

      if (!response.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      // Make sure token exists
      if (!data.token) {
        toast.error("Login successful but token was not received.");
        return;
      }

      // Store JWT token
      localStorage.setItem(
        "token",
        data.token
      );

      // Store login state
      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      // Store user role
      localStorage.setItem(
        "userRole",
        String(data.user.role_id)
      );

      // Store user ID
      localStorage.setItem(
        "userId",
        String(data.user.id)
      );

      // Store student name
      localStorage.setItem(
        "studentName",
        data.user.name
      );

      // Store user object
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      toast.success(
        `Welcome ${data.user.name}! Login successful!`
      );

      setTimeout(() => {

        // Super Admin
        if (Number(data.user.role_id) === 1) {
          navigate("/super-admin/dashboard");
        }
        // Branch Admin
        else if (Number(data.user.role_id) === 2) {
          navigate("/admin/dashboard");
        }
        // Student
        else if (Number(data.user.role_id) === 3) {
          navigate("/student/dashboard");
        }
        // Unknown role
        else {
          navigate("/");
        }

      }, 1000);

    } catch (error) {

      console.error("LOGIN ERROR:", error);

      toast.error(
        "Unable to connect to server. Please check backend."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-[#08131E]
        relative
        overflow-hidden
        flex
        items-center
        justify-center
        px-6
      "
    >

      {/* Glow */}

      <div
        className="
          absolute
          w-96
          h-96
          bg-teal-500/20
          rounded-full
          blur-[150px]
          -top-24
          -left-24
        "
      />

      <div
        className="
          absolute
          w-80
          h-80
          bg-cyan-500/20
          rounded-full
          blur-[150px]
          bottom-0
          right-0
        "
      />

      <div
        className="
          relative
          z-10
          w-full
          max-w-7xl
          grid
          lg:grid-cols-2
          gap-16
          items-center
        "
      >

        {/* LEFT SIDE */}

        <motion.div
          initial={{
            opacity: 0,
            x: -60,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="hidden lg:block"
        >

          <h1
            className="
              text-6xl
              font-bold
              text-white
              leading-tight
            "
          >
            Welcome to

            <span
              className="
                block
                text-teal-400
              "
            >
              Skating Academy
            </span>
          </h1>

          <p
            className="
              mt-6
              text-slate-300
              text-lg
              leading-8
            "
          >
            Manage students, coaches, attendance,
            fees and competitions through one
            modern management system.
          </p>

          <div
            className="
              mt-10
              space-y-4
            "
          >

            {[
              "Professional Coaches",
              "Smart Student Management",
              "Attendance & Fee Tracking",
            ].map((item) => (

              <div
                key={item}
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <div
                  className="
                    w-3
                    h-3
                    rounded-full
                    bg-teal-400
                  "
                />

                <p className="text-white">
                  {item}
                </p>

              </div>

            ))}

          </div>

        </motion.div>

        {/* LOGIN CARD */}

        <AuthCard>

          <div
            className="
              bg-[#102235]
              border
              border-teal-500/20
              rounded-3xl
              p-10
              shadow-2xl
            "
          >

            <motion.h2
              initial={{
                opacity: 0,
                y: -15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                text-3xl
                font-bold
                text-center
                text-white
              "
            >
              Welcome Back
            </motion.h2>

            <p
              className="
                text-center
                text-slate-400
                mt-2
                mb-8
              "
            >
              Sign in to continue
            </p>

            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >

              {/* EMAIL */}

              <AuthInput
                icon={Mail}
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              {/* PASSWORD */}

              <div className="relative">

                <AuthInput
                  icon={Lock}
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                    hover:text-teal-400
                  "
                >

                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}

                </button>

              </div>

              {/* OPTIONS */}

              <div
                className="
                  flex
                  justify-between
                  items-center
                  text-sm
                "
              >

                <label
                  className="
                    flex
                    items-center
                    gap-2
                    text-slate-300
                  "
                >

                  <input
                    type="checkbox"
                    className="accent-teal-500"
                  />

                  Remember Me

                </label>

                <Link
                  to="/forgot-password"
                  className="
                    text-teal-400
                    hover:text-teal-300
                  "
                >
                  Forgot Password?
                </Link>

              </div>

              {/* LOGIN BUTTON */}

              <AuthButton
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Logging in..."
                  : "Login"}
              </AuthButton>

              <p
                className="
                  text-center
                  text-slate-400
                "
              >
                Don't have an account?{" "}

                <Link
                  to="/register"
                  className="
                    text-teal-400
                    font-semibold
                    hover:text-teal-300
                  "
                >
                  Register
                </Link>

              </p>

            </form>

          </div>

        </AuthCard>

      </div>

    </div>
  );
}