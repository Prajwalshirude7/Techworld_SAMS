import {
useState
} from "react";


import {
useNavigate
} from "react-router-dom";


import {
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





export default function ResetPassword(){


const navigate = useNavigate();



const [password,setPassword]=useState("");

const [confirm,setConfirm]=useState("");

const [show,setShow]=useState(false);






const resetPassword=(e)=>{


e.preventDefault();




if(!password || !confirm){

toast.error(
"Fill all fields"
);

return;

}






if(password !== confirm){

toast.error(
"Passwords do not match"
);

return;

}







const phone =
localStorage.getItem(
"resetPhone"
);




const user = JSON.parse(

localStorage.getItem("user")

);






if(
user.phone !== phone
){

toast.error(
"User not found"
);

return;

}






const updatedUser={

...user,

password

};






localStorage.setItem(

"user",

JSON.stringify(updatedUser)

);






localStorage.removeItem(
"resetOTP"
);


localStorage.removeItem(
"resetPhone"
);






toast.success(
"Password reset successful"
);





setTimeout(()=>{


navigate("/login");


},1000);



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

Reset Password

</h1>




<p

className="
text-center
text-slate-400
mt-3
mb-8
"

>

Create your new password.

</p>





<form

onSubmit={resetPassword}

className="
space-y-5
"

>




<div className="relative">


<AuthInput

icon={Lock}

type={
show
?
"text"
:
"password"
}

placeholder="New Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>




<button

type="button"

onClick={()=>setShow(!show)}

className="
absolute
right-4
top-1/2
-translate-y-1/2
text-slate-400
"

>


{
show
?
<EyeOff size={20}/>
:
<Eye size={20}/>
}


</button>


</div>







<AuthInput

icon={Lock}

type="password"

placeholder="Confirm Password"

value={confirm}

onChange={(e)=>setConfirm(e.target.value)}

/>






<AuthButton>

Reset Password

</AuthButton>





</form>




</motion.div>



</AuthCard>


</div>


);


}