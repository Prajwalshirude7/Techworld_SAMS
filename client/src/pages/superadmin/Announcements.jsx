import {
Megaphone,
Plus,
Edit,
Trash2,
Calendar,
CheckCircle,
XCircle
} from "lucide-react";

import {motion} from "framer-motion";

import {useState} from "react";


export default function Announcements(){


const [announcements,setAnnouncements]=useState([

{
title:"New Skating Batch Started",
description:"Admissions are open for the new beginner skating batch.",
date:"24 August 2026",
category:"Admission",
status:"Published"
},


{
title:"District Competition Registration",
description:"Students can register for upcoming district level competition.",
date:"30 August 2026",
category:"Competition",
status:"Published"
},


{
title:"Academy Holiday Notice",
description:"Academy will remain closed on Sunday.",
date:"05 September 2026",
category:"Notice",
status:"Draft"
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

Announcement Management

</h1>


<p

className="
text-slate-400
mt-2
"

>

Create and manage academy announcements.

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

Create Announcement


</button>


</motion.div>









{/* CREATE BOX */}




<motion.div

whileHover={{
scale:1.01
}}

className="
mt-10
bg-[#102235]
border
border-slate-700
rounded-3xl
p-6
"

>


<h2

className="
text-xl
font-bold
"

>

Create New Announcement

</h2>



<div

className="
grid
grid-cols-1
md:grid-cols-2
gap-5
mt-6
"

>


<input

placeholder="Announcement Title"

className="
bg-[#07131f]
border
border-slate-700
rounded-xl
p-3
outline-none
"

/>



<select

className="
bg-[#07131f]
border
border-slate-700
rounded-xl
p-3
outline-none
"

>

<option>
Admission
</option>

<option>
Competition
</option>

<option>
Notice
</option>

<option>
Event
</option>

</select>


</div>





<textarea

placeholder="Write announcement description..."

className="
mt-5
w-full
h-32
bg-[#07131f]
border
border-slate-700
rounded-xl
p-4
outline-none
"

/>





<button

className="
mt-5
bg-teal-500
px-6
py-3
rounded-xl
font-bold
"

>

Publish Announcement

</button>




</motion.div>









{/* ANNOUNCEMENT LIST */}



<div

className="
grid
grid-cols-1
lg:grid-cols-2
gap-6
mt-10
"

>



{

announcements.map((item,index)=>(


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
bg-teal-500/20
p-4
rounded-2xl
"

>

<Megaphone

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
bg-blue-500/20
text-blue-400
p-2
rounded-lg
"

>

<Edit size={18}/>

</button>



<button

className="
bg-red-500/20
text-red-400
p-2
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

{item.title}

</h2>



<p

className="
text-slate-400
mt-3
"

>

{item.description}

</p>







<div

className="
flex
flex-wrap
gap-4
mt-5
text-sm
"

>


<div

className="
flex
items-center
gap-2
text-slate-300
"

>

<Calendar size={16}/>

{item.date}

</div>





<div

className="
flex
items-center
gap-2
"

>


{

item.status==="Published"

?

<CheckCircle

size={16}

className="text-green-400"

/>

:

<XCircle

size={16}

className="text-yellow-400"

/>

}



<span

className={

item.status==="Published"

?

"text-green-400"

:

"text-yellow-400"

}

>

{item.status}

</span>


</div>



</div>



</motion.div>


))


}



</div>







</div>


)

}