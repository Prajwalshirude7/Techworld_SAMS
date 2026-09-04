import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Globe
} from "lucide-react";


export default function Footer(){

return(

<footer

className="
bg-[#050d16]
border-t
border-white/10
py-8
sm:py-12
"

>


<div

className="
max-w-7xl
mx-auto
px-5
sm:px-8
lg:px-10
"

>


<div

className="
grid
sm:grid-cols-2
lg:grid-cols-4
gap-6
sm:gap-10
"

>



{/* BRAND */}

<motion.div

initial={{
opacity:0,
y:30
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

>


<h2

className="
text-2xl
font-black
text-white
"

>

Rushikesh Tarde

</h2>



<p

className="
text-teal-400
font-bold
tracking-[4px]
text-sm
mt-1
"

>

SKATES ARENA

</p>



<p

className="
mt-5
text-slate-400
leading-relaxed
"

>

Professional roller skating academy
focused on developing confident
and competitive athletes.

</p>




<div

className="
flex
gap-4
mt-6
"

>


<button

className="
w-10
h-10
rounded-full
bg-white/10
text-white
flex
items-center
justify-center
hover:bg-teal-500
transition
"

>

<Globe size={20}/>

</button>



<button

className="
w-10
h-10
rounded-full
bg-white/10
text-white
flex
items-center
justify-center
hover:bg-teal-500
transition
"

>

<Globe size={20}/>

</button>


</div>



</motion.div>






{/* QUICK LINKS */}


<div>


<h3

className="
text-white
font-black
text-lg
"

>

Quick Links

</h3>



<ul

className="
mt-5
space-y-3
text-slate-400
"

>

<li>
<a href="#home">
Home
</a>
</li>


<li>
<a href="#about">
About
</a>
</li>


<li>
<a href="#programs">
Programs
</a>
</li>


<li>
<a href="#achievement">
Achievements
</a>
</li>


<li>
<a href="#contact">
Contact
</a>
</li>


</ul>


</div>







{/* SERVICES */}



<div>


<h3

className="
text-white
font-black
text-lg
"

>

Services

</h3>



<ul

className="
mt-5
space-y-3
text-slate-400
"

>


<li>
Beginner Training
</li>


<li>
Professional Training
</li>


<li>
Competition Preparation
</li>


<li
className="
text-teal-400
font-bold
"
>
Skating Accessories
</li>


</ul>


</div>








{/* CONTACT */}



<div>


<h3

className="
text-white
font-black
text-lg
"

>

Contact

</h3>




<div

className="
mt-5
space-y-4
text-slate-400
"

>



<p

className="
flex
items-center
gap-3
"

>

<Phone
size={18}
className="text-teal-400"
/>

8830806221

</p>




<p

className="
flex
items-center
gap-3
"

>

<Phone
size={18}
className="text-teal-400"
/>

7218158989

</p>




<p

className="
flex
items-center
gap-3
break-all
"

>

<Mail
size={18}
className="text-teal-400"
/>

rushikeshtarde95@gmail.com

</p>



</div>



</div>





</div>







{/* COPYRIGHT */}



<div

className="
mt-12
pt-6
border-t
border-white/10
text-center
text-slate-500
text-sm
"

>


© {new Date().getFullYear()} Rushikesh Tarde Skates Arena. All Rights Reserved.


</div>



</div>


</footer>


)

}