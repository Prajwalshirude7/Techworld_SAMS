import {
IndianRupee,
CreditCard,
Clock,
CheckCircle,
XCircle,
Search,
TrendingUp
} from "lucide-react";

import {motion} from "framer-motion";

import {useState} from "react";


export default function Payments(){


const [search,setSearch]=useState("");



const stats=[

{
title:"Total Revenue",
value:"₹4,50,000",
icon:IndianRupee,
color:"text-teal-400"
},

{
title:"Completed Payments",
value:"320",
icon:CheckCircle,
color:"text-green-400"
},

{
title:"Pending Payments",
value:"45",
icon:Clock,
color:"text-yellow-400"
},

{
title:"Failed Payments",
value:"12",
icon:XCircle,
color:"text-red-400"
}

];



const payments=[


{
student:"Rahul Sharma",
email:"rahul@gmail.com",
plan:"Professional Plan",
amount:"₹5000",
date:"24 Aug 2026",
status:"Paid"
},


{
student:"Aarav Patil",
email:"aarav@gmail.com",
plan:"Beginner Plan",
amount:"₹3000",
date:"22 Aug 2026",
status:"Pending"
},


{
student:"Riya Deshmukh",
email:"riya@gmail.com",
plan:"Advanced Plan",
amount:"₹8000",
date:"20 Aug 2026",
status:"Failed"
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

Payment Management

</h1>


<p

className="
text-slate-400
mt-2
"

>

Monitor revenue and student transactions.

</p>


</motion.div>









{/* STAT CARDS */}



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
justify-between
items-center
"

>


<div>

<p className="
text-slate-400
">

{item.title}

</p>


<h2

className="
text-2xl
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









{/* REVENUE CARD */}



<motion.div

whileHover={{
scale:1.01
}}

className="
mt-8
bg-gradient-to-r
from-[#102235]
to-[#163b57]
border
border-teal-500/30
rounded-3xl
p-6
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
p-4
rounded-2xl
"

>

<TrendingUp

className="
text-teal-400
"

/>

</div>


<div>


<h2

className="
text-2xl
font-bold
"

>

Monthly Revenue Growth

</h2>


<p

className="
text-slate-300
mt-2
"

>

Revenue increased by 18% compared to last month.

</p>


</div>


</div>


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
rounded-xl
px-4
border
border-slate-700
"

>


<Search

className="
text-slate-400
"

/>


<input

placeholder="Search payment..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="
bg-transparent
outline-none
py-3
w-full
"

/>


</div>


</div>









{/* PAYMENT TABLE */}



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

Transaction History

</h2>

</div>






<div

className="
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
Plan
</th>


<th className="p-4 text-left">
Amount
</th>


<th className="p-4 text-left">
Date
</th>


<th className="p-4 text-left">
Status
</th>


</tr>


</thead>





<tbody>


{

payments

.filter((item)=>

item.student
.toLowerCase()
.includes(search.toLowerCase())

)

.map((payment,index)=>(


<tr

key={index}

className="
border-t
border-slate-700
"

>


<td className="p-4">


<p className="
font-bold
">

{payment.student}

</p>


<p className="
text-slate-400
text-sm
">

{payment.email}

</p>


</td>



<td className="p-4">

{payment.plan}

</td>


<td className="p-4 font-bold">

{payment.amount}

</td>



<td className="p-4">

{payment.date}

</td>



<td className="p-4">


<span

className={`
px-3
py-1
rounded-full
text-sm

${
payment.status==="Paid"

?

"bg-green-500/20 text-green-400"

:

payment.status==="Pending"

?

"bg-yellow-500/20 text-yellow-400"

:

"bg-red-500/20 text-red-400"

}

`}

>

{payment.status}

</span>


</td>


</tr>


))


}



</tbody>


</table>


</div>


</div>






</div>


)

}