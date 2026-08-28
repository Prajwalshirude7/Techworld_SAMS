import {
ArrowLeft,
User,
MapPin,
GraduationCap,
Phone,
Calendar,
Mail,
Award
} from "lucide-react";


import {
motion
} from "framer-motion";


import {
useLocation,
useNavigate
} from "react-router-dom";






export default function StudentDetails(){



const navigate = useNavigate();


const location = useLocation();





const student = location.state?.student;






if(!student){


return(

<div

className="
min-h-screen
bg-[#07131f]
text-white
flex
items-center
justify-center
"

>


<div className="
text-center
">


<h2 className="
text-2xl
font-bold
">

Student not found

</h2>



<button

onClick={()=>navigate(-1)}

className="
mt-5
bg-teal-500
px-5
py-3
rounded-xl
"

>

Go Back

</button>



</div>


</div>


);


}









return(


<div

className="
min-h-screen
bg-[#07131f]
text-white
p-4
sm:p-6
lg:p-10
"

>









{/* HEADER */}



<div

className="
flex
items-center
gap-4
"

>


<button


onClick={()=>navigate(-1)}


className="
bg-[#102235]
p-3
rounded-xl
hover:bg-slate-800
"

>


<ArrowLeft/>

</button>






<div>


<h1

className="
text-3xl
sm:text-5xl
font-black
"

>

Student Details

</h1>



<p

className="
text-slate-400
mt-2
"

>

Complete student profile information.

</p>


</div>



</div>









{/* PROFILE */}



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
mt-8
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
flex-col
sm:flex-row
items-center
gap-5
"

>



<div

className="
bg-teal-500/20
p-5
rounded-full
"

>


<User

size={45}

className="
text-teal-400
"

/>


</div>







<div>


<h2

className="
text-3xl
font-black
"

>

{student.name}

</h2>




<p className="
text-slate-400
flex
items-center
gap-2
mt-2
">


<Mail size={16}/>

{student.email}

</p>




</div>




</div>


</motion.div>









{/* INFORMATION */}




<div

className="
grid
grid-cols-1
lg:grid-cols-2
gap-6
mt-6
"

>









{/* PERSONAL */}


<InfoCard

title="Personal Information"

items={[


[

<Phone size={18}/>,

student.phone || "N/A"

],


[

<Calendar size={18}/>,

student.dob || "N/A"

],


[

<User size={18}/>,

student.gender || "N/A"

]



]}


/>









{/* ADDRESS */}



<InfoCard

title="Address"

items={[


[

<MapPin size={18}/>,

`${student.address || ""} ${student.city || ""} ${student.state || ""} ${student.pincode || ""}`

]


]}


/>









{/* ACADEMIC */}



<InfoCard

title="Academy Details"

items={[


[

<GraduationCap size={18}/>,

student.program || "N/A"

],



[

<MapPin size={18}/>,

student.branch || "N/A"

],



[

<Award size={18}/>,

student.experience || "N/A"

]



]}


/>









{/* JOINING */}



<InfoCard

title="Admission Information"

items={[


[

<Calendar size={18}/>,

student.joinedDate || "N/A"

],


[

<Award size={18}/>,

student.status || "Active"

]


]}


/>






</div>







</div>


);


}









function InfoCard({title,items}){


return(


<div

className="
bg-[#102235]
border
border-slate-700
rounded-3xl
p-6
"

>


<h2

className="
text-xl
font-bold
text-teal-400
mb-5
"

>

{title}

</h2>





<div

className="
space-y-4
"

>


{

items.map((item,index)=>(


<div

key={index}

className="
flex
items-center
gap-3
text-slate-300
"

>


<span className="
text-teal-400
">

{item[0]}

</span>



<p>

{item[1]}

</p>


</div>


))


}



</div>


</div>


);


}