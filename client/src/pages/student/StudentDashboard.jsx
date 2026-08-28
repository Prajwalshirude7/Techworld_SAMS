import {
  MapPin,
  CalendarDays,
  Users,
  Trophy,
  ShieldCheck,
  Clock,
  Award,
  Heart,
  Bell,
  Download
} from "lucide-react";


import {
  motion
} from "framer-motion";


import {
  useEffect,
  useState
} from "react";


import {
  useNavigate
} from "react-router-dom";


import generateReceipt from "../../utils/generateReceipt";





export default function StudentDashboard(){


const navigate = useNavigate();


const [student,setStudent]=useState(null);

const [status,setStatus]=useState("Not Applied");

const [announcements,setAnnouncements]=useState([]);






useEffect(()=>{


const application = JSON.parse(

localStorage.getItem("admissionApplication")

|| 

"null"

);



if(application){

setStudent(application);

setStatus(application.status);

}





if(application?.status==="Approved"){


const data = JSON.parse(

localStorage.getItem("academyAnnouncements")

||

"[]"

);


setAnnouncements(data);


}


},[]);





const isPending=status==="Pending Approval";

const isApproved=status==="Approved";





return(


<div

className="
min-h-screen
overflow-x-hidden
bg-[#07131f]
text-white
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
bg-gradient-to-r
from-[#102235]
to-[#163b57]
border
border-slate-700
rounded-3xl
p-5
sm:p-8
"

>



<h1

className="
text-3xl
sm:text-5xl
lg:text-6xl
font-black
leading-tight
break-words
"

>

Welcome,

<span

className="
text-teal-400
ml-2
"

>

{student?.name || "Student"}

</span>

👋


</h1>




<p

className="
mt-4
text-base
sm:text-lg
text-slate-300
"

>

Your SAMS skating journey dashboard.

</p>





{/* FEATURES */}



<div

className="
mt-8
grid
grid-cols-1
sm:grid-cols-2
gap-5
"

>


<InfoCard

icon={<Award/>}

title="Expert Coaches"

text="Learn from the best"

/>



<InfoCard

icon={<Trophy/>}

title="Achievements"

text="Build your legacy"

/>



<InfoCard

icon={<Users/>}

title="Community"

text="Grow together"

/>



<InfoCard

icon={<ShieldCheck/>}

title="Professional"

text="Safe training"

/>



</div>



</motion.div>









{/* BEFORE APPLY */}



{

!student &&


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
bg-[#102235]
border
border-teal-500/40
rounded-3xl
p-6
sm:p-8
"

>


<h2

className="
text-2xl
sm:text-4xl
font-black
leading-tight
"

>

Start your skating journey ⛸️


</h2>




<p

className="
mt-4
text-slate-300
text-base
sm:text-lg
"

>

Join RSTA Academy and begin your journey towards confidence,
fitness and championship level skating.

</p>




<button

onClick={()=>navigate("/admission")}

className="
mt-6
bg-teal-500
px-6
py-3
rounded-xl
font-bold
"

>

Apply For Admission


</button>



</motion.div>


}









{/* PENDING */}



{

isPending &&


<div

className="
bg-[#102235]
border
border-yellow-500/30
rounded-3xl
p-6
sm:p-8
"

>


<h2

className="
text-2xl
sm:text-3xl
font-black
"

>

Application Submitted Successfully 🎉

</h2>


<p

className="
mt-3
text-slate-300
"

>

Your admission form has been submitted to Super Admin.
Waiting for approval.

</p>



<div

className="
mt-5
flex
items-center
gap-3
text-yellow-400
font-bold
"

>


<Clock/>

Pending Approval


</div>


</div>


}









{/* APPROVED */}



{

isApproved &&


<div

className="
bg-green-900/20
border
border-green-500/30
rounded-3xl
p-6
sm:p-8
"

>


<h2

className="
text-2xl
sm:text-3xl
font-black
"

>

🎉 Welcome To RSTA Family

</h2>


<p

className="
mt-3
text-slate-300
"

>

Your admission has been approved.
Start your training journey.

</p>




<button

onClick={()=>generateReceipt(student)}

className="
mt-5
bg-teal-500
px-6
py-3
rounded-xl
font-bold
"

>


<Download

size={18}

className="inline mr-2"

/>


Download Receipt


</button>


</div>


}









{/* RSTA INFORMATION */}



<div

className="
grid
grid-cols-1
lg:grid-cols-2
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
sm:p-8
"

>


<h2

className="
text-2xl
sm:text-3xl
font-black
"

>

Every Champion Starts Somewhere


</h2>



<p

className="
mt-4
text-slate-300
leading-relaxed
"

>

Skating builds confidence, discipline and determination.
RSTA Academy helps students improve skills and achieve
their goals with professional training.

</p>




<p

className="
mt-5
text-teal-400
font-bold
"

>

Your journey begins with one step 🛼

</p>


</div>








<div

className="
bg-[#102235]
border
border-slate-700
rounded-3xl
p-6
sm:p-8
"

>


<h2

className="
text-2xl
sm:text-3xl
font-black
"

>

RSTA Academy


</h2>




<div

className="
mt-6
space-y-5
"

>


<Stat icon={<MapPin/>} text="Pune Maharashtra"/>

<Stat icon={<CalendarDays/>} text="Professional Training Programs"/>

<Stat icon={<Users/>} text="5000+ Students"/>

<Stat icon={<Trophy/>} text="Championship Preparation"/>

<Stat icon={<Heart/>} text="Building Future Champions"/>


</div>


</div>



</div>









{/* ANNOUNCEMENTS */}



{

isApproved &&


<div>


<h2

className="
text-2xl
sm:text-3xl
font-black
flex
items-center
gap-3
"

>


<Bell className="text-teal-400"/>

Announcements


</h2>




<div className="mt-5">


{

announcements.map(item=>(


<div

key={item.id}

className="
bg-[#102235]
border
border-slate-700
rounded-2xl
p-5
mb-4
"

>


<h3 className="font-bold">

{item.title}

</h3>


<p className="text-slate-400 mt-2">

{item.message}

</p>


</div>


))


}



</div>


</div>


}



</div>


)

}








function InfoCard({

icon,

title,

text

}){


return(


<motion.div

whileHover={{
y:-5
}}

className="
flex
items-center
gap-4
bg-[#0f2940]
rounded-2xl
p-4
min-w-0
"

>


<div

className="
bg-teal-500/20
p-3
rounded-xl
text-teal-400
shrink-0
"

>

{icon}

</div>




<div className="min-w-0">


<h3

className="
font-bold
text-base
sm:text-lg
"

>

{title}

</h3>



<p

className="
text-sm
text-slate-400
"

>

{text}

</p>


</div>


</motion.div>


)

}







function Stat({

icon,

text

}){


return(

<div

className="
flex
items-center
gap-4
text-slate-300
"

>


<div className="
text-teal-400
">

{icon}

</div>


<p>{text}</p>


</div>

)

}