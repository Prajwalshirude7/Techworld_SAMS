import { motion } from "framer-motion";
import {
  Trophy,
  Users,
  Medal,
  MapPin
} from "lucide-react";


export default function About(){


const stats=[

{
icon:<Trophy/>,
value:"14+",
title:"Years Of Excellence"
},

{
icon:<Users/>,
value:"500+",
title:"Students Trained"
},

{
icon:<Medal/>,
value:"50+",
title:"Competition Winners"
},

{
icon:<MapPin/>,
value:"Multiple",
title:"Training Locations"
}

];



return(

<section

id="about"

className="
relative
py-20
sm:py-28
bg-[#07131f]
overflow-hidden
"

>


{/* Glow Background */}


<div

className="
absolute
top-20
left-0
w-72
h-72
bg-teal-500/20
blur-[120px]
rounded-full
"

/>



<div

className="
max-w-7xl
mx-auto
px-5
sm:px-8
lg:px-10
relative
z-10
"

>



{/* Heading */}


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

About

<span

className="
text-teal-400
drop-shadow-[0_0_20px_rgba(20,184,166,0.7)]
"

>

 RTSA

</span>


</h2>



<p

className="
mt-5
text-slate-300
text-base
sm:text-lg
leading-relaxed
"

>

Rushikesh Tarde Skates Arena is a professional roller skating academy
dedicated to building skilled athletes through structured training,
expert coaching and competitive preparation.

</p>


</motion.div>







{/* MAIN CONTENT */}


<div

className="
mt-16
grid
lg:grid-cols-2
gap-12
items-center
"

>




{/* LEFT TEXT */}



<motion.div

initial={{
opacity:0,
x:-50
}}

whileInView={{
opacity:1,
x:0
}}

viewport={{
once:true
}}

transition={{
duration:0.8
}}

>


<h3

className="
text-3xl
sm:text-4xl
font-black
text-white
"

>

Building Champions
<br/>

<span className="text-teal-400">

One Skate At A Time

</span>


</h3>




<p

className="
mt-6
text-slate-300
text-lg
leading-relaxed
"

>

Our academy provides professional roller skating
training for beginners, intermediate skaters and
competitive athletes.

<br/>
<br/>

With experienced coaches, modern training methods
and a focus on discipline, confidence and fitness,
we help students achieve their skating goals and
prepare for various competitions.

</p>





</motion.div>








{/* RIGHT STATS */}



<motion.div

initial={{
opacity:0,
x:50
}}

whileInView={{
opacity:1,
x:0
}}

viewport={{
once:true
}}

transition={{
duration:0.8
}}

className="
grid
grid-cols-2
gap-5
"

>


{

stats.map((item,index)=>(


<motion.div

key={index}

whileHover={{
y:-8
}}

className="
bg-[#102235]
border
border-white/10
rounded-2xl
p-5
sm:p-6
text-center
hover:border-teal-400
transition
shadow-xl
"

>



<div

className="
flex
justify-center
text-teal-400
mb-4
"

>

{item.icon}

</div>



<h4

className="
text-3xl
sm:text-4xl
font-black
text-white
"

>

{item.value}

</h4>




<p

className="
mt-2
text-slate-400
text-sm
sm:text-base
"

>

{item.title}

</p>



</motion.div>


))


}



</motion.div>



</div>




</div>


</section>


)

}