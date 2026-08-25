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


export default function Login(){


const navigate = useNavigate();


const [showPassword,setShowPassword]=useState(false);

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");





const handleLogin=(e)=>{

e.preventDefault();


if(!email || !password){

toast.error(
"Please enter email and password."
);

return;

}



const savedUser = JSON.parse(
localStorage.getItem("user")
);



if(

savedUser &&

savedUser.email === email &&

savedUser.password === password

){


localStorage.setItem(
"isLoggedIn",
"true"
);


localStorage.setItem(
"userRole",
String(savedUser.role_id)
);


localStorage.setItem(
"studentName",
savedUser.name
);



toast.success(
`Welcome ${savedUser.name}!`
);



setTimeout(()=>{

navigate("/student/dashboard");

},800);



}

else{


toast.error(
"Invalid email or password"
);


}


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
py-8
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










<div

className="
relative
z-10
w-full
max-w-6xl
grid
lg:grid-cols-2
gap-10
items-center
"

>









{/* LEFT CONTENT */}



<motion.div


initial={{
opacity:0,
x:-40
}}


animate={{
opacity:1,
x:0
}}


transition={{
duration:0.7
}}


className="
hidden
lg:block
"

>



<h1

className="
text-5xl
xl:text-6xl
font-black
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

SAMS Academy

</span>


</h1>





<p

className="
mt-6
text-slate-300
text-lg
max-w-lg
leading-8
"

>

Manage students, coaches, attendance,
fees and competitions through one
modern management system.

</p>





<div

className="
mt-8
space-y-4
"

>


{

[
"Professional Coaches",
"Smart Student Management",
"Attendance & Fee Tracking"

].map((item)=>(


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


<p

className="
text-white
"

>

{item}

</p>


</div>


))


}



</div>





</motion.div>














{/* LOGIN CARD */}





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
w-full
max-w-md
mx-auto
bg-[#102235]
border
border-teal-500/20
rounded-3xl
p-6
sm:p-8
shadow-2xl
"

>





<h2

className="
text-3xl
sm:text-4xl
font-black
text-center
text-white
"

>

Welcome Back

</h2>





<p

className="
text-center
text-slate-400
mt-3
mb-7
text-base
"

>

Sign in to continue

</p>







<form

onSubmit={handleLogin}

className="
space-y-5
"

>








<AuthInput


icon={Mail}


type="email"


placeholder="Enter Email"


value={email}


onChange={(e)=>
setEmail(e.target.value)
}


/>









<div

className="
relative
"

>



<AuthInput


icon={Lock}


type={
showPassword
?
"text"
:
"password"
}


placeholder="Enter Password"


value={password}


onChange={(e)=>
setPassword(e.target.value)
}


/>




<button


type="button"


onClick={()=>setShowPassword(!showPassword)}


className="
absolute
right-4
top-1/2
-translate-y-1/2
text-slate-400
hover:text-teal-400
"

>


{

showPassword

?

<EyeOff size={20}/>

:

<Eye size={20}/>

}



</button>



</div>









<div

className="
flex
items-center
justify-between
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

className="
accent-teal-500
"

/>


Remember me


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









<AuthButton type="submit">

Login

</AuthButton>









<p

className="
text-center
text-slate-400
text-sm
"

>

Don't have an account?

{" "}


<Link

to="/register"

className="
text-teal-400
font-bold
"

>

Register

</Link>


</p>





</form>






</motion.div>




</AuthCard>








</div>







</div>



);


}