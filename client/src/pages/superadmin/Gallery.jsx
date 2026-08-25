import {
Upload,
Image,
Trash2,
Plus
} from "lucide-react";

import {motion} from "framer-motion";

import {useState} from "react";


export default function Gallery(){


const [images,setImages]=useState([

{
title:"Training Session ",
category:"Training",
url:"https://images.unsplash.com/photo-1547347298-4074fc3086f0"
},

{
title:"Competition Day",
category:"Events",
url:"https://images.unsplash.com/photo-1526401485004-2aa7f6f5b5f7"
},

{
title:"Academy Practice",
category:"Practice",
url:"https://images.unsplash.com/photo-1518611012118-696072aa579a"
}

]);





return(

<div

className="
min-h-screen
bg-[#07131f]
p-5
sm:p-8
lg:p-10
text-white
"

>


{/* HEADER */}


<motion.div

initial={{
opacity:0,
y:-20
}}

animate={{
opacity:1,
y:0
}}

className="
flex
flex-col
sm:flex-row
justify-between
gap-5
"

>


<div>


<h1

className="
text-3xl
sm:text-4xl
font-black
"

>

Gallery Management

</h1>


<p

className="
text-slate-400
mt-2
"

>

Upload and manage academy photos.

</p>


</div>





<button

className="
bg-teal-500
hover:bg-teal-600
px-6
py-3
rounded-xl
font-bold
flex
items-center
gap-2
"

>


<Upload size={20}/>

Upload Image


</button>



</motion.div>









{/* UPLOAD BOX */}



<motion.div

whileHover={{
scale:1.01
}}

className="
mt-10
bg-[#102235]
border
border-dashed
border-slate-600
rounded-3xl
p-8
flex
flex-col
items-center
justify-center
text-center
"

>


<div

className="
bg-teal-500/20
p-5
rounded-2xl
"

>

<Image

size={40}

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

Upload New Gallery Image

</h2>


<p

className="
text-slate-400
mt-2
"

>

Drag and drop image or choose from device.

</p>


<button

className="
mt-5
bg-teal-500
px-6
py-3
rounded-xl
font-bold
flex
items-center
gap-2
"

>

<Plus size={18}/>

Choose Image

</button>


</motion.div>










{/* IMAGE GRID */}



<div

className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-6
mt-10
"

>


{

images.map((item,index)=>(


<motion.div

key={index}

whileHover={{
y:-8
}}

className="
bg-[#102235]
border
border-slate-700
rounded-3xl
overflow-hidden
"

>


<img

src={item.url}

alt={item.title}

className="
w-full
h-56
object-cover
"

/>





<div

className="
p-5
"

>


<div

className="
flex
justify-between
items-start
"

>


<div>


<h3

className="
font-bold
text-lg
"

>

{item.title}

</h3>


<p

className="
text-teal-400
text-sm
mt-1
"

>

{item.category}

</p>


</div>



<button

className="
bg-red-500/20
text-red-400
p-2
rounded-lg
"

>

<Trash2 size={18}/>

</button>



</div>


</div>




</motion.div>


))


}


</div>







</div>


)

}