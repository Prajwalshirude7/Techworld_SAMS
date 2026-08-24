import {
Menu,
Bell,
UserCircle
} from "lucide-react";


export default function Topbar({setOpen}){


return(

<header

className="
fixed
top-0
left-0
lg:left-64
right-0
h-24
bg-[#07131f]
border-b
border-slate-800
z-30
flex
items-center
justify-between
px-5
"

>


<button

onClick={()=>setOpen(true)}

className="
lg:hidden
text-white
"

>

<Menu/>

</button>




<div

className="
hidden
sm:flex
bg-[#102235]
border
border-slate-700
rounded-xl
px-5
py-3
w-80
"

>

<input

placeholder="Search anything..."

className="
bg-transparent
outline-none
text-white
w-full
"

/>

</div>





<div

className="
flex
items-center
gap-5
"

>


<Bell
className="
text-slate-300
"
/>



<div

className="
flex
items-center
gap-3
bg-[#102235]
px-4
py-2
rounded-xl
"

>

<UserCircle

size={35}

className="
text-teal-400
"

/>


<div>

<p
className="
text-white
font-bold
text-sm
"
>
Super Admin
</p>


<p
className="
text-slate-400
text-xs
"
>
Administrator
</p>


</div>


</div>



</div>


</header>


)

}