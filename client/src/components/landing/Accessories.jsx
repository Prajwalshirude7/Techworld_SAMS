import { motion } from "framer-motion";
import {
  ShoppingBag,
  ShieldCheck,
  Footprints,
  Dumbbell
} from "lucide-react";


export default function Accessories(){


const products=[

{
icon:<Footprints size={40}/>,
title:"Professional Skates",
description:
"High quality skating shoes designed for beginners and professional athletes."
},


{
icon:<ShieldCheck size={40}/>,
title:"Safety Equipment",
description:
"Protective gear including helmets, knee pads and elbow protection."
},


{
icon:<Dumbbell size={40}/>,
title:"Training Equipment",
description:
"Essential skating accessories to improve practice sessions and performance."
},


{
icon:<ShoppingBag size={40}/>,
title:"Complete Skating Kit",
description:
"Everything a skater needs in one place with trusted quality products."
}


];



return(


<section

id="products"

className="
relative
py-20
sm:py-28
bg-[#08131E]
overflow-hidden
"

>


{/* BACKGROUND GLOW */}

<div

className="
absolute
right-0
top-20
w-80
h-80
bg-teal-500/20
blur-[120px]
rounded-full
"

/>





<div

className="
relative
z-10
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

Skating

<span

className="
text-teal-400
drop-shadow-[0_0_30px_rgba(20,184,166,0.8)]
"

>

 Accessories

</span>


</h2>



<p

className="
mt-5
max-w-3xl
mx-auto
text-slate-300
text-lg
"

>

Premium skating equipment and accessories
to support every skater's journey.

</p>


</motion.div>








{/* PRODUCTS */}



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

products.map((item,index)=>(


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
scale:1.05
}}


className="
bg-[#102235]
border
border-white/10
rounded-3xl
p-7
text-center
hover:border-teal-400
transition
shadow-xl
"

>



<div

className="
mx-auto
w-20
h-20
rounded-full
bg-teal-400/10
text-teal-400
flex
items-center
justify-center
"

>

{item.icon}

</div>





<h3

className="
mt-6
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



<button

className="
mt-6
px-6
py-3
rounded-xl
bg-teal-500
text-white
font-bold
hover:bg-teal-600
transition
"

>

View Products

</button>



</motion.div>


))


}



</div>







{/* CTA */}



<motion.div

initial={{
opacity:0,
scale:0.9
}}

whileInView={{
opacity:1,
scale:1
}}

viewport={{
once:true
}}

className="
mt-16
text-center
"

>


<button

className="
px-10
py-4
rounded-xl
border
border-teal-400
text-teal-400
font-black
text-lg
hover:bg-teal-400
hover:text-white
transition
"

>

Explore Collection

</button>


</motion.div>





</div>


</section>


)

}