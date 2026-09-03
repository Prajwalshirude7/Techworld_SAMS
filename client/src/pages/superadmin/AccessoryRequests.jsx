import {
  Package
} from "lucide-react";


import {
  useEffect,
  useState
} from "react";


import {
  motion
} from "framer-motion";





export default function AccessoryRequests(){



const [requests,setRequests]=useState([]);






// LOAD REQUESTS

useEffect(()=>{


const data = JSON.parse(

localStorage.getItem("accessoryRequests")

||

"[]"

);


setRequests(data);



},[]);









return(



<div

className="
min-h-screen
bg-[#07131f]
text-white
p-4
sm:p-8
lg:p-10
"

>






<h1

className="
text-3xl
sm:text-5xl
font-black
"

>

Accessory Requests

</h1>




<p

className="
text-slate-400
mt-2
"

>

View student and customer accessory requests.

</p>








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

requests.length===0 &&


<div

className="
col-span-full
bg-[#102235]
border
border-slate-700
rounded-3xl
p-10
text-center
text-slate-400
"

>

No accessory requests available.

</div>


}









{

requests.map((item,index)=>(


<motion.div


key={item.id}


initial={{

opacity:0,

y:30

}}


animate={{

opacity:1,

y:0

}}


transition={{

delay:index*0.1

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
bg-teal-500/20
w-fit
p-4
rounded-xl
"

>


<Package

size={30}

className="
text-teal-400
"

/>


</div>









<h2

className="
text-xl
font-black
mt-5
"

>

{item.productName}

</h2>







<div

className="
mt-5
space-y-3
text-slate-300
"

>



<p>

Customer:

<span

className="
text-white
font-bold
ml-2
"

>

{item.customerName}

</span>

</p>





<p>

Mobile:

<span

className="
text-white
font-bold
ml-2
"

>

{item.mobile}

</span>

</p>





<p>

Price:

<span

className="
text-teal-400
font-bold
ml-2
"

>

₹{item.price}

</span>

</p>




<p>

Date:

<span

className="
text-white
ml-2
"

>

{item.date}

</span>

</p>




</div>









</motion.div>


))


}



</div>






</div>



);


}