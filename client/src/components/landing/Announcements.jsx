import { motion } from "framer-motion";
import {
  Megaphone,
  CalendarDays,
  Trophy,
  MapPin
} from "lucide-react";


export default function Announcements(){


const announcements=[


{
icon:<Megaphone size={35}/>,
tag:"Admissions Open",
title:"New Skating Batches Available",
description:
"Admissions are open for beginners, advanced skaters and competitive athletes. Start your skating journey with Team RTSA."
},



{
icon:<CalendarDays size={35}/>,
tag:"Training Updates",
title:"Daily Training Sessions",
description:
"Regular skating practice sessions are conducted from 5:00 PM to 8:00 PM under professional guidance."
},



{
icon:<Trophy size={35}/>,
tag:"Competition Training",
title:"Championship Preparation Program",
description:
"Special training programs available for students preparing for district, state and national competitions."
},



{
icon:<MapPin size={35}/>,
tag:"Branches",
title:"Multiple Training Locations",
description:
"Training facilities available across Rahuri, Rahata, Shrirampur, Shirdi and other locations."
}


];



return(


<section

id="announcements"

className="
relative
py-20
sm:py-28
bg-[#07131f]
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
text-3xl
sm:text-5xl
md:text-6xl
font-black
text-white
"

>

Latest

<span

className="
text-teal-400
drop-shadow-[0_0_25px_rgba(20,184,166,0.8)]
"

>

 Announcements

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

Stay updated with academy news, training batches,
events and competition updates.

</p>


</motion.div>









{/* CARDS */}



<div

className="
mt-14
grid
sm:grid-cols-2
lg:grid-cols-4
gap-6
"

>


{

announcements.map((item,index)=>(


<motion.div


key={index}


initial={{
opacity:0,
y:50
}}


whileInView={{
opacity:1,
y:0
}}


viewport={{
once:true
}}


transition={{
duration:0.5,
delay:index*0.15
}}



whileHover={{
y:-10
}}


className="
bg-[#102235]
border
border-white/10
rounded-3xl
p-6
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
"

>

{item.icon}

</div>







<span

className="
inline-block
mt-6
text-sm
font-bold
text-teal-400
uppercase
tracking-wide
"

>

{item.tag}

</span>





<h3

className="
mt-3
text-xl
font-black
text-white
"

>

{item.title}

</h3>





<p

className="
mt-4
text-slate-400
leading-relaxed
"

>

{item.description}

</p>





</motion.div>


))


}



</div>





</div>


</section>


)

}