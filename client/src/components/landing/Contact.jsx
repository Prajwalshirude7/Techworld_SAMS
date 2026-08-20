import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  MessageCircle
} from "lucide-react";


export default function Contact(){


return(

<section

id="contact"

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





{/* HEADING */}



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

transition={{
duration:0.7
}}

className="
text-center
"

>


<h2

className="
text-4xl
sm:text-5xl
md:text-6xl
font-black
text-white
"

>

Contact

<span

className="
text-teal-400
drop-shadow-[0_0_25px_rgba(20,184,166,0.8)]
"

>

 RTSA

</span>


</h2>



<p

className="
mt-5
text-slate-300
text-lg
"

>

Start your skating journey with
Rushikesh Tarde Skates Arena.

</p>



</motion.div>








<div

className="
mt-14
grid
lg:grid-cols-2
gap-10
"

>







{/* CONTACT DETAILS */}



<motion.div

initial={{
opacity:0,
x:-50
}}

whileInView={{
opacity:1,
x:0
}}

viewport={{
once:true
}}

transition={{
duration:0.7
}}

className="
bg-[#102235]
border
border-white/10
rounded-3xl
p-7
sm:p-10
"

>



<h3

className="
text-3xl
font-black
text-white
"

>

Rushikesh Tarde Skates Arena

</h3>





<div

className="
mt-8
space-y-6
"

>




<div

className="
flex
gap-4
items-center
"

>

<div

className="
w-12
h-12
rounded-xl
bg-teal-400/10
text-teal-400
flex
items-center
justify-center
"

>

<Phone/>

</div>


<div>

<p className="text-slate-400">
Call Us
</p>

<p className="text-white font-bold">
8830806221
</p>

<p className="text-white font-bold">
7218158989
</p>

<p className="text-white font-bold">
7666345539
</p>

</div>


</div>






<div

className="
flex
gap-4
items-center
"

>

<div

className="
w-12
h-12
rounded-xl
bg-teal-400/10
text-teal-400
flex
items-center
justify-center
"

>

<Mail/>

</div>


<div>

<p className="text-slate-400">
Email
</p>

<p className="
text-white
font-bold
break-all
">

rushikeshtarde95@gmail.com

</p>

</div>


</div>







<div

className="
flex
gap-4
items-center
"

>

<div

className="
w-12
h-12
rounded-xl
bg-teal-400/10
text-teal-400
flex
items-center
justify-center
"

>

<MapPin/>

</div>


<div>

<p className="text-slate-400">
Branches
</p>

<p className="text-white font-bold">

Rahuri • Rahata • Shirdi
<br/>
Ahmednagar & More

</p>


</div>


</div>





</div>







<button

className="
mt-8
flex
items-center
justify-center
gap-3
w-full
py-4
rounded-xl
bg-green-500
text-white
font-black
hover:bg-green-600
transition
"

>

<MessageCircle/>

Chat On WhatsApp

</button>






</motion.div>









{/* CONTACT FORM */}




<motion.div

initial={{
opacity:0,
x:50
}}

whileInView={{
opacity:1,
x:0
}}

viewport={{
once:true
}}

transition={{
duration:0.7
}}

className="
bg-[#102235]
border
border-white/10
rounded-3xl
p-7
sm:p-10
"

>



<h3

className="
text-3xl
font-black
text-white
"

>

Send An Enquiry

</h3>





<form

className="
mt-8
space-y-5
"

>


<input

type="text"

placeholder="Your Name"

className="
w-full
bg-[#07131f]
border
border-white/10
rounded-xl
px-5
py-4
text-white
outline-none
focus:border-teal-400
"

/>



<input

type="email"

placeholder="Email Address"

className="
w-full
bg-[#07131f]
border
border-white/10
rounded-xl
px-5
py-4
text-white
outline-none
focus:border-teal-400
"

/>



<input

type="tel"

placeholder="Mobile Number"

className="
w-full
bg-[#07131f]
border
border-white/10
rounded-xl
px-5
py-4
text-white
outline-none
focus:border-teal-400
"

/>



<textarea

rows="4"

placeholder="Message"

className="
w-full
bg-[#07131f]
border
border-white/10
rounded-xl
px-5
py-4
text-white
outline-none
focus:border-teal-400
"

/>




<button

type="button"

className="
w-full
flex
items-center
justify-center
gap-3
py-4
rounded-xl
bg-teal-500
text-white
font-black
hover:bg-teal-600
transition
"

>

<Send size={20}/>

Submit Enquiry

</button>



</form>




</motion.div>





</div>



</div>


</section>


)

}