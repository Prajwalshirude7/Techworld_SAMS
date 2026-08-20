import { motion } from "framer-motion";
import {
  Trophy,
  Medal,
  Award,
  Globe
} from "lucide-react";


export default function Achievements(){


const achievements=[


{
year:"2016",
icon:<Globe size={35}/>,
title:"International Roller Sport Championship",
description:
"Represented at Open International Roller Sport Championship held in Thailand."
},



{
year:"2021",
icon:<Trophy size={35}/>,
title:"OMG Book Of Record Holder",
description:
"Recognized for outstanding achievement in roller skating."
},



{
year:"2022",
icon:<Award size={35}/>,
title:"National Sports Awards",
description:
"Received Golden Attention National Sports Award and Major Dhyan Chand National Sports Award."
},



{
year:"2023",
icon:<Medal size={35}/>,
title:"Talent Book Of Record Holder",
description:
"Achieved recognition for contribution and excellence in skating."
},



{
year:"2024",
icon:<Trophy size={35}/>,
title:"Guinness World Record Holder",
description:
"Achieved Guinness World Record recognition in roller skating."
}


];



return(

<section

id="achievement"

className="
relative
py-20
sm:py-28
bg-[#08131E]
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
duration:0.8
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

 Achievements

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

Celebrating milestones, records and achievements
earned through dedication and passion for skating.

</p>


</motion.div>









{/* TIMELINE */}



<div

className="
relative
mt-16
"

>


{/* CENTER LINE */}

<div

className="
hidden
md:block
absolute
left-1/2
top-0
bottom-0
w-[2px]
bg-teal-400/40
"

 />





<div

className="
space-y-10
"

>


{

achievements.map((item,index)=>(


<motion.div


key={index}


initial={{
opacity:0,
x:index%2===0?-60:60
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



className={`
flex
flex-col
md:flex-row
items-center
gap-8

${

index%2===0

?

"md:flex-row"

:

"md:flex-row-reverse"

}

`}


>






{/* CARD */}


<div

className="
w-full
md:w-5/12
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
flex
items-center
gap-4
"

>


<div

className="
w-14
h-14
rounded-2xl
bg-teal-400/10
flex
items-center
justify-center
text-teal-400
"

>

{item.icon}

</div>



<div>

<h3

className="
text-3xl
font-black
text-teal-400
"

>

{item.year}

</h3>

</div>


</div>





<h4

className="
mt-5
text-xl
sm:text-2xl
font-black
text-white
"

>

{item.title}

</h4>



<p

className="
mt-3
text-slate-400
leading-relaxed
"

>

{item.description}

</p>



</div>







{/* DOT */}

<div

className="
hidden
md:flex
w-5
h-5
rounded-full
bg-teal-400
shadow-[0_0_20px_rgba(20,184,166,0.8)]
"

 />





</motion.div>


))


}



</div>


</div>






</div>


</section>


)

}