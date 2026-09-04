import logo from "../../assets/images/logosams.png";

import {
  Link
} from "react-router-dom";

import {
  Menu,
  X
} from "lucide-react";

import {
  useState
} from "react";

import {
  motion
} from "framer-motion";



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

const navbarHeight=75;


window.scrollTo({

top:
section.offsetTop-navbarHeight,

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
px-5
lg:px-8
"

>





{/* LOGO + BRAND */}



<Link

to="/"

className="
flex
items-center
gap-3
"

>


<motion.div

whileHover={{
scale:1.05
}}

className="
w-12
h-12
sm:w-14
sm:h-14
rounded-full
overflow-hidden
shadow-[0_0_25px_rgba(20,184,166,.5)]
shrink-0
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

"0 0 18px rgba(20,184,166,.7)",

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
text-lg
sm:text-xl
leading-none
whitespace-nowrap
"

>

Rushikesh Tarde


</motion.h2>





<p

className="
text-teal-400
font-bold
tracking-[4px]
text-[9px]
mt-1
"

>

SKATES ARENA


</p>



</div>


</Link>









{/* DESKTOP NAV */}



<nav

className="
hidden
lg:flex
items-center
gap-6
text-slate-300
font-semibold
text-sm
xl:text-base
"

>


{

menuItems.map((item)=>(


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









{/* AUTH BUTTONS */}



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
px-6
py-2.5
rounded-xl
bg-teal-500
text-white
font-bold
text-sm
hover:bg-teal-600
transition
shadow-lg
shadow-teal-500/20
"

>

Login


</Link>







<Link

to="/register"

className="
px-6
py-2.5
rounded-xl
bg-teal-500
text-white
font-bold
text-sm
hover:bg-teal-600
transition
shadow-lg
shadow-teal-500/20
"

>

Register


</Link>


</div>








{/* MOBILE MENU BUTTON */}



<button

onClick={()=>setOpen(!open)}

className="
lg:hidden
text-white
"

>

{

open ?

<X size={26}/> :

<Menu size={26}/>

}


</button>





</div>









{/* MOBILE MENU */}



{

open && (


<motion.div


initial={{

opacity:0,

y:-15

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

menuItems.map((item)=>(


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
text-white
text-center
py-3
rounded-xl
font-bold
"

>

Login


</Link>







<Link

to="/register"

className="
bg-teal-500
text-white
text-center
py-3
rounded-xl
font-bold
"

>

Register


</Link>




</div>


</motion.div>


)


}



</header>


);


}