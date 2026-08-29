import {
  Phone,
  Mail,
  MapPin
} from "lucide-react";

import {
  motion
} from "framer-motion";


export default function Contact(){


return(


<section

id="contact"

className="
bg-[#07131f]
text-white
py-20
px-5
sm:px-8
"

>


<div

className="
max-w-5xl
mx-auto
text-center
"

>


<h2

className="
text-4xl
sm:text-5xl
font-black
"

>

Contact

<span className="text-teal-400">
 RTSA
</span>

</h2>



<p

className="
text-slate-400
mt-4
text-lg
"

>

Start your skating journey with Rushikesh Tarde Skates Arena.

</p>





<motion.div

initial={{
opacity:0,
y:30
}}

whileInView={{
opacity:1,
y:0
}}

transition={{
duration:0.5
}}

className="
mt-12
bg-[#102235]
border
border-slate-700
rounded-3xl
p-8
sm:p-10
"

>


<h3

className="
text-3xl
font-black
"

>

Rushikesh Tarde Skates Arena

</h3>





<div

className="
grid
grid-cols-1
md:grid-cols-3
gap-8
mt-10
"

>


{/* PHONE */}

<div>


<div

className="
bg-teal-500/20
w-fit
mx-auto
p-4
rounded-2xl
"

>

<Phone

className="text-teal-400"

/>

</div>



<h4

className="
mt-4
text-slate-400
"

>

Call Us

</h4>



<p

className="
font-bold
mt-2
"

>

8830806221

<br/>

7218158989

<br/>

7666345539

</p>


</div>








{/* EMAIL */}


<div>


<div

className="
bg-teal-500/20
w-fit
mx-auto
p-4
rounded-2xl
"

>

<Mail

className="text-teal-400"

/>

</div>




<h4

className="
mt-4
text-slate-400
"

>

Email

</h4>



<p

className="
font-bold
mt-2
break-all
"

>

rushikeshtarde95@gmail.com

</p>


</div>








{/* BRANCHES */}


<div>


<div

className="
bg-teal-500/20
w-fit
mx-auto
p-4
rounded-2xl
"

>

<MapPin

className="text-teal-400"

/>

</div>





<h4

className="
mt-4
text-slate-400
"

>

Branches

</h4>



<p

className="
font-bold
mt-2
"

>

Rahuri

<br/>

Rahata

<br/>

Shirdi

<br/>

Ahmednagar

</p>


</div>




</div>




</motion.div>



</div>


</section>


);


}