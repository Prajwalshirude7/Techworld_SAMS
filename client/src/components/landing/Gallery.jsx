import {
  Quote,
  Trophy
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
py-16
sm:py-20
px-4
sm:px-8
lg:px-12
scroll-mt-20
"

>







{/* HEADER */}



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
drop-shadow-[0_0_25px_rgba(20,184,166,.8)]
"

>

SuccessStories

</span>



</h2>






<p

className="
mt-4
text-sm
sm:text-lg
text-slate-400
max-w-3xl
mx-auto
"

>

Celebrating achievements, dedication and memorable moments from our skating academy.

</p>



</motion.div>









{/* GALLERY GRID */}



<div

className="
max-w-6xl
mx-auto
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-5
sm:gap-6
mt-10
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
rounded-2xl
p-8
text-center
text-slate-400
"

>

No success stories available yet.

</div>


}









{

gallery.map((item,index)=>(



<motion.div


key={item.id}


initial={{

opacity:0,

y:30

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

y:-5

}}



className="
bg-[#102235]
border
border-slate-700
rounded-2xl
overflow-hidden
hover:border-teal-400/40
transition
w-full
max-w-sm
mx-auto
"

>







{/* IMAGE */}


<img


src={item.image}


alt={item.title}


className="
w-full
h-40
sm:h-48
object-cover
"

/>









<div

className="
p-4
sm:p-5
"

>







{/* TITLE */}



<h3

className="
text-lg
sm:text-xl
font-black
"

>

{item.title}

</h3>









{/* CATEGORY */}



{

item.category &&


<p

className="
mt-1
text-sm
text-teal-400
font-semibold
"

>

{item.category}

</p>


}









{/* SUCCESS STORY */}



{

item.description &&


<div

className="
mt-4
"

>


<div

className="
flex
items-center
gap-2
text-sm
font-bold
"

>


<Trophy

size={16}

className="text-yellow-400"

/>


Success Story


</div>





<p

className="
mt-2
text-sm
text-slate-300
leading-5
"

>

{item.description}

</p>




</div>


}









{/* QUOTE */}



{

item.quote &&


<div

className="
mt-4
bg-[#07131f]
border
border-teal-500/20
rounded-xl
p-3
"

>


<div

className="
flex
items-center
gap-2
text-sm
text-teal-400
font-bold
"

>


<Quote size={15}/>


Academy Quote


</div>





<p

className="
mt-2
text-sm
text-slate-300
italic
leading-5
"

>

"{item.quote}"

</p>



</div>


}





</div>







</motion.div>



))


}



</div>







</section>


);


}