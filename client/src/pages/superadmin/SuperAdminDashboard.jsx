import {
  Users,
  Building2,
  FileText,
  IndianRupee,
  Image,
  Megaphone,
  CreditCard,
  BarChart3,
  Package,
  ShoppingBag,
  Trophy,
  ArrowRight
} from "lucide-react";


import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import logo from "../../assets/images/logosams.png";





export default function SuperAdminDashboard(){


const navigate = useNavigate();


const [refresh,setRefresh]=useState(0);



useEffect(()=>{


const update=()=>setRefresh(prev=>prev+1);


window.addEventListener(
"storage",
update
);


return()=>{

window.removeEventListener(
"storage",
update
);

};


},[]);





const students =
JSON.parse(localStorage.getItem("academyStudents") || "[]");


const branches =
JSON.parse(localStorage.getItem("academyBranches") || "[]");


const admissions =
JSON.parse(localStorage.getItem("admissionApplications") || "[]");


const payments =
JSON.parse(localStorage.getItem("payments") || "[]");


const accessoryRequests =
JSON.parse(localStorage.getItem("accessoryRequests") || "[]");



const pendingAccessoryRequests =
accessoryRequests.filter(
item=>item.status==="Pending"
).length;



const totalRevenue =
payments.reduce(
(total,item)=>total + Number(item.amount || 0),
0
);







const stats=[

{
title:"Total Students",
value:students.length,
icon:Users
},

{
title:"Total Branches",
value:branches.length,
icon:Building2
},

{
title:"Pending Admissions",
value:
admissions.filter(
item =>
item.status==="Pending" ||
item.status==="Pending Approval"
).length,
icon:FileText
},

{
title:"Total Revenue",
value:`₹${totalRevenue.toLocaleString("en-IN")}`,
icon:IndianRupee
},

{
title:"Accessory Requests",
value:pendingAccessoryRequests,
icon:ShoppingBag
}

];









const actions=[


["Admissions","Review student applications",FileText,"/super-admin/admissions"],

["Branches","Manage academy branches",Building2,"/super-admin/branches"],

["Students","View approved students",Users,"/super-admin/students"],

["Programs","Manage academy programs",Package,"/super-admin/programs"],

["Gallery","Manage academy images",Image,"/super-admin/gallery"],

["Achievements","Manage success stories",Trophy,"/super-admin/achievements"],

["Announcements","Publish academy updates",Megaphone,"/super-admin/announcements"],

["Payments","Track payments",CreditCard,"/super-admin/payments"],

["Accessories","Manage products",Package,"/super-admin/accessories"],

["Accessory Requests","Manage requests",ShoppingBag,"/super-admin/accessory-requests"],

["Reports","View analytics",BarChart3,"/super-admin/reports"]

];








return(


<div

className="
min-h-screen
bg-[#07131f]
text-white
p-3
sm:p-6
lg:p-10
space-y-5
"

>





{/* HERO CARD */}


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
relative
overflow-hidden
bg-gradient-to-br
from-[#102235]
via-[#14344d]
to-[#102235]
border
border-slate-700
rounded-3xl
p-4
sm:p-8
"

>


<div

className="
absolute
w-40
h-40
sm:w-64
sm:h-64
bg-teal-400/20
blur-3xl
rounded-full
right-0
top-0
"

/>





<div

className="
relative
z-10
flex
flex-col
gap-4
"

>



<h1

className="
text-2xl
sm:text-4xl
lg:text-6xl
font-black
leading-tight
"

>

<span>

Welcome,

</span>



<span

className="
text-teal-400
block
sm:inline
sm:ml-2
"

>

Rushikesh Tarde

</span>


<span>

👋

</span>


</h1>







<p

className="
text-sm
sm:text-lg
text-slate-300
leading-relaxed
max-w-xl
"

>

Manage admissions, branches, students, products and academy operations from one powerful dashboard.

</p>







{/* SUPER ADMIN BADGE WITH LOGO */}


<div

className="
mt-2
flex
items-center
"

>


<div

className="
flex
items-center
gap-3
bg-teal-500/20
px-3
py-2
sm:px-5
sm:py-3
rounded-full
"

>


<img

src={logo}

alt="RTSA"

className="
w-8
h-8
sm:w-10
sm:h-10
rounded-full
object-cover
"

 />



<span

className="
text-teal-300
font-bold
text-sm
sm:text-lg
"

>

Super Admin Panel

</span>


</div>


</div>





</div>


</motion.div>
{/* STATS CARDS */}


<div

className="
grid
grid-cols-2
lg:grid-cols-5
gap-3
sm:gap-6
"

>


{

stats.map((item,index)=>{


const Icon=item.icon;


return(


<motion.div

key={index}

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

transition={{
delay:index*0.08
}}


className="
bg-[#102235]
border
border-slate-700
rounded-2xl
sm:rounded-3xl
p-3
sm:p-6
"

>


<div

className="
flex
justify-between
items-center
gap-2
"

>


<div>


<p

className="
text-slate-400
text-[11px]
sm:text-sm
"

>

{item.title}

</p>



<h2

className="
text-xl
sm:text-3xl
font-black
mt-1
"

>

{item.value}

</h2>


</div>






<div

className="
bg-teal-500/20
p-2
sm:p-4
rounded-xl
"

>


<Icon

size={20}

className="
text-teal-400
sm:w-7
sm:h-7
"

/>


</div>



</div>



</motion.div>


)


})


}



</div>










{/* QUICK ACTIONS */}



<section>


<h2

className="
text-xl
sm:text-3xl
font-black
mb-4
"

>

Quick Actions

</h2>







<div

className="
grid
grid-cols-2
sm:grid-cols-3
lg:grid-cols-4
gap-3
sm:gap-6
"

>


{

actions.map(([title,desc,Icon,path],index)=>(


<motion.div


key={index}


initial={{
opacity:0,
y:20
}}


animate={{
opacity:1,
y:0
}}


transition={{
delay:index*0.05
}}


whileHover={{
y:-5
}}


onClick={()=>navigate(path)}


className="
cursor-pointer
bg-[#102235]
border
border-slate-700
rounded-2xl
sm:rounded-3xl
p-3
sm:p-6
hover:border-teal-400
transition
"

>


<div


className="
bg-teal-500/20
p-2
sm:p-4
rounded-xl
w-fit
"

>


<Icon

size={18}

className="
text-teal-400
sm:w-6
sm:h-6
"

/>


</div>






<h3

className="
text-[11px]
sm:text-xl
font-bold
mt-3
"

>

{title}

</h3>






<p

className="
hidden
sm:block
text-slate-400
text-sm
mt-2
"

>

{desc}

</p>






<div

className="
flex
justify-between
items-center
mt-3
text-teal-400
font-bold
text-xs
sm:text-base
"

>

<span>

Open

</span>


<ArrowRight

size={15}

/>


</div>






</motion.div>


))


}



</div>



</section>







</div>


);


}