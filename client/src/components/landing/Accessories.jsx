import { 
  motion 
} from "framer-motion";


import {
  useEffect,
  useState
} from "react";


import {
  ShoppingBag,
  Send,
  X
} from "lucide-react";


import toast from "react-hot-toast";





export default function Accessories(){



const [products,setProducts]=useState([]);


const [showModal,setShowModal]=useState(false);


const [selectedProduct,setSelectedProduct]=useState(null);



const [form,setForm]=useState({

name:"",
mobile:""

});







// LOAD PRODUCTS


useEffect(()=>{


const data = JSON.parse(

localStorage.getItem("academyAccessories")

||

"[]"

);



setProducts(

data.filter(

item=>item.status==="Active"

)

);



},[]);









const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};








const sendRequest=()=>{


if(
!form.name ||
!form.mobile
){


toast.error(
"Please enter name and mobile number"
);


return;


}



if(form.mobile.length!==10){


toast.error(
"Enter valid mobile number"
);


return;


}






const request={


id:Date.now(),


productId:selectedProduct.id,


productName:selectedProduct.name,


price:selectedProduct.price,


customerName:form.name,


mobile:form.mobile,


status:"Pending",


date:new Date().toLocaleDateString()


};






const oldRequests = JSON.parse(

localStorage.getItem("accessoryRequests")

||

"[]"

);





localStorage.setItem(

"accessoryRequests",

JSON.stringify(

[
...oldRequests,
request
]

)

);





toast.success(
"Request sent successfully!"
);



setForm({

name:"",
mobile:""

});


setShowModal(false);


};









return(



<section

id="products"

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
absolute
right-0
top-20
w-80
h-80
bg-teal-500/20
blur-[120px]
rounded-full
"

/>









<div

className="
relative
z-10
max-w-7xl
mx-auto
px-5
sm:px-8
lg:px-10
"

>







{/* HEADER */}



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

className="
text-center
"

>



<h2

className="
text-3xl
sm:text-5xl
md:text-6xl
font-black
text-white
"

>


Skating


<span

className="
text-teal-400
drop-shadow-[0_0_30px_rgba(20,184,166,0.8)]
"

>

 Accessories

</span>



</h2>







<p

className="
mt-5
text-slate-300
text-lg
"

>

Premium skating equipment and accessories
managed by RTSA Academy.

</p>




</motion.div>









{/* PRODUCTS */}



<div

className="
mt-14
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-6
"

>






{

products.length===0 &&


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

No accessories available.

</div>


}









{

products.map((item,index)=>(



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


whileHover={{
y:-8
}}



className="
bg-[#102235]
border
border-white/10
rounded-3xl
overflow-hidden
hover:border-teal-400
transition
shadow-xl
"

>






<img


src={item.image}


alt={item.name}


className="
w-full
h-48
object-cover
"

/>







<div

className="
p-3
sm:p-5
"

>


<div

className="
flex
items-center
gap-2
text-teal-400
"

>

<ShoppingBag size={20}/>


</div>






<h3

className="
mt-4
text-xl
font-black
text-white
"

>

{item.name}

</h3>








<p

className="
text-xs
sm:text-sm
text-slate-400
mt-2
line-clamp-2
"
>

{item.description}

</p>








<p

className="
mt-4
text-white
font-bold
"

>

₹{item.price}

</p>








<button


onClick={()=>{


setSelectedProduct(item);

setShowModal(true);


}}



className="
mt-5
w-full
bg-teal-500
py-3
rounded-xl
font-bold
flex
justify-center
items-center
gap-2
hover:bg-teal-600
"

>


<Send size={18}/>

Send Request


</button>






</div>



</motion.div>


))


}



</div>









</div>









{/* REQUEST MODAL */}



{

showModal &&


<div

className="
fixed
inset-0
bg-black/70
z-50
flex
items-center
justify-center
p-4
"

>


<div

className="
bg-[#102235]
border
border-slate-700
rounded-3xl
p-6
w-full
max-w-md
"

>



<div

className="
flex
justify-between
items-center
"

>


<h2

className="
text-2xl
font-black
text-white
"

>

Request Product

</h2>




<button

onClick={()=>setShowModal(false)}

>

<X/>

</button>


</div>







<p

className="
text-teal-400
mt-3
font-bold
"

>

{selectedProduct?.name}

</p>








<input


name="name"


placeholder="Your Name"


value={form.name}


onChange={handleChange}


className="
w-full
mt-5
bg-[#07131f]
border
border-slate-700
rounded-xl
p-3
text-white
"


/>







<input


name="mobile"


placeholder="Mobile Number"


value={form.mobile}


onChange={handleChange}


className="
w-full
mt-4
bg-[#07131f]
border
border-slate-700
rounded-xl
p-3
text-white
"


/>








<button


onClick={sendRequest}


className="
mt-5
w-full
bg-teal-500
py-3
rounded-xl
font-bold
"

>

Send Request

</button>




</div>


</div>


}



</section>


);


}