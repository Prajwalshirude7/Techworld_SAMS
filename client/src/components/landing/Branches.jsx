import {
MapPin
} from "lucide-react";


import {
motion
} from "framer-motion";


import {
useEffect,
useState
} from "react";




export default function Branches(){


const [branches,setBranches]=useState([]);





useEffect(()=>{


const data = JSON.parse(

localStorage.getItem("academyBranches")

||

"[]"

);



// show only active branches

const activeBranches=data.filter(

item => item.status==="Active"

);


setBranches(activeBranches);



},[]);








return(


<section

id="branches"

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
max-w-6xl
mx-auto
text-center
"

>


<h2

className="
text-3xl
sm:text-5xl
lg:text-6xl
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

Branches

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

Choose your nearest RTSA training center.

</p>



</motion.div>









{/* BRANCH CARDS */}



<div

className="
max-w-7xl
mx-auto
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-6
mt-14
"

>






{

branches.length===0 &&


<motion.div

initial={{
opacity:0
}}

animate={{
opacity:1
}}

className="
col-span-full
bg-[#102235]
border
border-slate-700
rounded-3xl
p-10
text-center
text-slate-400
"

>

No branches available currently.

</motion.div>


}









{

branches.map((branch,index)=>(


<motion.div


key={branch.id}


initial={{

opacity:0,

y:40

}}



whileInView={{

opacity:1,

y:0

}}



transition={{

delay:index*0.1,

duration:0.5

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
shadow-lg
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


<MapPin

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

{branch.branchName}

</h3>







<p

className="
text-slate-400
mt-2
"

>

{branch.location}

</p>








{

branch.phone &&


<p

className="
text-sm
text-teal-400
mt-3
font-semibold
"

>

{branch.phone}

</p>


}






</motion.div>



))


}





</div>







</section>


);


}