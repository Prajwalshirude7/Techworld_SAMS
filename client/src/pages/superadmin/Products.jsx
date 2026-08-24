import {
Plus,
Package,
Edit,
Trash2,
IndianRupee,
Box,
CheckCircle,
XCircle
} from "lucide-react";

import {motion} from "framer-motion";

import {useState} from "react";


export default function Products(){


const [products,setProducts]=useState([

{
name:"Professional Roller Skates",
category:"Skates",
price:"₹4500",
stock:25,
status:"Available"
},


{
name:"Skating Helmet",
category:"Safety Gear",
price:"₹1800",
stock:40,
status:"Available"
},


{
name:"Knee & Elbow Guards",
category:"Protection",
price:"₹1200",
stock:0,
status:"Out of Stock"
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

Product Management

</h1>


<p

className="
text-slate-400
mt-2
"

>

Manage skating products and inventory.

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


<Plus size={20}/>

Add Product


</button>



</motion.div>









{/* PRODUCT CARDS */}



<div

className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-6
mt-10
"

>


{

products.map((product,index)=>(


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
p-6
"

>



<div

className="
flex
justify-between
items-start
"

>


<div

className="
bg-teal-500/20
p-4
rounded-2xl
"

>

<Package

className="
text-teal-400
"

/>

</div>





<div

className="
flex
gap-2
"

>


<button

className="
bg-blue-500/20
text-blue-400
p-2
rounded-lg
"

>

<Edit size={18}/>

</button>



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







<h2

className="
text-xl
font-bold
mt-5
"

>

{product.name}

</h2>



<p

className="
text-teal-400
mt-2
"

>

{product.category}

</p>








<div

className="
mt-5
space-y-3
"

>


<div

className="
flex
items-center
gap-3
"

>

<IndianRupee size={18}/>

{product.price}

</div>




<div

className="
flex
items-center
gap-3
"

>

<Box size={18}/>

Stock: {product.stock}

</div>





<div

className="
flex
items-center
gap-2
"

>


{

product.status==="Available"

?

<CheckCircle

size={18}

className="text-green-400"

/>

:

<XCircle

size={18}

className="text-red-400"

/>


}


<span

className={

product.status==="Available"

?

"text-green-400"

:

"text-red-400"

}

>

{product.status}

</span>



</div>



</div>









<button

className="
mt-6
w-full
bg-[#07131f]
border
border-slate-700
py-3
rounded-xl
font-bold
hover:border-teal-400
transition
"

>

Manage Product

</button>



</motion.div>


))


}



</div>







</div>


)

}