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
ArrowRight
} from "lucide-react";


import {
motion
} from "framer-motion";


import {
useNavigate
} from "react-router-dom";


import {
useState,
useEffect
} from "react";


import logo from "../../assets/images/logosams.png";








export default function SuperAdminDashboard(){



const navigate = useNavigate();


const [refresh,setRefresh]=useState(0);





useEffect(()=>{


const update=()=>{

setRefresh(prev=>prev+1);

};



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









const students = JSON.parse(

localStorage.getItem("academyStudents")

||

"[]"

);



const branches = JSON.parse(

localStorage.getItem("academyBranches")

||

"[]"

);





const admissions = JSON.parse(

localStorage.getItem("admissionApplications")

||

"[]"

);





const payments = JSON.parse(

localStorage.getItem("payments")

||

"[]"

);









const totalRevenue = payments.reduce(

(total,item)=>

total + Number(item.amount || 0),

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

item=>

item.status==="Pending Approval"

||

item.status==="Pending"

).length,

icon:FileText

},



{
title:"Total Revenue",

value:

`₹${totalRevenue.toLocaleString("en-IN")}`,

icon:IndianRupee

}


];









const actions=[


{
title:"Admissions",
description:"Review and manage student applications",
icon:FileText,
path:"/super-admin/admissions"
},


{
title:"Branches",
description:"Create branches and manage locations",
icon:Building2,
path:"/super-admin/branches"
},


{
title:"Students",
description:"View approved academy students",
icon:Users,
path:"/super-admin/students"
},


{
title:"Programs",
description:"Manage programs visible to students",
icon:Package,
path:"/super-admin/programs"
},


{
title:"Gallery",
description:"Manage academy images",
icon:Image,
path:"/super-admin/gallery"
},


{
title:"Announcements",
description:"Publish academy updates",
icon:Megaphone,
path:"/super-admin/announcements"
},


{
title:"Payments",
description:"Track student payments",
icon:CreditCard,
path:"/super-admin/payments"
},


{
title:"Reports",
description:"View academy reports",
icon:BarChart3,
path:"/super-admin/reports"
}


];









return(


<div

className="
min-h-screen
bg-[#07131f]
text-white
p-4
sm:p-6
lg:p-10
space-y-10
"

>









{/* HERO */}


<motion.div


initial={{

opacity:0,
y:-40

}}



animate={{

opacity:1,
y:0

}}



transition={{

duration:0.8

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
p-6
sm:p-10
"

>





<div

className="
absolute
w-72
h-72
bg-teal-400/20
blur-3xl
rounded-full
top-0
right-0
"

/>









<div

className="
relative
z-10
max-w-3xl
"

>


<h1

className="
text-3xl
sm:text-5xl
lg:text-6xl
font-black
leading-tight
"

>

Welcome,

<span

className="
text-teal-400
ml-2
"

>

Rushikesh Tarde

</span>

👋


</h1>





<p

className="
mt-5
text-slate-300
text-base
sm:text-xl
"

>

Manage admissions, branches, students and academy operations from one powerful dashboard.

</p>





<div

className="
flex
gap-3
mt-6
flex-wrap
"

>


<div

className="
bg-teal-500/20
px-5
py-2
rounded-full
text-teal-300
font-semibold
"

>

Super Admin Panel

</div>



<div

className="
bg-white/10
px-5
py-2
rounded-full
"

>

RTSA Academy

</div>



</div>



</div>








<motion.img


src={logo}


alt="RTSA"



whileHover={{

scale:1.08

}}



transition={{

duration:0.3

}}



className="
absolute
right-5
bottom-5
w-24
h-24
sm:w-40
sm:h-40
rounded-full
object-cover
shadow-[0_0_60px_rgba(20,184,166,.6)]
"

/>



</motion.div>









{/* STATS */}



<div

className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-4
gap-6
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
y:40

}}



animate={{

opacity:1,
y:0

}}



transition={{

delay:index*0.15

}}



whileHover={{

y:-10,
scale:1.04

}}



className="
bg-[#102235]
border
border-slate-700
rounded-3xl
p-6
hover:border-teal-400
transition
"

>


<div className="
flex
justify-between
items-center
">


<div>

<p className="
text-slate-400
">

{item.title}

</p>



<h2 className="
text-4xl
font-black
mt-3
">

{item.value}

</h2>


</div>




<div className="
bg-teal-500/20
p-4
rounded-2xl
">


<Icon

size={30}

className="
text-teal-400
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
text-3xl
sm:text-4xl
font-black
mb-6
"

>

Quick Actions

</h2>






<div

className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
xl:grid-cols-4
gap-6
"

>


{

actions.map((item,index)=>{


const Icon=item.icon;


return(


<motion.div


key={index}


initial={{

opacity:0,
y:40

}}



animate={{

opacity:1,
y:0

}}



transition={{

delay:index*0.08

}}



whileHover={{

y:-10,
scale:1.03

}}



onClick={()=>navigate(item.path)}



className="
cursor-pointer
bg-gradient-to-br
from-[#102235]
to-[#0c1c2c]
border
border-slate-700
rounded-3xl
p-6
hover:border-teal-400
"

>


<div className="
bg-teal-500/20
p-4
rounded-2xl
w-fit
">


<Icon

size={28}

className="
text-teal-400
"

/>


</div>



<h3 className="
text-xl
font-bold
mt-5
">

{item.title}

</h3>



<p className="
text-slate-400
mt-2
">

{item.description}

</p>



<div className="
flex
justify-between
items-center
mt-6
text-teal-400
font-semibold
">

Open

<motion.div

animate={{

x:[0,5,0]

}}



transition={{

duration:1.5,

repeat:Infinity

}}

>

<ArrowRight size={18}/>

</motion.div>


</div>



</motion.div>


)


})


}



</div>



</section>









</div>


);



}