// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   User,
//   Mail,
//   Phone,
//   Lock,
//   Eye,
//   EyeOff,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import toast from "react-hot-toast";
// import api from "../../services/api";
// import AuthCard from "../../components/auth/AuthCard";
// import AuthButton from "../../components/auth/AuthButton";
// import AuthInput from "../../components/auth/AuthInput";

// export default function Register() {
//   const navigate = useNavigate();

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [name, setName] = useState("");
// const [email, setEmail] = useState("");
// const [phone, setPhone] = useState("");
// const [password, setPassword] = useState("");
// const [confirmPassword, setConfirmPassword] = useState("");

// const handleRegister = (e) => {
//   e.preventDefault();


//   if (!name || !email || !phone || !password || !confirmPassword) {
//     toast.error("Please fill all fields");
//     return;
//   }


//   if(password !== confirmPassword){
//     toast.error("Passwords do not match");
//     return;
//   }


//   // Temporary storage (until backend is connected)
//   localStorage.setItem("studentName", name);
//   localStorage.setItem("studentEmail", email);
//   localStorage.setItem("studentPhone", phone);


//   toast.success("User registered successfully!");


//   setTimeout(() => {
//     navigate("/login");
//   }, 2000);

// };

//   return (
//     <div className="min-h-screen bg-[#08131E] relative overflow-hidden flex items-center justify-center px-6">

//       {/* Background Glow */}
//       <div className="absolute w-96 h-96 bg-teal-500/20 rounded-full blur-[150px] -top-24 -left-24"></div>
//       <div className="absolute w-80 h-80 bg-cyan-500/20 rounded-full blur-[150px] bottom-0 right-0"></div>

//       <div className="relative z-10 w-full max-w-7xl grid lg:grid-cols-2 gap-16 items-center">

//         {/* Left Section */}
//         <motion.div
//           initial={{ opacity: 0, x: -60 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           className="hidden lg:block"
//         >
//           <h1 className="text-6xl font-bold text-white leading-tight">
//             Join the
//             <span className="block text-teal-400">
//               Skating Academy
//             </span>
//           </h1>

//           <p className="mt-6 text-slate-300 text-lg leading-8">
//             Create your account and start your skating journey with
//             professional coaching and modern academy management.
//           </p>

//           <div className="mt-10 space-y-4">

//             <div className="flex items-center gap-3">
//               <div className="w-3 h-3 rounded-full bg-teal-400"></div>
//               <p className="text-white">
//                 Professional Coaching
//               </p>
//             </div>

//             <div className="flex items-center gap-3">
//               <div className="w-3 h-3 rounded-full bg-teal-400"></div>
//               <p className="text-white">
//                 Competition Training
//               </p>
//             </div>

//             <div className="flex items-center gap-3">
//               <div className="w-3 h-3 rounded-full bg-teal-400"></div>
//               <p className="text-white">
//                 Progress Tracking
//               </p>
//             </div>

//           </div>
//         </motion.div>

//         {/* Register Card */}
//         <AuthCard>

//           <div className="bg-[#102235] border border-teal-500/20 rounded-3xl p-10 shadow-2xl">

//             <motion.h2
//               initial={{ opacity: 0, y: -15 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="text-3xl font-bold text-center text-white"
//             >
//               Create Account
//             </motion.h2>

//             <p className="text-center text-slate-400 mt-2 mb-8">
//               Register to continue
//             </p>

//             <form onSubmit={handleRegister} className="space-y-5">

//               <AuthInput
//   icon={User}
//   type="text"
//   placeholder="Full Name"
//   value={name}
//   onChange={(e)=>setName(e.target.value)}
// />

//               <AuthInput
//  icon={Mail}
//  type="email"
//  placeholder="Email Address"
//  value={email}
//  onChange={(e)=>setEmail(e.target.value)}
// />

//              <AuthInput
//  icon={Phone}
//  type="tel"
//  placeholder="Mobile Number"
//  value={phone}
//  onChange={(e)=>setPhone(e.target.value)}
// />

//               <div className="relative">

//                <AuthInput
//  icon={Lock}
//  type={showPassword ? "text" : "password"}
//  placeholder="Password"
//  value={password}
//  onChange={(e)=>setPassword(e.target.value)}
// />

//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-400"
//                 >
//                   {showPassword ? (
//                     <EyeOff size={20} />
//                   ) : (
//                     <Eye size={20} />
//                   )}
//                 </button>

//               </div>

//               <div className="relative">

//                 <AuthInput
//  icon={Lock}
//  type={showConfirmPassword ? "text" : "password"}
//  placeholder="Confirm Password"
//  value={confirmPassword}
//  onChange={(e)=>setConfirmPassword(e.target.value)}
// />

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setShowConfirmPassword(!showConfirmPassword)
//                   }
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-400"
//                 >
//                   {showConfirmPassword ? (
//                     <EyeOff size={20} />
//                   ) : (
//                     <Eye size={20} />
//                   )}
//                 </button>

//               </div>

//               <AuthButton type="submit">
//                 Create Account
//               </AuthButton>

//               <p className="text-center text-slate-400">
//                 Already have an account?{" "}
//                 <Link
//                   to="/login"
//                   className="text-teal-400 font-semibold hover:text-teal-300"
//                 >
//                   Login
//                 </Link>
//               </p>

//             </form>

//           </div>

//         </AuthCard>

//       </div>

//     </div>
//   );
// }
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import AuthCard from "../../components/auth/AuthCard";
import AuthButton from "../../components/auth/AuthButton";
import AuthInput from "../../components/auth/AuthInput";

import api from "../../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // Send registration details to backend
      const response = await api.post(
        "/auth/register",
        {
          name,
          email,
          phone,
          password,

          // Student role
          role_id: 3,

          // Student is not assigned a branch
          // during basic registration
          branch_id: null,
        }
      );

      if (response.data.success) {
        toast.success(
          "User registered successfully!"
        );

        // Clear form
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setConfirmPassword("");

        // Go to login page
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      console.error(
        "Registration Error:",
        error
      );

      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08131E] relative overflow-hidden flex items-center justify-center px-6">

      {/* Background Glow */}

      <div className="absolute w-96 h-96 bg-teal-500/20 rounded-full blur-[150px] -top-24 -left-24"></div>

      <div className="absolute w-80 h-80 bg-cyan-500/20 rounded-full blur-[150px] bottom-0 right-0"></div>

      <div className="relative z-10 w-full max-w-7xl grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Section */}

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

          <h1 className="text-6xl font-bold text-white leading-tight">

            Join the

            <span className="block text-teal-400">
              Skating Academy
            </span>

          </h1>

          <p className="mt-6 text-slate-300 text-lg leading-8">

            Create your account and start your skating journey with
            professional coaching and modern academy management.

          </p>

          <div className="mt-10 space-y-4">

            <div className="flex items-center gap-3">

              <div className="w-3 h-3 rounded-full bg-teal-400"></div>

              <p className="text-white">
                Professional Coaching
              </p>

            </div>

            <div className="flex items-center gap-3">

              <div className="w-3 h-3 rounded-full bg-teal-400"></div>

              <p className="text-white">
                Competition Training
              </p>

            </div>

            <div className="flex items-center gap-3">

              <div className="w-3 h-3 rounded-full bg-teal-400"></div>

              <p className="text-white">
                Progress Tracking
              </p>

            </div>

          </div>

        </motion.div>

        {/* Register Card */}

        <AuthCard>

          <div className="bg-[#102235] border border-teal-500/20 rounded-3xl p-10 shadow-2xl">

            <motion.h2
              initial={{
                opacity: 0,
                y: -15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="text-3xl font-bold text-center text-white"
            >

              Create Account

            </motion.h2>

            <p className="text-center text-slate-400 mt-2 mb-8">

              Register to continue

            </p>

            <form
              onSubmit={handleRegister}
              className="space-y-5"
            >

              {/* Name */}

              <AuthInput
                icon={User}
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

              {/* Email */}

              <AuthInput
                icon={Mail}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              {/* Phone */}

              <AuthInput
                icon={Phone}
                type="tel"
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
              />

              {/* Password */}

              <div className="relative">

                <AuthInput
                  icon={Lock}
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-400"
                >

                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}

                </button>

              </div>

              {/* Confirm Password */}

              <div className="relative">

                <AuthInput
                  icon={Lock}
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-400"
                >

                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}

                </button>

              </div>

              {/* Register Button */}

              <AuthButton
                type="submit"
                disabled={loading}
              >

                {loading
                  ? "Creating Account..."
                  : "Create Account"}

              </AuthButton>

              {/* Login */}

              <p className="text-center text-slate-400">

                Already have an account?{" "}

                <Link
                  to="/login"
                  className="text-teal-400 font-semibold hover:text-teal-300"
                >

                  Login

                </Link>

              </p>

            </form>

          </div>

        </AuthCard>

      </div>

    </div>
  );
}