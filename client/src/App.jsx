import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";



// ================= PUBLIC =================

import Home from "./pages/public/Home";
import Programs from "./pages/public/Programs";



// ================= AUTH =================

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyOTP from "./pages/auth/VerifyOTP";
import ResetPassword from "./pages/auth/ResetPassword";



// ================= STUDENT =================

import StudentDashboard from "./pages/student/StudentDashboard";
import Admission from "./pages/student/admission/Admission";



// ================= SUPER ADMIN =================

import SuperAdminDashboard 
from "./pages/superadmin/SuperAdminDashboard";

import Admissions 
from "./pages/superadmin/Admissions";

import AdmissionDetails 
from "./pages/superadmin/AdmissionDetails";

import Branches 
from "./pages/superadmin/Branches";

import Students 
from "./pages/superadmin/Students";

import StudentDetails 
from "./pages/superadmin/StudentDetails";

import ProgramsManagement 
from "./pages/superadmin/Programs";

import Gallery 
from "./pages/superadmin/Gallery";


import Announcements 
from "./pages/superadmin/Announcements";

import Payments 
from "./pages/superadmin/Payments";

import Reports 
from "./pages/superadmin/Reports";




// ================= CMS MODULES =================

import Achievements
from "./pages/superadmin/Achievements";

import Accessories
from "./pages/superadmin/Accessories";

import AccessoryRequests
from "./pages/superadmin/AccessoryRequests";

import ContactManagement
from "./pages/superadmin/Contact";



// ================= PROTECTED =================

import ProtectedRoute 
from "./routes/ProtectedRoute";





function App(){


return(

<BrowserRouter>


<Routes>





{/* ================= PUBLIC ================= */}



<Route

path="/"

element={<Home/>}

/>



<Route

path="/programs"

element={<Programs/>}

/>







{/* ================= AUTH ================= */}



<Route

path="/login"

element={<Login/>}

/>



<Route

path="/register"

element={<Register/>}

/>



<Route

path="/forgot-password"

element={<ForgotPassword/>}

/>



<Route

path="/verify-otp"

element={<VerifyOTP/>}

/>



<Route

path="/reset-password"

element={<ResetPassword/>}

/>









{/* ================= STUDENT ================= */}



<Route

path="/student/dashboard"

element={

<ProtectedRoute>

<StudentDashboard/>

</ProtectedRoute>

}

/>





<Route

path="/student/admission"

element={

<ProtectedRoute>

<Admission/>

</ProtectedRoute>

}

/>









{/* ================= SUPER ADMIN ================= */}



<Route

path="/super-admin/dashboard"

element={<SuperAdminDashboard/>}

/>







{/* ADMISSIONS */}



<Route

path="/super-admin/admissions"

element={<Admissions/>}

/>



<Route

path="/super-admin/admission-details"

element={<AdmissionDetails/>}

/>









{/* BRANCHES */}



<Route

path="/super-admin/branches"

element={<Branches/>}

/>









{/* STUDENTS */}



<Route

path="/super-admin/students"

element={<Students/>}

/>



<Route

path="/super-admin/student-details"

element={<StudentDetails/>}

/>









{/* PROGRAMS */}



<Route

path="/super-admin/programs"

element={<ProgramsManagement/>}

/>









{/* GALLERY */}



<Route

path="/super-admin/gallery"

element={<Gallery/>}

/>









{/* ACHIEVEMENTS */}



<Route

path="/super-admin/achievements"

element={<Achievements/>}

/>









{/* ACCESSORIES MANAGEMENT */}



<Route

path="/super-admin/accessories"

element={<Accessories/>}

/>







{/* ACCESSORY REQUESTS */}



<Route

path="/super-admin/accessory-requests"

element={<AccessoryRequests/>}

/>









{/* CONTACT */}



<Route

path="/super-admin/contact"

element={<ContactManagement/>}

/>









{/* ANNOUNCEMENTS */}



<Route

path="/super-admin/announcements"

element={<Announcements/>}

/>









{/* PAYMENTS */}



<Route

path="/super-admin/payments"

element={<Payments/>}

/>









{/* REPORTS */}



<Route

path="/super-admin/reports"

element={<Reports/>}

/>







</Routes>


</BrowserRouter>


);


}



export default App;