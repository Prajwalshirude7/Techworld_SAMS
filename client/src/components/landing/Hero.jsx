import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import hero from "../../assets/images/student-banner.png";


export default function Hero(){

const navigate = useNavigate();


return(

<section

id="home"

className="
relative
min-h-screen
overflow-hidden
flex
items-center
pt-5
"

>


{/* BACKGROUND IMAGE */}

<motion.img

src={hero}

alt="skating"

initial={{
scale:1.15,
opacity:0
}}

animate={{
scale:1,
opacity:1
}}

transition={{
duration:2
}}

className="
absolute
inset-0
w-full
h-full
object-cover
object-center
"

/>





{/* OVERLAY */}

<div
className="
absolute
inset-0
bg-black/60
"
/>


<div
className="
absolute
inset-0
bg-gradient-to-r
from-black
via-black/80
to-transparent
"
/>





{/* CONTENT */}

<div

className="
relative
z-10
w-full
max-w-7xl
mx-auto
px-5
sm:px-8
lg:px-10
py-8
"

>


<motion.div

initial={{
opacity:0,
x:-60
}}

animate={{
opacity:1,
x:0
}}

transition={{
duration:1
}}

className="
max-w-xl
sm:max-w-2xl
-translate-y-6
sm:-translate-y-10
"
>






<motion.h1

initial={{
opacity:0,
y:40
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:1
}}

className="
uppercase
font-[Anton]
text-white
leading-[0.88]
text-5xl
sm:text-6xl
md:text-7xl
lg:text-[90px]
xl:text-[100px]
tracking-wide
"

>


<motion.span

animate={{

textShadow:[

"0 0 5px rgba(255,255,255,0.3)",

"0 0 25px rgba(255,255,255,0.9)",

"0 0 5px rgba(255,255,255,0.3)"

]

}}

transition={{

duration:2,

repeat:Infinity

}}

>

BUILD

<br/>

SKILLS.

</motion.span>



<br/>




<motion.span

className="
text-teal-400
"

animate={{

textShadow:[

"0 0 10px rgba(20,184,166,.5)",

"0 0 45px rgba(20,184,166,1)",

"0 0 10px rgba(20,184,166,.5)"

]

}}

transition={{

duration:2,

repeat:Infinity

}}

>


BUILD

<br/>

CONFIDENCE.


</motion.span>



</motion.h1>









<p

className="
mt-5
text-white
text-base
sm:text-lg
max-w-xl
leading-relaxed
"

>

Professional roller skating training for beginners,
advanced skaters and competitive athletes.

</p>





<p

className="
mt-3
text-white
text-base
sm:text-lg
max-w-xl
leading-relaxed
"

>

Train with experienced coaches, prepare for competitions
and build your skating journey with Team RTSA.

</p>








{/* BUTTONS */}


<motion.div

initial={{
opacity:0,
y:30
}}

animate={{
opacity:1,
y:0
}}

transition={{
delay:0.8
}}

className="
mt-6
flex
flex-col
sm:flex-row
items-stretch
sm:items-center
gap-4
"

>





<motion.button

whileHover={{
scale:1.08
}}

whileTap={{
scale:0.95
}}

onClick={()=>navigate("/register")}

className="
bg-teal-500
px-8
py-3
rounded-xl
text-white
font-black
text-base
shadow-[0_0_35px_rgba(20,184,166,.8)]
"

>

Join Now

</motion.button>







<motion.button

whileHover={{
scale:1.08
}}

whileTap={{
scale:0.95
}}

onClick={()=>navigate("/programs")}

className="
border
border-white
bg-white/10
backdrop-blur-md
px-8
py-3
rounded-xl
text-white
font-black
text-base
flex
items-center
justify-center
gap-2
"

>

Explore Programs

<ArrowRight size={20}/>

</motion.button>





</motion.div>





</motion.div>


</div>


</section>


)

}