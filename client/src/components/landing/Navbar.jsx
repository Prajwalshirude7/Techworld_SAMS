import logo from "../../assets/images/logosams.png";

import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";


export default function Navbar(){


const [open,setOpen]=useState(false);



const menuItems=[

"About",
"Features",
"Programs",
"Accessories",
"Branches",
"Achievements",
"Contact"

];



return(


<header

className="
fixed
top-0
left-0
z-50
w-full
bg-[#06111b]/90
backdrop-blur-xl
border-b
border-white/10
"

>


<div

className="
max-w-7xl
mx-auto
h-20
flex
items-center
justify-between
px-5
sm:px-8
"

>



{/* BRAND */}



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
scale:1.08
}}


transition={{
duration:0.3
}}


className="
w-12
h-12
rounded-full
overflow-hidden
bg-black
flex
items-center
justify-center
shadow-[0_0_30px_rgba(20,184,166,.6)]
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


<h2

className="
text-white
font-black
text-lg
sm:text-xl
tracking-wide
leading-tight
whitespace-nowrap
"

>

Rushikesh Tarde

</h2>



<p

className="
text-teal-400
font-bold
tracking-[4px]
text-[10px]
sm:text-xs
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
font-semibold
text-slate-300
"

>


{

menuItems.map((item)=>(


<a

key={item}

href={`#${item.toLowerCase()}`}

className="
hover:text-teal-400
transition
duration-300
"

>

{item}

</a>


))

}



</nav>







{/* BUTTONS */}



<div

className="
hidden
md:flex
items-center
gap-4
"

>



<Link

to="/login"

className="
px-7
py-2.5
rounded-xl
bg-teal-500
text-white
font-bold
hover:bg-teal-600
transition
shadow-[0_0_20px_rgba(20,184,166,.3)]
"

>

Login

</Link>





<Link

to="/register"

className="
px-7
py-2.5
rounded-xl
bg-teal-500
text-white
font-bold
hover:bg-teal-600
transition
shadow-[0_0_20px_rgba(20,184,166,.3)]
"

>

Register

</Link>



</div>








{/* MOBILE BUTTON */}



<button


onClick={()=>setOpen(!open)}


className="
lg:hidden
text-white
"

>


{

open

?

<X size={30}/>

:

<Menu size={30}/>

}


</button>



</div>








{/* MOBILE MENU */}



{

open &&


<div

className="
lg:hidden
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
text-white
font-semibold
"

>


{


menuItems.map((item)=>(


<a

key={item}

href={`#${item.toLowerCase()}`}

onClick={()=>setOpen(false)}

className="
hover:text-teal-400
transition
"

>

{item}

</a>


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
"

>

Register

</Link>



</div>



</div>



}



</header>


)


}