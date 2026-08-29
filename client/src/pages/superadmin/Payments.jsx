import {
Search,
CreditCard,
CheckCircle,
Clock,
IndianRupee
} from "lucide-react";


import {
motion
} from "framer-motion";


import {
useEffect,
useState
} from "react";







export default function Payments(){



const [payments,setPayments]=useState([]);


const [search,setSearch]=useState("");


const [status,setStatus]=useState("All");








// LOAD PAYMENTS


useEffect(()=>{


const data = JSON.parse(

localStorage.getItem("payments")

||

"[]"

);



setPayments(data);



},[]);









const filteredPayments = payments.filter((item)=>{


const searchMatch =

item.studentName

?.toLowerCase()

.includes(

search.toLowerCase()

)

||

item.email

?.toLowerCase()

.includes(

search.toLowerCase()

);






const statusMatch =

status==="All"

||

item.status===status;






return(

searchMatch && statusMatch

);



});









const totalRevenue = payments.reduce(

(total,item)=>

total + Number(item.amount || 0)

,0

);









return(


<div

className="
min-h-screen
bg-[#07131f]
text-white
p-4
sm:p-6
lg:p-10
"

>







{/* HEADER */}



<div>


<h1

className="
text-3xl
sm:text-4xl
font-black
"

>

Payments Management

</h1>



<p

className="
text-slate-400
mt-2
"

>

Manage student payments and transactions.

</p>



</div>









{/* STATS */}



<div

className="
grid
grid-cols-1
sm:grid-cols-3
gap-5
mt-8
"

>



<Card

title="Total Payments"

value={payments.length}

icon={<CreditCard/>}

/>






<Card

title="Paid Amount"

value={`₹${totalRevenue}`}

icon={<IndianRupee/>}

/>







<Card

title="Completed"

value={

payments.filter(

item=>

item.status==="Paid"

).length

}

icon={<CheckCircle/>}

/>





</div>









{/* FILTER */}



<div

className="
mt-8
bg-[#102235]
border
border-slate-700
rounded-3xl
p-5
flex
flex-col
md:flex-row
gap-4
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
flex-1
"

>


<Search

className="
text-slate-400
"

/>



<input


placeholder="Search student..."

value={search}


onChange={(e)=>setSearch(e.target.value)}


className="
bg-transparent
outline-none
w-full
py-3
"

/>


</div>








<select


value={status}


onChange={(e)=>setStatus(e.target.value)}


className="
bg-[#07131f]
border
border-slate-700
rounded-xl
px-4
py-3
"

>


<option value="All">

All Status

</option>



<option value="Paid">

Paid

</option>




<option value="Pending">

Pending

</option>



</select>





</div>









{/* PAYMENT LIST */}



<div

className="
mt-8
space-y-5
"

>



{

filteredPayments.length===0 &&


<div

className="
bg-[#102235]
border
border-slate-700
rounded-3xl
p-10
text-center
text-slate-400
"

>


No payments found.

</div>



}









{

filteredPayments.map((payment,index)=>(



<motion.div


key={payment.id}


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



className="
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
flex-col
md:flex-row
justify-between
gap-5
"

>







<div>


<h2

className="
text-xl
font-bold
"

>

{payment.studentName}

</h2>



<p

className="
text-slate-400
"

>

{payment.email}

</p>




<p

className="
mt-3
text-slate-300
"

>

Branch:

<span className="text-white ml-2">

{payment.branch || "N/A"}

</span>


</p>



<p

className="
text-slate-300
"

>

Program:

<span className="text-white ml-2">

{payment.program || "N/A"}

</span>


</p>



</div>









<div

className="
md:text-right
"

>


<h3

className="
text-2xl
font-black
text-teal-400
"

>

₹{payment.amount}

</h3>





<span

className={`

inline-flex

items-center

gap-2

mt-3

px-4

py-2

rounded-full

text-sm


${
payment.status==="Paid"

?

"bg-green-500/20 text-green-400"

:

"bg-yellow-500/20 text-yellow-400"

}

`}

>


{

payment.status==="Paid"

?

<CheckCircle size={16}/>

:

<Clock size={16}/>

}


{payment.status}


</span>



</div>






</div>









<div

className="
mt-5
border-t
border-slate-700
pt-4
text-sm
text-slate-400
flex
justify-between
"

>


<span>

Method:
{payment.paymentMethod}

</span>



<span>

{payment.date}

</span>



</div>







</motion.div>



))


}



</div>









</div>


);


}









function Card({

title,

value,

icon

}){


return(


<motion.div


whileHover={{

y:-5

}}


className="
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
justify-between
items-center
"

>


<div>


<p

className="
text-slate-400
"

>

{title}

</p>


<h2

className="
text-3xl
font-black
mt-2
"

>

{value}

</h2>


</div>





<div

className="
bg-teal-500/20
p-3
rounded-xl
text-teal-400
"

>


{icon}


</div>




</div>



</motion.div>


);


}