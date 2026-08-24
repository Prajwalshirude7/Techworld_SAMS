import {
  ArrowLeft,
  User,
  MapPin,
  FileText,
  CheckCircle,
  XCircle,
  Download
} from "lucide-react";


import { motion } from "framer-motion";

import {
useNavigate,
useLocation
} from "react-router-dom";

import { useState,useEffect } from "react";

import generateReceipt from "../../utils/generateReceipt";



export default function AdmissionDetails(){


const navigate = useNavigate();

const location = useLocation();


const studentData = location.state;



const [status,setStatus] = useState(
studentData?.status || "Pending"
);





const student = studentData || {


name:"Rahul Sharma",

email:"rahul@gmail.com",

phone:"9876543210",

dob:"12 March 2010",

gender:"Male",

address:"Pune Camp",

city:"Pune",

state:"Maharashtra",

pincode:"411001",

experience:"Beginner",

program:"Professional Skating",

branch:"Pune Camp",

document:"Aadhar Card.pdf",

status:"Pending"

};







useEffect(()=>{


if(!studentData){

navigate("/super-admin/admissions");

}


},[]);







// UPDATE STATUS

const updateAdmissionStatus=(newStatus)=>{


setStatus(newStatus);



const updatedStudent={

...student,

status:newStatus

};




// Student dashboard data

localStorage.setItem(
"admissionStatus",
newStatus
);



localStorage.setItem(
"admissionStudent",
JSON.stringify(updatedStudent)
);






// Super admin data update


const applications =
JSON.parse(
localStorage.getItem("admissionApplications") || "[]"
);




const updatedApplications = applications.map((item)=>{


if(item.email === student.email){


return{

...item,

status:newStatus

};


}


return item;


});




localStorage.setItem(

"admissionApplications",

JSON.stringify(updatedApplications)

);



};









return(


<div className="
min-h-screen
bg-[#07131f]
p-5
lg:p-10
text-white
">







{/* HEADER */}


<div className="
flex
items-center
gap-4
">


<button

onClick={()=>navigate(-1)}

className="
bg-[#102235]
p-3
rounded-xl
"

>

<ArrowLeft/>

</button>




<div>

<h1 className="
text-3xl
sm:text-4xl
font-black
">

Admission Details

</h1>


<p className="
text-slate-400
mt-2
">

Review complete student application.

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


<div className="
flex
flex-col
sm:flex-row
justify-between
gap-5
">


<div className="
flex
items-center
gap-5
">


<div className="
bg-teal-500/20
p-5
rounded-2xl
">


<User

size={35}

className="
text-teal-400
"

/>


</div>




<div>


<h2 className="
text-2xl
font-bold
">

{student.name}

</h2>


<p className="
text-slate-400
">

{student.email}

</p>


</div>


</div>





<span className={`

px-5
py-2
rounded-full
font-bold

${
status==="Approved"

?
"bg-green-500/20 text-green-400"

:

status==="Rejected"

?

"bg-red-500/20 text-red-400"

:

"bg-yellow-500/20 text-yellow-400"

}

`}>

{status}

</span>


</div>


</motion.div>









{/* DETAILS */}


<div className="
grid
grid-cols-1
lg:grid-cols-2
gap-6
mt-6
">






<div className="
bg-[#102235]
border
border-slate-700
rounded-3xl
p-6
">


<h2 className="
text-xl
font-bold
text-teal-400
mb-5
">

Personal Information

</h2>


<div className="
space-y-3
text-slate-300
">


<p>

Phone:

<span className="
text-white
ml-2
">

{student.phone}

</span>

</p>


<p>

DOB:

<span className="
text-white
ml-2
">

{student.dob}

</span>

</p>


<p>

Gender:

<span className="
text-white
ml-2
">

{student.gender}

</span>

</p>


</div>


</div>









<div className="
bg-[#102235]
border
border-slate-700
rounded-3xl
p-6
">


<h2 className="
text-xl
font-bold
text-teal-400
mb-5
">

Address Details

</h2>



<div className="
flex
gap-3
text-slate-300
">


<MapPin className="
text-teal-400
"/>


<p>

{student.address}

<br/>

{student.city},

{student.state}

-

{student.pincode}

</p>


</div>


</div>









<div className="
bg-[#102235]
border
border-slate-700
rounded-3xl
p-6
">


<h2 className="
text-xl
font-bold
text-teal-400
mb-5
">

Skating Details

</h2>


<p>

Program:

<span className="
text-white
ml-2
">

{student.program}

</span>


</p>



<p className="
mt-3
">

Experience:

<span className="
text-white
ml-2
">

{student.experience}

</span>


</p>




<p className="
mt-3
">

Branch:

<span className="
text-white
ml-2
">

{student.branch}

</span>


</p>



</div>








<div className="
bg-[#102235]
border
border-slate-700
rounded-3xl
p-6
">


<h2 className="
text-xl
font-bold
text-teal-400
mb-5
">

Documents

</h2>



<div className="
flex
justify-between
items-center
bg-[#07131f]
p-4
rounded-xl
">


<div className="
flex
gap-3
items-center
">


<FileText className="
text-teal-400
"/>


{student.document}


</div>


<button className="
text-teal-400
">

<Download/>

</button>


</div>


</div>




</div>









{/* ACTIONS */}



<div className="
mt-8
flex
flex-col
sm:flex-row
gap-4
">



{

status==="Pending" &&

<>


<button

onClick={()=>updateAdmissionStatus("Approved")}

className="
flex-1
bg-green-500
py-4
rounded-xl
font-bold
flex
justify-center
gap-2
"

>


<CheckCircle/>

Approve Admission

</button>






<button

onClick={()=>updateAdmissionStatus("Rejected")}

className="
flex-1
bg-red-500
py-4
rounded-xl
font-bold
flex
justify-center
gap-2
"

>


<XCircle/>

Reject Admission

</button>


</>

}







{

status==="Approved" &&

<button

onClick={()=>generateReceipt(student)}

className="
w-full
bg-teal-500
py-4
rounded-xl
font-bold
flex
justify-center
gap-2
"

>


<Download/>

Generate Receipt


</button>


}


</div>






</div>

)

}