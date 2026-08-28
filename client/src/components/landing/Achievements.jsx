import {
useEffect,
useState
} from "react";


import {
Trophy
} from "lucide-react";


import {
motion
} from "framer-motion";



export default function Achievements(){


const [achievements,setAchievements]=useState([]);





useEffect(()=>{


const data = JSON.parse(

localStorage.getItem("academyAchievements")

||

"[]"

);


setAchievements(data);



},[]);








return(


<section

id="achievements"

className="
bg-[#07131f]
text-white
py-24
px-5
sm:px-8
lg:px-12
scroll-mt-20
"

>





{/* HEADING */}



<motion.div

initial={{
opacity:0,
y:30
}}

whileInView={{
opacity:1,
y:0
}}

transition={{
duration:0.8
}}

viewport={{
once:true
}}

className="
text-center
max-w-6xl
mx-auto
"

>


<h2

className="
text-5xl
sm:text-6xl
lg:text-7xl
font-black
tracking-tight
"

>


<span className="text-white">

Our 

</span>



<span

className="
text-teal-400
drop-shadow-[0_0_35px_rgba(20,184,166,.9)]
"

>

Achievements

</span>


</h2>





<p

className="
mt-5
text-lg
sm:text-xl
text-slate-400
"

>

Celebrating milestones and achievements of RTSA skaters.

</p>



</motion.div>









{/* ACHIEVEMENT CARDS */}



<div

className="
max-w-6xl
mx-auto
grid
grid-cols-1
md:grid-cols-2
lg:grid-cols-3
gap-6
mt-14
"

>





{

achievements.length===0 &&


<p

className="
text-slate-400
text-center
col-span-full
"

>

No achievements available.

</p>


}








{

achievements.map((item,index)=>(



<motion.div


key={item.id}


initial={{
opacity:0,
y:40
}}


whileInView={{
opacity:1,
y:0
}}


transition={{
delay:index*0.1
}}


viewport={{
once:true
}}



whileHover={{
y:-8,
scale:1.03
}}



className="
bg-[#102235]
border
border-slate-700
rounded-3xl
p-6
hover:border-teal-400/50
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

size={32}

className="
text-teal-400
"

/>


</div>





<h3

className="
text-xl
font-bold
mt-5
"

>

{item.title}

</h3>





<p

className="
text-slate-400
mt-3
"

>

{item.description}

</p>





<p

className="
text-teal-400
mt-3
font-semibold
"

>

{item.year}

</p>





</motion.div>


))


}



</div>





</section>


);


}