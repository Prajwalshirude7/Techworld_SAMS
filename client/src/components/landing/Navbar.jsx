import logo from "../../assets/images/logosams.png";

import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";


export default function Navbar(){


const [open,setOpen]=useState(false);



const menuItems=[

{
name:"About",
id:"about"
},

{
name:"Programs",
id:"programs"
},

{
name:"Branches",
id:"branches"
},

{
name:"Gallery",
id:"gallery"
},

{
name:"Achievements",
id:"achievements"
},

{
name:"Accessories",
id:"accessories"
},

{
name:"Contact",
id:"contact"
}

];






const handleScroll=(id)=>{


const section=document.getElementById(id);


if(section){

const navbarHeight = 80;

const position =
section.offsetTop - navbarHeight;


window.scrollTo({

top:position,

behavior:"smooth"

});

}


setOpen(false);

};







return(


<header

className="
fixed
top-0
left-0
z-50
w-full
h-[72px]
bg-[#06111b]/95
backdrop-blur-xl
border-b
border-white/10
"

>



<div

className="
max-w-7xl
mx-auto
h-full
flex
items-center
justify-between
px-4
sm:px-6
"

>





{/* LOGO */}


<Link

to="/"

className="
flex
items-center
gap-2
"

>


<motion.div

whileHover={{
scale:1.08
}}

className="
w-11
h-11
rounded-full
overflow-hidden
shadow-[0_0_25px_rgba(20,184,166,.5)]
"

>


<img

src={logo}

alt="RTSA Logo"

className="
w-full
h-full
object-cover
"

/>


</motion.div>






<div>


<motion.h2

animate={{
textShadow:[
"0 0 0px rgba(20,184,166,0)",
"0 0 20px rgba(20,184,166,0.8)",
"0 0 0px rgba(20,184,166,0)"
]
}}

transition={{
duration:2.5,
repeat:Infinity
}}

className="
text-white
font-black
text-base
sm:text-lg
leading-tight
"

>

Rushikesh Tarde

</motion.h2>



<p

className="
text-teal-400
font-bold
tracking-[3px]
text-[9px]
"

>

SKATES ARENA

</p>


</div>


</Link>








{/* DESKTOP MENU */}



<nav

className="
hidden
lg:flex
items-center
gap-5
text-slate-300
font-semibold
text-sm
"

>


{

menuItems.map(item=>(


<button

key={item.id}

onClick={()=>handleScroll(item.id)}

className="
hover:text-teal-400
transition
duration-300
"

>

{item.name}

</button>


))


}



</nav>









{/* BUTTONS */}



<div

className="
hidden
md:flex
items-center
gap-3
"

>


<Link

to="/login"

className="
px-5
py-2
rounded-xl
bg-teal-500
text-white
font-bold
text-sm
hover:bg-teal-600
transition
"

>

Login

</Link>







<Link

to="/register"

className="
px-5
py-2
rounded-xl
bg-teal-500
text-white
font-bold
text-sm
hover:bg-teal-600
transition
"

>

Register

</Link>



</div>








{/* MOBILE ICON */}



<button

onClick={()=>setOpen(!open)}

className="
lg:hidden
text-white
"

>


{

open ?

<X size={28}/> :

<Menu size={28}/>

}


</button>





</div>









{/* MOBILE MENU */}



{

open &&


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
lg:hidden
absolute
top-[72px]
left-0
w-full
bg-[#06111b]
border-t
border-white/10
px-6
py-6
"

>



<div

className="
flex
flex-col
gap-5
"

>



{

menuItems.map(item=>(


<button

key={item.id}

onClick={()=>handleScroll(item.id)}

className="
text-left
text-white
font-semibold
hover:text-teal-400
"

>

{item.name}

</button>


))


}





<Link

to="/login"

className="
bg-teal-500
text-center
py-3
rounded-xl
font-bold
text-white
"

>

Login

</Link>







<Link

to="/register"

className="
bg-teal-500
text-center
py-3
rounded-xl
font-bold
text-white
"

>

Register

</Link>




</div>



</motion.div>


}



</header>


);


}