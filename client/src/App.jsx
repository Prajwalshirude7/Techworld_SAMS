import { BrowserRouter, Routes, Route } from "react-router-dom";


// Public Pages
import Home from "./pages/public/Home";
import Programs from "./pages/public/Programs";


// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyOTP from "./pages/auth/VerifyOTP";
import ResetPassword from "./pages/auth/ResetPassword";


// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import Admission from "./pages/student/admission/Admission";


// Super Admin Pages
import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";
import Admissions from "./pages/superadmin/Admissions";
import Branches from "./pages/superadmin/Branches";
import BranchAdmins from "./pages/superadmin/BranchAdmins";
import Students from "./pages/superadmin/Students";
import Gallery from "./pages/superadmin/Gallery";
import Announcements from "./pages/superadmin/Announcements";
import Payments from "./pages/superadmin/Payments";
import Products from "./pages/superadmin/Products";
import Reports from "./pages/superadmin/Reports";
import Settings from "./pages/superadmin/Settings";


// Protected Route
import ProtectedRoute from "./routes/ProtectedRoute";



function App() {


return (

<BrowserRouter>


<Routes>



{/* ================= PUBLIC ROUTES ================= */}



<Route

path="/"

element={<Home />}

/>



<Route

path="/programs"

element={<Programs />}

/>



{/* ================= AUTH ROUTES ================= */}



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






{/* ================= STUDENT ROUTES ================= */}



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







{/* ================= SUPER ADMIN ROUTES ================= */}




<Route

path="/super-admin/dashboard"

element={<SuperAdminDashboard />}

/>




<Route

path="/super-admin/admissions"

element={<Admissions />}

/>



<Route

path="/super-admin/branches"

element={<Branches />}

/>



<Route

path="/super-admin/branch-admins"

element={<BranchAdmins />}

/>



<Route

path="/super-admin/students"

element={<Students />}

/>



<Route

path="/super-admin/gallery"

element={<Gallery />}

/>



<Route

path="/super-admin/announcements"

element={<Announcements />}

/>



<Route

path="/super-admin/payments"

element={<Payments />}

/>



<Route

path="/super-admin/products"

element={<Products />}

/>



<Route

path="/super-admin/reports"

element={<Reports />}

/>



<Route

path="/super-admin/settings"

element={<Settings />}

/>



</Routes>


</BrowserRouter>


);


}



export default App;