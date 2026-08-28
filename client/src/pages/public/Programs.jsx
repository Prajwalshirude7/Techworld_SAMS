import {
  Trophy,
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





export default function Programs(){


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





{/* HEADER */}


<div

className="
max-w-5xl
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

transition={{
duration:.6
}}

className="
text-5xl
sm:text-6xl
font-black
"

>


Our Programs


</motion.h2>





<p

className="
mt-4
text-slate-400
text-lg
"

>


Explore professional skating programs designed for every level.


</p>



</div>









{/* PROGRAM CARDS */}



<div

className="
max-w-6xl
mx-auto
grid
grid-cols-1
md:grid-cols-2
lg:grid-cols-3
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
border
border-slate-700
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

y:-10

}}



className="
relative
overflow-hidden
bg-gradient-to-br
from-[#102235]
to-[#0b1b2c]
border
border-slate-700
rounded-3xl
p-7
shadow-xl
hover:border-teal-400/50
transition
"

>







{/* GLOW EFFECT */}


<div

className="
absolute
top-0
right-0
w-32
h-32
bg-teal-500/20
blur-3xl
rounded-full
"

/>









{/* ICON */}



<div

className="
relative
w-16
h-16
rounded-2xl
bg-teal-500/20
flex
items-center
justify-center
"

>


<Trophy

size={32}

className="
text-teal-400
"

/>


</div>









{/* NAME */}



<h3

className="
text-2xl
font-black
mt-7
capitalize
"

>

{program.name}


</h3>









<p

className="
text-slate-400
mt-3
"

>


{program.description}


</p>









{/* DETAILS */}



<div

className="
mt-7
space-y-4
"

>


<div

className="
flex
items-center
gap-3
"

>


<div

className="
bg-teal-500/20
p-2
rounded-lg
"

>


<Clock

size={18}

className="
text-teal-400
"

/>


</div>



<span>

{program.duration || "3 Months"}

</span>



</div>








<div

className="
flex
items-center
gap-3
"

>


<div

className="
bg-teal-500/20
p-2
rounded-lg
"

>


<IndianRupee

size={18}

className="
text-teal-400
"

/>


</div>



<span

className="
font-bold
"

>

₹{program.fees || 0}

</span>



</div>



</div>









{/* CATEGORY */}



<div

className="
mt-8
flex
justify-between
items-center
"

>


<p

className="
text-slate-400
"

>

Category


</p>



<span

className="
text-teal-400
font-bold
capitalize
"

>


{program.category || "Students"}


</span>



</div>









</motion.div>


))


}



</div>







</section>


);


}