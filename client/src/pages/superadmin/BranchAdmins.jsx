import {
UserPlus,
User,
Building2,
Edit,
Trash2,
CheckCircle,
XCircle
} from "lucide-react";

import {motion} from "framer-motion";

import {useState} from "react";


export default function BranchAdmins(){


const [admins,setAdmins]=useState([

{
name:"Rahul Patil",
email:"rahul@gmail.com",
branch:"Mumbai Branch",
status:"Active"
},

{
name:"Sneha Sharma",
email:"sneha@gmail.com",
branch:"Pune Branch",
status:"Active"
},

{
name:"Amit Joshi",
email:"amit@gmail.com",
branch:"Nashik Branch",
status:"Inactive"
}

]);



return(

<div

className="
min-h-screen
bg-[#07131f]
p-5
sm:p-8
lg:p-10
text-white
"

>




{/* HEADER */}



<motion.div

initial={{
opacity:0,
y:-20
}}

animate={{
opacity:1,
y:0
}}

className="
flex
flex-col
sm:flex-row
justify-between
gap-5
"

>


<div>


<h1

className="
text-3xl
sm:text-4xl
font-black
"

>

Branch Admin Management

</h1>


<p

className="
text-slate-400
mt-2
"

>

Create and manage branch administrators.

</p>


</div>





<button

className="
bg-teal-500
hover:bg-teal-600
px-6
py-3
rounded-xl
font-bold
flex
items-center
gap-2
"

>


<UserPlus size={20}/>

Add Branch Admin


</button>



</motion.div>









{/* ADMIN CARDS */}




<div

className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-6
mt-10
"

>


{

admins.map((admin,index)=>(


<motion.div


key={index}


whileHover={{
y:-8
}}


className="
bg-[#102235]
border
border-slate-700
rounded-3xl
p-6
"

>



<div

className="
flex
justify-between
items-start
"

>


<div

className="
w-14
h-14
rounded-2xl
bg-teal-500/20
flex
items-center
justify-center
"

>


<User

className="
text-teal-400
"

/>


</div>




<div

className="
flex
gap-2
"

>


<button

className="
p-2
bg-blue-500/20
text-blue-400
rounded-lg
"

>

<Edit size={18}/>

</button>



<button

className="
p-2
bg-red-500/20
text-red-400
rounded-lg
"

>

<Trash2 size={18}/>

</button>



</div>



</div>








<h2

className="
text-xl
font-bold
mt-5
"

>

{admin.name}

</h2>


<p

className="
text-slate-400
mt-1
"

>

{admin.email}

</p>






<div

className="
mt-5
space-y-3
"

>


<div

className="
flex
items-center
gap-3
text-slate-300
"

>


<Building2 size={18}/>


<span>

{admin.branch}

</span>


</div>





<div

className="
flex
items-center
gap-2
"

>


{

admin.status==="Active"

?

<CheckCircle

size={18}

className="text-green-400"

/>

:

<XCircle

size={18}

className="text-red-400"

/>

}



<span

className={

admin.status==="Active"

?

"text-green-400"

:

"text-red-400"

}

>

{admin.status}

</span>



</div>


</div>









<button

className="
mt-6
w-full
bg-[#07131f]
border
border-slate-700
py-3
rounded-xl
font-bold
hover:border-teal-400
transition
"

>

Manage Permissions

</button>




</motion.div>


))


}



</div>




</div>


)

}