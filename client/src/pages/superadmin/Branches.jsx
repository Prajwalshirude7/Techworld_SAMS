import {
MapPin,
Plus,
Edit,
Trash2,
Users
} from "lucide-react";

import {motion} from "framer-motion";
import {useState} from "react";


export default function Branches(){


const [branches,setBranches]=useState([

{
name:"Pune Branch",
location:"Pune, Maharashtra",
admin:"Not Assigned",
students:120
},

{
name:"Mumbai Branch",
location:"Mumbai, Maharashtra",
admin:"Rahul Patil",
students:85
},

{
name:"Nashik Branch",
location:"Nashik, Maharashtra",
admin:"Not Assigned",
students:60
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

Branch Management

</h1>


<p

className="
text-slate-400
mt-2
"

>

Manage academy branches and branch administrators.

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

<Plus size={20}/>

Add Branch

</button>


</motion.div>









{/* BRANCH CARDS */}



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

branches.map((branch,index)=>(


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
"

>


<div

className="
bg-teal-500/20
p-4
rounded-2xl
"

>

<MapPin

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
rounded-lg
bg-blue-500/20
text-blue-400
"

>

<Edit size={18}/>

</button>


<button

className="
p-2
rounded-lg
bg-red-500/20
text-red-400
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

{branch.name}

</h2>



<p

className="
text-slate-400
mt-2
"

>

{branch.location}

</p>





<div

className="
mt-6
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

<Users size={18}/>

<span>

Students: {branch.students}

</span>


</div>



<p

className="
text-slate-400
"

>

Branch Admin:

<span className="text-white ml-2">

{branch.admin}

</span>

</p>



</div>







<button

className="
mt-6
w-full
bg-teal-500/20
text-teal-400
py-3
rounded-xl
font-bold
hover:bg-teal-500
hover:text-white
transition
"

>

Assign Branch Admin

</button>



</motion.div>


))


}


</div>



</div>


)

}