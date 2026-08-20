import { motion } from "framer-motion";
import {
  Baby,
  Trophy,
  Clock,
  IndianRupee
} from "lucide-react";


export default function Programs(){


const programs=[


{
icon:<Baby size={38}/>,
title:"Beginner Skating Program",

subtitle:"Start Your Skating Journey",

description:
"Designed for beginners who want to learn basic skating techniques, balance and confidence.",

fees:"₹1500 / Month",

time:"5:00 PM - 8:00 PM",

features:[
"Basic skating skills",
"Balance & control training",
"Beginner friendly coaching"
]

},




{
icon:<Trophy size={38}/>,
title:"Professional Skating Program",

subtitle:"Train Like A Champion",

description:
"Advanced training for athletes preparing for competitive skating events.",

fees:"₹1200 / Month",

time:"5:00 PM - 8:00 PM",

features:[
"Competition preparation",
"Advanced skating techniques",
"Road & track training"
]

}

];



return(


<section

id="programs"

className="
relative
py-20
sm:py-28
bg-[#07131f]
overflow-hidden
"

>


<div

className="
max-w-7xl
mx-auto
px-5
sm:px-8
lg:px-10
"

>





{/* HEADING */}


<motion.div

initial={{
opacity:0,
y:40
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

transition={{
duration:0.7
}}

className="
text-center
"

>


<h2

className="
text-4xl
sm:text-5xl
md:text-6xl
font-black
text-white
"

>

Our

<span

className="
text-teal-400
drop-shadow-[0_0_20px_rgba(20,184,166,0.7)]
"

>

 Programs

</span>


</h2>


<p

className="
mt-5
text-slate-300
text-lg
max-w-3xl
mx-auto
"

>

Professional skating programs designed for beginners,
advanced skaters and competitive athletes.

</p>


</motion.div>








{/* PROGRAM CARDS */}



<div

className="
mt-14
grid
lg:grid-cols-2
gap-8
"

>


{

programs.map((program,index)=>(


<motion.div


key={index}


initial={{
opacity:0,
x:index===0?-50:50
}}


whileInView={{
opacity:1,
x:0
}}


viewport={{
once:true
}}


transition={{
duration:0.7
}}


whileHover={{
y:-10
}}



className="
relative
bg-[#102235]
border
border-white/10
rounded-3xl
p-7
sm:p-10
hover:border-teal-400
transition
shadow-xl
"

>



{/* ICON */}


<div

className="
w-16
h-16
rounded-2xl
bg-teal-400/10
text-teal-400
flex
items-center
justify-center
mb-6
"

>

{program.icon}

</div>





<h3

className="
text-2xl
sm:text-3xl
font-black
text-white
"

>

{program.title}

</h3>




<p

className="
mt-2
text-teal-400
font-bold
"

>

{program.subtitle}

</p>





<p

className="
mt-5
text-slate-300
leading-relaxed
"

>

{program.description}

</p>







{/* DETAILS */}



<div

className="
mt-7
grid
sm:grid-cols-2
gap-4
"

>



<div

className="
flex
items-center
gap-3
bg-[#07131f]
rounded-xl
p-4
"

>

<IndianRupee className="text-teal-400"/>

<div>

<p className="text-slate-400 text-sm">
Fees
</p>

<p className="text-white font-bold">
{program.fees}
</p>

</div>


</div>





<div

className="
flex
items-center
gap-3
bg-[#07131f]
rounded-xl
p-4
"

>

<Clock className="text-teal-400"/>

<div>

<p className="text-slate-400 text-sm">
Timing
</p>

<p className="text-white font-bold">
{program.time}
</p>

</div>


</div>



</div>







{/* FEATURES */}



<ul

className="
mt-7
space-y-3
"

>


{

program.features.map((feature,i)=>(


<li

key={i}

className="
flex
items-center
gap-3
text-slate-300
"

>

<span

className="
w-2
h-2
rounded-full
bg-teal-400
"

/>

{feature}


</li>


))


}



</ul>






<button

className="
mt-8
w-full
py-3
rounded-xl
bg-teal-500
text-white
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





</div>


</section>


)

}