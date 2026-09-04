import {
  useState
} from "react";


import {
  Link,
  useNavigate
} from "react-router-dom";


import {
  Mail,
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




export default function Login(){


const navigate = useNavigate();



const [showPassword,setShowPassword]=useState(false);

const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const [loading,setLoading]=useState(false);





const handleLogin=async(e)=>{


e.preventDefault();



if(!email || !password){

toast.error(
"Please enter email and password"
);

return;

}



try{


setLoading(true);



const response = await fetch(

"http://localhost:5001/api/auth/login",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

email,

password

})

}

);





const data = await response.json();





if(!response.ok){

toast.error(

data.message || "Login failed"

);

return;

}





if(!data.token){

toast.error(
"Token missing"
);

return;

}





localStorage.setItem(
"token",
data.token
);


localStorage.setItem(
"isLoggedIn",
"true"
);



localStorage.setItem(
"userRole",
String(data.user.role_id)
);



localStorage.setItem(
"userId",
String(data.user.id)
);



localStorage.setItem(
"studentName",
data.user.name
);



localStorage.setItem(
"user",
JSON.stringify(data.user)
);




toast.success(
`Welcome ${data.user.name}!`
);






setTimeout(()=>{


if(Number(data.user.role_id)===1){

navigate(
"/super-admin/dashboard"
);


}

else if(Number(data.user.role_id)===2){

navigate(
"/admin/dashboard"
);


}

else if(Number(data.user.role_id)===3){

navigate(
"/student/dashboard"
);


}

else{

navigate("/");

}



},800);




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

blur-[130px]

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

blur-[130px]

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

justify-between

gap-8

lg:gap-16

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

duration:.7

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

text-white

"

>


Your Dream


<span

className="

block

text-teal-400

"

>

Your Journey

</span>



<span

className="

block

"

>

Your Victory 🏆

</span>



</h1>








<p

className="

mt-3

text-sm

sm:text-base

lg:text-lg

text-slate-300

leading-relaxed

"

>


Champions don't start perfect.

They start with one decision to improve every day.


</p>









<p

className="

mt-4

text-xs

sm:text-sm

italic

text-slate-400

"

>




</p>









<div

className="

mt-5

flex

flex-wrap

justify-center

lg:justify-start

gap-3

text-teal-400

font-bold

text-xs

sm:text-sm

"

>


<span>

🔥 Train Hard

</span>


<span>

🏆 Chase Goals

</span>


<span>

🚀 Improve Daily

</span>


</div>





</motion.div>









{/* LOGIN */}



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

duration:.7

}}



className="

w-full

max-w-md

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

lg:p-8

shadow-2xl

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


Welcome Back


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

Sign in to continue

</p>









<form

onSubmit={handleLogin}

className="

space-y-4

"

>





<AuthInput

icon={Mail}

type="email"

placeholder="Enter Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>









<div className="relative">


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

<EyeOff size={18}/> :

<Eye size={18}/>

}


</button>


</div>









<div

className="

flex

justify-between

items-center

text-xs

sm:text-sm

"

>


<label

className="

flex

gap-2

items-center

text-slate-300

"

>

<input

type="checkbox"

/>

Remember Me

</label>





<Link

to="/forgot-password"

className="

text-teal-400

"

>

Forgot Password?

</Link>



</div>








<AuthButton

type="submit"

disabled={loading}

>

{

loading

?

"Logging in..."

:

"Login"

}


</AuthButton>







<p

className="

text-center

text-sm

text-slate-400

"

>

Don't have an account?


<Link

to="/register"

className="

text-teal-400

ml-2

font-semibold

"

>

Register

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