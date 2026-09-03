import { motion } from "framer-motion";

import {
  Trophy,
  Clock,
  IndianRupee
} from "lucide-react";

import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";



export default function Programs(){


const navigate = useNavigate();


const [programs,setPrograms]=useState([]);





useEffect(()=>{


const data = JSON.parse(

localStorage.getItem("academyPrograms")

||

"[]"

);



setPrograms(

data.filter(

item=>item.status==="Active"

)

);



},[]);







return(


<section

id="programs"

className="
bg-[#07131f]
text-white
py-20
px-5
sm:px-8
lg:px-12
"

>



<div

className="
max-w-6xl
mx-auto
text-center
"

>



<motion.h2

initial={{
opacity:0,
y:30
}}

whileInView={{
opacity:1,
y:0
}}

className="
text-4xl
sm:text-6xl
font-black
"

>


Our

<span className="
text-teal-400
">

 Programs

</span>


</motion.h2>





<p

className="
mt-4
text-slate-400
text-lg
"

>

Professional skating programs designed for every level.

</p>



</div>









<div

className="
max-w-7xl
mx-auto
grid
grid-cols-1
lg:grid-cols-2
gap-8
mt-14
"

>



{

programs.length===0 &&


<div

className="
col-span-full
bg-[#102235]
rounded-3xl
p-10
text-center
text-slate-400
"

>

No programs available.

</div>


}





{

programs.map((program,index)=>(


<motion.div


key={program.id}


initial={{
opacity:0,
y:30
}}


whileInView={{
opacity:1,
y:0
}}


transition={{
delay:index*0.1
}}


whileHover={{
y:-8
}}



className="
bg-[#102235]
border
border-slate-700
rounded-3xl
p-6
sm:p-8
hover:border-teal-400
transition
"

>





<div

className="
bg-teal-500/20
w-fit
p-4
rounded-2xl
"

>


<Trophy

className="
text-teal-400
"

/>


</div>







<h3

className="
mt-6
text-2xl
sm:text-3xl
font-black
"

>

{program.name}

</h3>






<p

className="
text-teal-400
font-bold
mt-2
"

>

{program.category}

</p>








<p

className="
text-slate-300
mt-5
leading-relaxed
"

>

{program.description}

</p>







<div

className="
grid
sm:grid-cols-2
gap-4
mt-7
"

>





<div

className="
bg-[#07131f]
rounded-xl
p-4
flex
items-center
gap-3
"

>


<IndianRupee

className="
text-teal-400
"

/>


<div>

<p className="
text-slate-400
text-sm
">

Fees

</p>


<p className="
font-bold
">

₹{program.fees}

</p>


</div>


</div>








<div

className="
bg-[#07131f]
rounded-xl
p-4
flex
items-center
gap-3
"

>


<Clock

className="
text-teal-400
"

/>


<div>

<p className="
text-slate-400
text-sm
">

Duration

</p>


<p className="
font-bold
">

{program.duration}

</p>


</div>


</div>



</div>








<button


onClick={()=>{


localStorage.setItem(

"selectedProgram",

JSON.stringify(program)

);


navigate("/register");


}}



className="
mt-8
w-full
bg-teal-500
py-3
rounded-xl
font-bold
hover:bg-teal-600
transition
"

>

Join This Program

</button>






</motion.div>


))


}



</div>





</section>


);


}