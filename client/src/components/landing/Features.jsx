import { motion } from "framer-motion";
import {
  Award,
  Target,
  Medal,
  Dumbbell
} from "lucide-react";


export default function Features(){


const features=[


{
icon:<Award size={40}/>,
title:"Professional Coaching",
description:
"Train under experienced coaches with professional guidance and structured skating techniques."
},



{
icon:<Target size={40}/>,
title:"Competition Focused Training",
description:
"Special preparation programs for district, state and national level competitions."
},



{
icon:<Medal size={40}/>,
title:"Multiple Skating Categories",
description:
"Training available for beginners, quad skating, inline skating and advanced professional skating."
},



{
icon:<Dumbbell size={40}/>,
title:"Complete Athlete Development",
description:
"Focus on fitness, discipline, confidence, skills improvement and overall athlete growth."
}


];



return(

<section

id="features"

className="
relative
py-20
sm:py-28
bg-[#08131E]
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





{/* TITLE */}



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
max-w-3xl
mx-auto
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

Why Choose

<span

className="
text-teal-400
drop-shadow-[0_0_20px_rgba(20,184,166,0.7)]
"

>

 Team RTSA

</span>


</h2>



<p

className="
mt-5
text-slate-300
text-lg
"

>

Building confident skaters through professional
training, dedication and competitive excellence.

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

features.map((item,index)=>(


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
group
bg-[#102235]
border
border-white/10
rounded-3xl
p-6
sm:p-8
hover:border-teal-400
transition
shadow-xl
"

>



<div

className="
w-16
h-16
rounded-2xl
bg-teal-400/10
flex
items-center
justify-center
text-teal-400
mb-6
group-hover:bg-teal-400
group-hover:text-white
transition
"

>

{item.icon}

</div>




<h3

className="
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