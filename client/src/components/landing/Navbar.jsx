import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";


export default function Navbar(){

const [open,setOpen]=useState(false);


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
h-24
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
gap-4
"
>


<motion.div

whileHover={{
scale:1.08
}}

className="
w-14
h-14
rounded-full
bg-teal-500
flex
items-center
justify-center
text-white
font-black
text-3xl
shadow-[0_0_30px_rgba(20,184,166,.6)]
"

>

R

</motion.div>



<div>


<h2
className="
text-white
font-extrabold
text-xl
sm:text-3xl
tracking-wide
"

>

Rushikesh Tarde

</h2>



<p
className="
text-teal-400
font-bold
tracking-[5px]
text-xs
sm:text-sm
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
gap-8
font-semibold
text-slate-300
"
>


{
[
"About",
"Features",
"Programs",
"Accessories",
"Branches",
"Achievements",
"Contact"

].map((item)=>(

<a
key={item}
href={`#${item.toLowerCase()}`}
className="
hover:text-teal-400
transition
"
>

{item}

</a>


))
}


</nav>





<div
className="
hidden
md:flex
gap-4
"
>


<Link
to="/login"
className="
px-6
py-3
rounded-xl
bg-teal-500
font-bold
text-white
hover:bg-teal-600
transition
"
>

Login

</Link>



<Link
to="/register"
className="
px-6
py-3
rounded-xl
bg-teal-500
font-bold
text-white
hover:bg-teal-600
transition
"
>

Register

</Link>



</div>





<button

onClick={()=>setOpen(!open)}

className="
lg:hidden
text-white
"

>

{
open?
<X size={32}/>
:
<Menu size={32}/>
}

</button>


</div>




{
open &&

<div
className="
lg:hidden
bg-[#06111b]
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
[
"Home",
"About",
"Features",
"Programs",
"Accessories",
"Branches",
"Achievements",
"Contact"

].map(item=>(

<a
key={item}
href={`#${item.toLowerCase()}`}
onClick={()=>setOpen(false)}
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