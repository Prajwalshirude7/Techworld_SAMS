import {
  User,
  CreditCard,
  MapPin,
  Calendar,
  ShoppingBag,
  Clock,
  CheckCircle,
  Download,
  Trophy,
  Bell
} from "lucide-react";


import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import generateReceipt from "../../utils/generateReceipt";



export default function StudentDashboard(){


const navigate = useNavigate();



const studentName =
localStorage.getItem("studentName") || "Student";



const [admissionStatus,setAdmissionStatus] =
useState("Not Applied");


const [approvedStudent,setApprovedStudent] =
useState(null);







useEffect(()=>{


const admissionData =
JSON.parse(
localStorage.getItem("admissionApplication") || "null"
);



const status =
localStorage.getItem("admissionStatus")
||
admissionData?.status
||
"Not Applied";



setAdmissionStatus(status);



const student =
JSON.parse(
localStorage.getItem("admissionStudent") || "null"
);



setApprovedStudent(student);



},[]);







const normalizedStatus =
admissionStatus?.trim();



const isApproved =
normalizedStatus === "Approved";



const isPending =
normalizedStatus === "Pending"
||
normalizedStatus === "Pending Approval";



const hasApplied =
isApproved || isPending;









const cards=[

{
title:"Subscription Plans",
desc:"Choose the best membership plan",
icon:CreditCard
},

{
title:"Our Branches",
desc:"Find nearby academy branches",
icon:MapPin
},

{
title:"Programs",
desc:"View available training programs",
icon:Calendar
},

{
title:"Products",
desc:"Buy skating equipment",
icon:ShoppingBag
}

];








return(


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





{/* HEADER */}


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
text-slate-300
mt-3
"

>

Your skating journey starts here.

</p>



</motion.div>









{/* ADMISSION STATUS */}



<div

className="
bg-[#102235]
border
border-slate-700
rounded-3xl
p-6
"

>


<div

className="
flex
items-center
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
isApproved
?
"bg-green-500/20"
:
"bg-yellow-500/20"
}

`}

>


{

isApproved

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


<p className="text-slate-400">

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
isApproved
?
"text-green-400"
:
"text-yellow-400"
}

`}

>


{

isApproved

?

"🎉 Your admission has been approved."

:

isPending

?

"Your admission application has been submitted. Waiting for admin approval."

:

"Start your admission process."

}


</p>


</div>



</div>


</div>









{/* ACCOUNT SECTION */}



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


<p className="text-slate-400">

Account Status

</p>


<h2 className="
text-xl
font-bold
text-white
">

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


<p className="text-slate-400">

Academy Membership

</p>


<h2 className="
text-xl
font-bold
text-white
">

{

isApproved
?
"Active Member"
:
"Not Enrolled"

}

</h2>



<p className="
text-slate-400
text-sm
mt-1
">

{

isApproved
?
"Membership activated."
:
"Complete admission process."

}

</p>


</div>



</div>



</div>









{/* APPLY BUTTON */}


{

!hasApplied && (

<motion.div

className="
rounded-3xl
bg-gradient-to-r
from-[#12344d]
to-[#102235]
border
border-teal-500/40
p-6
"

>


<h2

className="
text-xl
font-bold
text-white
"

>

Ready to start skating? ⛸️

</h2>



<p

className="
text-slate-300
mt-2
"

>

Apply for admission and join SAMS.

</p>




<button

onClick={()=>navigate("/admission")}

className="
mt-5
bg-teal-500
hover:bg-teal-600
px-8
py-3
rounded-xl
font-bold
"

>

Apply For Admission

</button>



</motion.div>

)

}









{/* APPROVED SECTION */}



{

isApproved && (


<motion.div

className="
rounded-3xl
bg-gradient-to-r
from-green-900/40
to-[#102235]
border
border-green-500/40
p-6
"

>


<h2 className="
text-2xl
font-bold
text-white
">

🎉 Welcome to SAMS Academy

</h2>



<p className="
text-green-400
mt-2
">

Your training journey begins now.

</p>





<div

className="
grid
grid-cols-1
sm:grid-cols-3
gap-5
mt-6
"

>


<button

onClick={()=>generateReceipt(approvedStudent)}

className="
bg-[#07131f]
border
border-slate-700
rounded-xl
p-5
font-bold
"

>

<Download

className="
mx-auto
mb-2
text-teal-400
"

/>

Download Receipt

</button>





<button

className="
bg-[#07131f]
border
border-slate-700
rounded-xl
p-5
font-bold
"

>

<Trophy

className="
mx-auto
mb-2
text-teal-400
"

/>

My Programs

</button>





<button

className="
bg-[#07131f]
border
border-slate-700
rounded-xl
p-5
font-bold
"

>

<Bell

className="
mx-auto
mb-2
text-teal-400
"

/>

Announcements

</button>



</div>



</motion.div>

)

}









{/* EXPLORE MORE */}



<div>


<h2 className="
text-3xl
font-bold
mb-6
text-white
">

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

size={28}

className="text-teal-400"

/>


</div>



<h3 className="
text-white
font-bold
text-lg
">

{item.title}

</h3>



<p className="
text-slate-400
mt-2
">

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