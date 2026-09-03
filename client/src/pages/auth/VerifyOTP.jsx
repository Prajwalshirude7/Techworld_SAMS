import {
useState
} from "react";


import {
useNavigate,
Link
} from "react-router-dom";


import {
ShieldCheck,
ArrowLeft
} from "lucide-react";


import {
motion
} from "framer-motion";


import toast from "react-hot-toast";


import AuthCard from "../../components/auth/AuthCard";
import AuthButton from "../../components/auth/AuthButton";
import AuthInput from "../../components/auth/AuthInput";





export default function VerifyOTP(){


const navigate = useNavigate();



const [otp,setOtp]=useState("");





const verifyOTP=(e)=>{


e.preventDefault();





const savedOTP =
localStorage.getItem("resetOTP");





if(!otp){


toast.error(
"Enter OTP"
);


return;


}







if(
otp !== savedOTP
){


toast.error(
"Invalid OTP"
);


return;


}







toast.success(
"OTP verified successfully"
);





navigate("/reset-password");



};







return(


<div

className="
min-h-screen
bg-[#08131E]
flex
items-center
justify-center
px-4
"

>


<AuthCard>


<motion.div

initial={{
opacity:0,
y:30
}}

animate={{
opacity:1,
y:0
}}

className="
bg-[#102235]
border
border-teal-500/20
rounded-3xl
p-6
sm:p-10
shadow-2xl
"

>



<h1

className="
text-3xl
font-black
text-center
text-white
"

>

Verify OTP

</h1>



<p

className="
text-center
text-slate-400
mt-3
mb-8
"

>

Enter the OTP generated for your mobile number.

</p>





<form

onSubmit={verifyOTP}

className="
space-y-5
"

>


<AuthInput

icon={ShieldCheck}

type="number"

placeholder="Enter OTP"

value={otp}

onChange={(e)=>setOtp(e.target.value)}

/>





<AuthButton>

Verify OTP

</AuthButton>





<Link

to="/forgot-password"

className="
flex
items-center
justify-center
gap-2
text-teal-400
text-sm
"

>


<ArrowLeft size={16}/>

Change Number


</Link>




</form>




</motion.div>



</AuthCard>



</div>


);


}