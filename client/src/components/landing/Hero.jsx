import {ArrowRight} from "lucide-react";
import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";

import hero from "../../assets/images/student-banner.png";


export default function Hero(){


const navigate=useNavigate();



return(

<section

id="home"

className="
relative
min-h-screen
overflow-hidden
flex
items-center
pt-24
"

>


{/* IMAGE */}

<motion.img

src={hero}

alt="skating"

initial={{
scale:1.15
}}

animate={{
scale:1
}}

transition={{
duration:8
}}

className="
absolute
inset-0
w-full
h-full
object-cover
"

 />





{/* OVERLAY */}


<div

className="
absolute
inset-0
bg-black/45
"

/>


<div

className="
absolute
inset-0
bg-gradient-to-r
from-black
via-black/70
to-transparent
"

/>







<div

className="
relative
z-10
max-w-7xl
mx-auto
w-full
px-5
lg:px-10
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
max-w-2xl
"

>





<h1

className="
uppercase
font-[Anton]
text-white
leading-[0.9]
text-6xl
sm:text-7xl
md:text-8xl
lg:text-[120px]
tracking-wide
"

>

BUILD
<br/>

SKILLS.

<br/>


<span

className="
text-teal-400
drop-shadow-[0_0_35px_rgba(20,184,166,.9)]
"

>

BUILD
<br/>

CONFIDENCE.

</span>


</h1>







<p

className="
mt-8
text-white
text-lg
sm:text-xl
max-w-xl
leading-relaxed
"

>

Professional roller skating training for beginners,
advanced skaters and competitive athletes.

<br/><br/>

Train with experienced coaches, prepare for competitions
and build your skating journey with Team RTSA.

</p>






<div

className="
mt-10
flex
flex-col
sm:flex-row
gap-5
"

>



<motion.button

whileHover={{
scale:1.05
}}

onClick={()=>navigate("/register")}

className="
bg-teal-500
px-10
py-4
rounded-xl
text-white
font-black
text-lg
shadow-[0_0_30px_rgba(20,184,166,.6)]
"

>

Join Now

</motion.button>





<motion.button

whileHover={{
scale:1.05
}}

onClick={()=>navigate("/programs")}

className="
border
border-white
bg-white/10
backdrop-blur-md
px-10
py-4
rounded-xl
text-white
font-black
text-lg
flex
items-center
justify-center
gap-3
"

>

Explore Programs

<ArrowRight/>

</motion.button>



</div>



</motion.div>


</div>



</section>


)

}