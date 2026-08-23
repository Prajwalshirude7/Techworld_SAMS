import { 
Users,
Clock,
CheckCircle,
XCircle,
Search
} from "lucide-react";

import { motion } from "framer-motion";
import { useState } from "react";


export default function Admissions(){


const [search,setSearch] = useState("");



const applications=[

{
name:"Rahul Sharma",
email:"rahul@gmail.com",
branch:"Pune",
program:"Professional Skating",
date:"24 Aug 2026",
status:"Pending"
},

{
name:"Aarav Patil",
email:"aarav@gmail.com",
branch:"Mumbai",
program:"Beginner Program",
date:"22 Aug 2026",
status:"Approved"
},

{
name:"Riya Deshmukh",
email:"riya@gmail.com",
branch:"Pune",
program:"Advanced Training",
date:"20 Aug 2026",
status:"Rejected"
}

];



const stats=[

{
title:"Total Applications",
value:"120",
icon:Users,
color:"text-teal-400"
},

{
title:"Pending Requests",
value:"45",
icon:Clock,
color:"text-yellow-400"
},

{
title:"Approved",
value:"65",
icon:CheckCircle,
color:"text-green-400"
},

{
title:"Rejected",
value:"10",
icon:XCircle,
color:"text-red-400"
}

];





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

>


<h1

className="
text-3xl
sm:text-4xl
font-black
"

>

Admissions Management

</h1>


<p

className="
text-slate-400
mt-2
"

>

Review, approve and manage student admission requests.

</p>


</motion.div>







{/* STATS */}



<div

className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-6
mt-8
"

>


{

stats.map((item,index)=>{


const Icon=item.icon;


return(


<motion.div

key={index}

whileHover={{
y:-6
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
items-center
justify-between
"

>


<div>

<p

className="
text-slate-400
"

>

{item.title}

</p>


<h2

className="
text-3xl
font-black
mt-2
"

>

{item.value}

</h2>


</div>



<Icon

size={35}

className={item.color}

/>


</div>


</motion.div>


)


})

}


</div>









{/* SEARCH */}



<div

className="
mt-10
bg-[#102235]
border
border-slate-700
rounded-3xl
p-5
"

>


<div

className="
flex
items-center
gap-3
bg-[#07131f]
border
border-slate-700
rounded-xl
px-4
"

>

<Search

className="
text-slate-400
"

/>


<input

value={search}

onChange={(e)=>setSearch(e.target.value)}

placeholder="Search student..."

className="
w-full
bg-transparent
outline-none
py-3
text-white
"

/>


</div>


</div>









{/* APPLICATIONS */}



<div

className="
mt-8
bg-[#102235]
border
border-slate-700
rounded-3xl
overflow-hidden
"

>



<div

className="
p-6
border-b
border-slate-700
"

>


<h2

className="
text-xl
font-bold
"

>

Admission Requests

</h2>


</div>







{/* DESKTOP TABLE */}



<div

className="
hidden
lg:block
overflow-x-auto
"

>


<table

className="
w-full
"

>


<thead

className="
bg-[#07131f]
text-slate-400
"

>

<tr>

<th className="p-4 text-left">
Student
</th>

<th className="p-4 text-left">
Branch
</th>

<th className="p-4 text-left">
Program
</th>

<th className="p-4 text-left">
Date
</th>

<th className="p-4 text-left">
Status
</th>

<th className="p-4 text-left">
Action
</th>

</tr>

</thead>



<tbody>


{

applications

.filter((item)=>

item.name
.toLowerCase()
.includes(search.toLowerCase())

)

.map((item,index)=>(


<tr

key={index}

className="
border-t
border-slate-700
"

>


<td className="p-4">

<div>

<p className="font-bold">

{item.name}

</p>

<p className="text-sm text-slate-400">

{item.email}

</p>

</div>

</td>



<td className="p-4">

{item.branch}

</td>



<td className="p-4">

{item.program}

</td>



<td className="p-4">

{item.date}

</td>



<td className="p-4">

<span

className="
px-3
py-1
rounded-full
text-sm
bg-yellow-500/20
text-yellow-400
"

>

{item.status}

</span>

</td>



<td className="p-4">


<button

className="
bg-green-500
px-4
py-2
rounded-lg
mr-2
font-bold
"

>

Approve

</button>


<button

className="
bg-red-500
px-4
py-2
rounded-lg
font-bold
"

>

Reject

</button>


</td>



</tr>


))


}



</tbody>


</table>


</div>









{/* MOBILE CARDS */}



<div

className="
lg:hidden
p-5
space-y-5
"

>


{

applications.map((item,index)=>(


<div

key={index}

className="
bg-[#07131f]
rounded-2xl
p-5
border
border-slate-700
"

>


<h3

className="
font-bold
text-lg
"

>

{item.name}

</h3>


<p className="text-slate-400">

{item.email}

</p>


<p className="mt-3">

Branch: {item.branch}

</p>


<p>

Program: {item.program}

</p>


<div

className="
flex
gap-3
mt-5
"

>

<button

className="
bg-green-500
px-4
py-2
rounded-lg
font-bold
"

>

Approve

</button>


<button

className="
bg-red-500
px-4
py-2
rounded-lg
font-bold
"

>

Reject

</button>


</div>


</div>


))


}


</div>



</div>







</div>


)

}