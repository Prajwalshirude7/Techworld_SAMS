import {
  Link,
  useNavigate
} from "react-router-dom";


import {
  Phone,
  ArrowLeft
} from "lucide-react";


import {
  useState
} from "react";


import {
  motion
} from "framer-motion";


import toast from "react-hot-toast";


import AuthCard from "../../components/auth/AuthCard";
import AuthButton from "../../components/auth/AuthButton";
import AuthInput from "../../components/auth/AuthInput";




export default function ForgotPassword(){


const navigate = useNavigate();


const [phone,setPhone] = useState("");

const [loading,setLoading] = useState(false);





const sendOTP = (e)=>{


e.preventDefault();


console.log(
"SEND OTP CLICKED"
);


console.log(
"PHONE:",
phone
);




if(!phone){


toast.error(
"Please enter mobile number"
);


return;

}





if(phone.length !== 10){


toast.error(
"Enter valid 10 digit mobile number"
);


return;


}






const user = JSON.parse(

localStorage.getItem("user")

);





if(!user){


toast.error(
"No registered user found"
);


return;


}







if(
String(user.phone).trim()
!== 
String(phone).trim()

){


toast.error(
"Mobile number not registered"
);


return;


}







setLoading(true);






const otp = Math.floor(

100000 +

Math.random()*900000

);







// SAVE OTP

localStorage.setItem(

"resetOTP",

String(otp)

);






// SAVE PHONE

localStorage.setItem(

"resetPhone",

phone

);






// DEVELOPMENT ONLY

console.log(
"Generated OTP:",
otp
);







toast.success(

"OTP sent successfully"

);






setTimeout(()=>{


setLoading(false);


navigate(
"/verify-otp"
);


},800);





};









return(


<div

className="
min-h-screen
bg-[#08131E]
relative
overflow-hidden
flex
items-center
justify-center
px-4
sm:px-6
"

>





{/* BACKGROUND GLOW */}


<div

className="
absolute
w-72
h-72
sm:w-96
sm:h-96
bg-teal-500/20
rounded-full
blur-[120px]
top-0
left-0
"

/>




<div

className="
absolute
w-72
h-72
sm:w-80
sm:h-80
bg-cyan-500/20
rounded-full
blur-[120px]
bottom-0
right-0
"

/>








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



transition={{

duration:.5

}}


className="
bg-[#102235]
border
border-teal-500/20
rounded-3xl
p-6
sm:p-10
shadow-2xl
w-full
max-w-md
"

>





<h1

className="
text-2xl
sm:text-3xl
font-black
text-center
text-white
"

>

Forgot Password

</h1>







<p

className="
text-center
text-slate-400
mt-3
mb-8
text-sm
sm:text-base
leading-relaxed
"

>

Enter your registered mobile number to reset password.

</p>









<form

onSubmit={sendOTP}

className="
space-y-5
"

>





<AuthInput

icon={Phone}

type="tel"

placeholder="Mobile Number"

value={phone}

onChange={(e)=>

setPhone(e.target.value)

}

/>









<AuthButton

type="submit"

disabled={loading}

>

{

loading

?

"Sending OTP..."

:

"Send OTP"

}



</AuthButton>









<Link

to="/login"

className="
flex
items-center
justify-center
gap-2
text-teal-400
hover:text-teal-300
transition
text-sm
"

>


<ArrowLeft size={16}/>


Back to Login


</Link>







</form>






</motion.div>



</AuthCard>




</div>


);


}