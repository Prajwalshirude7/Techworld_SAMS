import {
  useState,
  useEffect
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";

import {
  motion
} from "framer-motion";

import toast from "react-hot-toast";


import AuthCard from "../../components/auth/AuthCard";
import AuthButton from "../../components/auth/AuthButton";
import AuthInput from "../../components/auth/AuthInput";





export default function Register(){


const navigate = useNavigate();



const [showPassword,setShowPassword]=useState(false);

const [showConfirmPassword,setShowConfirmPassword]=useState(false);


const [name,setName]=useState("");

const [email,setEmail]=useState("");

const [phone,setPhone]=useState("");

const [password,setPassword]=useState("");

const [confirmPassword,setConfirmPassword]=useState("");

const [selectedProgram,setSelectedProgram]=useState("");

const [loading,setLoading]=useState(false);







useEffect(()=>{

const savedProgram = localStorage.getItem(
"selectedProgram"
);


if(savedProgram){

const program = JSON.parse(savedProgram);

setSelectedProgram(
program.name || ""
);

}


},[]);









const handleRegister = async(e)=>{


e.preventDefault();



if(
!name.trim() ||
!email.trim() ||
!phone.trim() ||
!password ||
!confirmPassword
){

toast.error(
"Please fill all fields"
);

return;

}






if(password !== confirmPassword){

toast.error(
"Passwords do not match"
);

return;

}






if(phone.length !== 10){

toast.error(
"Enter valid 10 digit mobile number"
);

return;

}







try{


setLoading(true);



const response = await fetch(

"http://localhost:5001/api/auth/register",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

name,

email,

phone,

password,

role_id:3,

branch_id:1,

selectedProgram

})

}

);






const data = await response.json();






if(!response.ok){

toast.error(
data.message || "Registration failed"
);

return;

}







toast.success(
"Registration successful!"
);






localStorage.setItem(
"studentName",
name
);


localStorage.setItem(
"studentEmail",
email
);


localStorage.setItem(
"studentPhone",
phone
);





localStorage.removeItem(
"selectedProgram"
);






setTimeout(()=>{

navigate("/login");

},1000);



}

catch(error){

console.log(error);

toast.error(
"Server connection failed"
);


}

finally{

setLoading(false);

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
py-6
sm:px-6
lg:px-10
"

>



{/* GLOW */}

<div

className="
absolute
w-72
h-72
lg:w-96
lg:h-96
bg-teal-500/20
blur-[120px]
rounded-full
top-0
left-0
"

/>


<div

className="
absolute
w-72
h-72
lg:w-96
lg:h-96
bg-cyan-500/20
blur-[120px]
rounded-full
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
flex
flex-col
lg:flex-row
items-center
justify-center
gap-10
lg:gap-16
"

>









{/* DESKTOP HERO */}



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
duration:.6
}}



className="
w-full
lg:w-[45%]
text-center
lg:text-left
"

>



<h1
className="
text-3xl
sm:text-4xl
lg:text-5xl
xl:text-6xl
font-black
leading-[0.95]
tracking-tight
text-white
"
>

Your Skating


<span

className="
block
text-teal-400
"

>

Journey Starts

</span>



<span

className="
block
"

>

Here 🛼

</span>



</h1>







<p
className="
mt-4
text-sm
sm:text-base
lg:text-lg
text-slate-300
leading-relaxed
max-w-lg
mx-auto
lg:mx-0
"
>

Every champion was once a beginner.
Start your skating journey with RTSA Academy.


</p>








<p
className="
mt-3
text-xs
sm:text-sm
lg:text-base
italic
text-slate-400
"
>
"Fall. Rise. Repeat. Become unstoppable."

</p>






<div
className="
mt-4
flex
flex-wrap
justify-center
lg:justify-start
gap-3
text-teal-400
font-bold
text-sm
lg:text-base
"
>

<span>

🔥 Coaching

</span>


<span>

🏆 Training

</span>


<span>

🚀 Growth

</span>


</div>



</motion.div>









{/* REGISTER */}



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
duration:.6
}}


className="
w-full
max-w-sm
lg:max-w-md
"

>





<AuthCard>



<div

className="
bg-[#102235]
border
border-teal-500/20
rounded-3xl
p-5
sm:p-7
shadow-xl
"

>



<h2

className="
text-2xl
sm:text-3xl
font-black
text-center
text-white
"

>

Create Account

</h2>





<p

className="
text-center
text-sm
text-slate-400
mt-2
mb-5
"

>

Register to continue

</p>









<form

onSubmit={handleRegister}

className="
space-y-3
sm:space-y-4
"

>



<AuthInput

icon={User}

type="text"

placeholder="Full Name"

value={name}

onChange={(e)=>setName(e.target.value)}

/>





<AuthInput

icon={Mail}

type="email"

placeholder="Email Address"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>





<AuthInput

icon={Phone}

type="tel"

placeholder="Mobile Number"

value={phone}

onChange={(e)=>setPhone(e.target.value)}

/>









<div className="relative">


<AuthInput

icon={Lock}

type={
showPassword ? "text":"password"
}

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

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
"

>


{
showPassword ?

<EyeOff size={18}/>:

<Eye size={18}/>

}


</button>


</div>









<div className="relative">


<AuthInput

icon={Lock}

type={
showConfirmPassword ? "text":"password"
}

placeholder="Confirm Password"

value={confirmPassword}

onChange={(e)=>setConfirmPassword(e.target.value)}

/>




<button

type="button"

onClick={()=>setShowConfirmPassword(!showConfirmPassword)}

className="
absolute
right-4
top-1/2
-translate-y-1/2
text-slate-400
"

>


{
showConfirmPassword ?

<EyeOff size={18}/>:

<Eye size={18}/>

}


</button>


</div>









<AuthButton

type="submit"

disabled={loading}

>

{

loading

?

"Creating Account..."

:

"Create Account"

}


</AuthButton>







<p

className="
text-center
text-sm
text-slate-400
"

>

Already have an account?


<Link

to="/login"

className="
text-teal-400
ml-2
font-semibold
"

>

Login

</Link>


</p>






</form>



</div>



</AuthCard>



</motion.div>








</div>



</div>


);


}