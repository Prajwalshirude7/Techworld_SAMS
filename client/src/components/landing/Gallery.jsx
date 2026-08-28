import {
ImageIcon
} from "lucide-react";


import {
motion
} from "framer-motion";


import {
useEffect,
useState
} from "react";



export default function Gallery(){


const [gallery,setGallery]=useState([]);




useEffect(()=>{


const savedGallery = JSON.parse(

localStorage.getItem("academyGallery")

||

"[]"

);


setGallery(savedGallery);



},[]);







return(


<section

id="gallery"

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

Gallery

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

Moments from our skating academy.

</p>



</motion.div>









{/* GALLERY GRID */}



<div

className="
max-w-7xl
mx-auto
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-6
mt-14
"

>





{

gallery.length===0 &&


<div

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

No gallery images available.

</div>


}








{

gallery.map((item,index)=>(


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
scale:1.04,
y:-8
}}



className="
rounded-3xl
overflow-hidden
border
border-slate-700
bg-[#102235]
hover:border-teal-400/50
transition
"

>


<img

src={item.image}

alt="Academy Gallery"

className="
w-full
h-64
object-cover
"

/>





{

item.title &&


<div

className="
p-5
"

>


<h3

className="
font-bold
text-lg
"

>

{item.title}

</h3>


</div>


}



</motion.div>


))


}



</div>





</section>


);


}