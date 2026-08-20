import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/public/Home";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyOTP from "./pages/auth/VerifyOTP";
import ResetPassword from "./pages/auth/ResetPassword";

import StudentDashboard from "./pages/student/StudentDashboard";
import Admission from "./pages/student/admission/Admission";
import Programs from "./pages/public/Programs";

import ProtectedRoute from "./routes/ProtectedRoute";


function App() {

  return (

    <BrowserRouter>

      <Routes>


        {/* Public Pages */}

        <Route
          path="/"
          element={<Home />}
        />


        <Route
          path="/login"
          element={<Login />}
        />


        <Route
          path="/register"
          element={<Register />}
        />


        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />


        <Route
          path="/verify-otp"
          element={<VerifyOTP />}
        />


        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />



        <Route
          path="/programs"
          element={<Programs />}
        />





        {/* Protected Student Routes */}


        <Route

          path="/student/dashboard"

          element={

            <ProtectedRoute>

              <StudentDashboard />

            </ProtectedRoute>

          }

        />



        <Route

          path="/admission"

          element={

            <ProtectedRoute>

              <Admission />

            </ProtectedRoute>

          }

        />



      </Routes>


    </BrowserRouter>

  );

}


export default App;