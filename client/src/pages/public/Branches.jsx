import {
MapPin
} from "lucide-react";


import {
useEffect,
useState
} from "react";


import {
motion
} from "framer-motion";



export default function Branches(){


const [branches,setBranches]=useState([]);




useEffect(()=>{


const data = JSON.parse(

localStorage.getItem("academyBranches")

||

"[]"

);


setBranches(

data.filter(

item=>item.status==="Active"

)

);


},[]);





return(

<div

className="
bg-[#07131f]
text-white
py-16
px-5
sm:px-8
"

>


<h1

className="
text-center
text-3xl
sm:text-5xl
font-black
mb-12
"

>

Our Branches

</h1>






<div

className="
max-w-6xl
mx-auto
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-6
"

>


{

branches.length===0 &&

<p

className="
text-slate-400
text-center
col-span-full
"

>

No branches available.

</p>

}







{

branches.map((branch,index)=>(


<motion.div


key={branch.id}


initial={{
opacity:0,
y:20
}}


animate={{
opacity:1,
y:0
}}


transition={{
delay:index*0.05
}}



className="
bg-[#102235]
border
border-slate-700
rounded-2xl
p-4
sm:p-6
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

className="
text-teal-400
"

/>


</div>



<h2

className="
text-xl
font-bold
mt-5
"

>

{branch.branchName}

</h2>



<p

className="
text-slate-400
mt-2
"

>

{branch.location}

</p>



</motion.div>


))


}


</div>



</div>


);


}