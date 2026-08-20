import {
  User,
  CreditCard,
  FileText,
  MapPin,
  Calendar,
  ShoppingBag,
  Clock,
  CheckCircle
} from "lucide-react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


export default function StudentDashboard() {


  const navigate = useNavigate();


  const studentName =
    localStorage.getItem("studentName") || "Student";


  const admissionData =
    JSON.parse(
      localStorage.getItem("admissionApplication") || "null"
    );


  const admissionStatus =
    admissionData?.status || "Not Applied";



  const cards = [

    {
      title:"Subscription Plans",
      desc:"Choose the best plan for your skating journey",
      icon:CreditCard
    },

    {
      title:"Our Branches",
      desc:"Find nearby skating academy branches",
      icon:MapPin
    },

    {
      title:"Our Programs",
      desc:"View available skating programs",
      icon:Calendar
    },

    {
      title:"Skating Products",
      desc:"Buy quality skating equipment",
      icon:ShoppingBag
    }

  ];



return (

<div
className="
min-h-screen
bg-[#07131f]
p-4
sm:p-6
lg:p-10
space-y-8
"
>



{/* Welcome Section */}


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
rounded-3xl
bg-gradient-to-r
from-[#102235]
to-[#163b57]
border
border-slate-700
p-6
sm:p-8
"

>


<h1

className="
text-3xl
sm:text-4xl
font-bold
text-white
"

>

Welcome, {studentName}! 👋

</h1>


<p

className="
mt-3
text-slate-300
text-base
sm:text-lg
"

>

Your journey with Skating Academy begins here.

</p>


</motion.div>









{/* Admission Status */}



<motion.div

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

className="
rounded-3xl
bg-[#102235]
border
border-slate-700
p-6
"

>


<div

className="
flex
flex-col
sm:flex-row
items-start
sm:items-center
gap-5
"

>


<div

className={`
w-16
h-16
rounded-2xl
flex
items-center
justify-center


${
admissionStatus==="Approved"

?
"bg-green-500/20"

:

"bg-yellow-500/20"

}

`}

>


{

admissionStatus==="Approved"

?

<CheckCircle
size={35}
className="text-green-400"
/>

:

<Clock
size={35}
className="text-yellow-400"
/>

}


</div>





<div>


<p
className="
text-slate-400
"
>

Admission Status

</p>



<h2

className="
text-2xl
font-bold
text-white
"

>

{admissionStatus}

</h2>



<p

className={`
mt-2

${
admissionStatus==="Approved"

?
"text-green-400"

:
"text-yellow-400"

}

`}

>


{

admissionStatus==="Approved"

?

"🎉 Welcome to Skating Academy. Your training journey starts now."

:

"Your admission request is waiting for academy approval."

}


</p>



</div>



</div>


</motion.div>










{/* Account + Membership */}



<div

className="
grid
grid-cols-1
md:grid-cols-2
gap-6
"

>



<div

className="
bg-[#102235]
border
border-slate-700
rounded-3xl
p-6
flex
items-center
gap-5
"

>


<div

className="
bg-teal-500/20
p-4
rounded-2xl
"

>

<User
className="text-teal-400"
/>

</div>



<div>


<p className="
text-slate-400
">

Account Status

</p>


<h2

className="
text-xl
font-bold
text-white
"

>

Registered User

</h2>



</div>


</div>









<div

className="
bg-[#102235]
border
border-slate-700
rounded-3xl
p-6
flex
items-center
gap-5
"

>


<div

className="
bg-cyan-500/20
p-4
rounded-2xl
"

>

<CreditCard
className="text-cyan-400"
/>

</div>



<div>


<p
className="
text-slate-400
"
>

Academy Membership

</p>


<h2

className="
text-xl
font-bold
text-white
"

>

Not Enrolled

</h2>



<p

className="
text-slate-400
text-sm
"

>

You are not enrolled in any program yet.

</p>



</div>


</div>



</div>









{/* Admission CTA */}



<motion.div

whileHover={{
scale:1.01
}}

className="
rounded-3xl
bg-gradient-to-r
from-[#12344d]
to-[#102235]
border
border-teal-500/40
p-6
flex
flex-col
md:flex-row
items-center
justify-between
gap-5
"

>


<div>


<h2

className="
text-xl
font-bold
text-white
"

>

Ready to start your skating journey? ⛸️

</h2>


<p

className="
text-slate-300
mt-2
"

>

Apply for admission and become part of our academy.

</p>



</div>






<button


onClick={()=>navigate("/admission")}


className="
bg-teal-500
hover:bg-teal-600
text-white
font-bold
px-8
py-3
rounded-xl
w-full
md:w-auto
"

>

Apply For Admission

</button>



</motion.div>










{/* Explore More */}



<div>


<h2

className="
text-3xl
font-bold
text-white
mb-6
"

>

Explore More

</h2>





<div

className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-6
"

>


{

cards.map((item,index)=>{


const Icon=item.icon;



return(


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
cursor-pointer
"

>



<div

className="
bg-teal-500/20
p-4
rounded-2xl
w-fit
mb-5
"

>


<Icon

className="
text-teal-400
"

size={28}

/>


</div>




<h3

className="
text-white
font-bold
text-lg
"

>

{item.title}

</h3>




<p

className="
text-slate-400
mt-2
text-sm
"

>

{item.desc}

</p>



</motion.div>



)


})

}



</div>


</div>






</div>


);


}