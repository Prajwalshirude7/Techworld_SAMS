import {
Search,
User,
MapPin,
Calendar,
CheckCircle,
XCircle,
Eye
} from "lucide-react";

import {motion} from "framer-motion";

import {useState} from "react";


export default function Students(){


const [search,setSearch]=useState("");



const students=[

{
name:"Rahul Sharma",
email:"rahul@gmail.com",
branch:"Pune Branch",
program:"Professional Skating",
date:"12 Aug 2026",
status:"Active"
},


{
name:"Aarav Patil",
email:"aarav@gmail.com",
branch:"Mumbai Branch",
program:"Beginner Program",
date:"20 Aug 2026",
status:"Active"
},


{
name:"Riya Deshmukh",
email:"riya@gmail.com",
branch:"Nashik Branch",
program:"Advanced Training",
date:"18 Aug 2026",
status:"Inactive"
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

Student Management

</h1>


<p

className="
text-slate-400
mt-2
"

>

View and manage all registered academy students.

</p>


</motion.div>










{/* SEARCH */}



<div

className="
mt-8
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


placeholder="Search student name..."

value={search}

onChange={(e)=>setSearch(e.target.value)}


className="
bg-transparent
w-full
outline-none
py-3
"

/>



</div>



</div>









{/* STUDENT TABLE */}



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

Registered Students

</h2>


</div>









{/* DESKTOP */}



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
Joined
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

students

.filter((student)=>

student.name
.toLowerCase()
.includes(search.toLowerCase())

)

.map((student,index)=>(


<tr

key={index}

className="
border-t
border-slate-700
"

>


<td className="p-4">


<div>


<p className="
font-bold
">

{student.name}

</p>


<p className="
text-slate-400
text-sm
">

{student.email}

</p>


</div>


</td>




<td className="p-4">


<div className="
flex
items-center
gap-2
">

<MapPin size={16}/>

{student.branch}

</div>


</td>




<td className="p-4">

{student.program}

</td>



<td className="p-4">

<div className="
flex
items-center
gap-2
">

<Calendar size={16}/>

{student.date}

</div>


</td>




<td className="p-4">


{

student.status==="Active"

?

<div className="
flex
items-center
gap-2
text-green-400
">

<CheckCircle size={16}/>

Active

</div>

:

<div className="
flex
items-center
gap-2
text-red-400
">

<XCircle size={16}/>

Inactive

</div>


}


</td>




<td className="p-4">


<button

className="
bg-teal-500/20
text-teal-400
px-4
py-2
rounded-lg
flex
items-center
gap-2
"

>


<Eye size={16}/>

View

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

students.map((student,index)=>(


<motion.div

key={index}

whileHover={{
y:-5
}}

className="
bg-[#07131f]
border
border-slate-700
rounded-2xl
p-5
"

>



<div

className="
flex
items-center
gap-4
"

>


<div

className="
bg-teal-500/20
p-3
rounded-xl
"

>


<User

className="
text-teal-400
"

/>


</div>



<div>


<h3

className="
font-bold
"

>

{student.name}

</h3>


<p

className="
text-slate-400
text-sm
"

>

{student.email}

</p>


</div>


</div>





<p className="mt-4">

Branch: {student.branch}

</p>


<p>

Program: {student.program}

</p>



<button

className="
mt-5
w-full
bg-teal-500
py-3
rounded-xl
font-bold
"

>

View Profile

</button>



</motion.div>


))


}



</div>



</div>






</div>


)

}