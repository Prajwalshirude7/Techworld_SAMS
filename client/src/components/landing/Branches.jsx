import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";


export default function Branches(){


const branches=[

"Rahuri",

"Rahata",

"Shrirampur",

"Shirdi",

"Kopargaon",

"Shrigonda",

"Aashti",

"Ahmednagar"

];



return(


<section

id="branches"

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
absolute
left-0
top-20
w-72
h-72
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

Our

<span

className="
text-teal-400
drop-shadow-[0_0_25px_rgba(20,184,166,0.8)]
"

>

 Branches

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

Providing professional skating training across
multiple locations to make quality coaching
accessible for every aspiring skater.

</p>



</motion.div>









{/* BRANCH CARDS */}



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

branches.map((branch,index)=>(


<motion.div


key={branch}


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
duration:0.5,
delay:index*0.1
}}


whileHover={{
y:-8
}}



className="
bg-[#102235]
border
border-white/10
rounded-3xl
p-6
flex
items-center
gap-4
hover:border-teal-400
transition
shadow-xl
"

>



<div

className="
w-14
h-14
rounded-2xl
bg-teal-400/10
text-teal-400
flex
items-center
justify-center
"

>

<MapPin size={28}/>

</div>





<div>


<h3

className="
text-xl
font-black
text-white
"

>

{branch}

</h3>


<p

className="
text-slate-400
text-sm
mt-1
"

>

RTSA Training Center

</p>



</div>





</motion.div>


))


}



</div>







{/* MAP CTA */}



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
mt-14
flex
justify-center
"

>


<button

className="
flex
items-center
gap-3
px-8
py-4
rounded-xl
bg-teal-500
text-white
font-black
hover:bg-teal-600
transition
shadow-[0_0_25px_rgba(20,184,166,0.4)]
"

>

<Navigation size={22}/>

Find Nearest Branch

</button>


</motion.div>





</div>


</section>


)

}