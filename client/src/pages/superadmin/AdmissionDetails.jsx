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

import { useEffect, useState } from "react";

import generateReceipt from "../../utils/generateReceipt";





export default function AdmissionDetails(){


const navigate = useNavigate();

const location = useLocation();




// RECEIVE DATA

const receivedStudent = location.state?.student;





const [student,setStudent] = useState(null);


const [status,setStatus] = useState(
receivedStudent?.status || "Pending Approval"
);







// LOAD STUDENT DATA


useEffect(()=>{


if(!receivedStudent){

navigate("/super-admin/admissions");

return;

}



const formattedStudent={

...receivedStudent,


phone:
receivedStudent.phone || "N/A",


dob:
receivedStudent.dob || "N/A",


gender:
receivedStudent.gender || "N/A",


address:
receivedStudent.address || "N/A",


city:
receivedStudent.city || "",


state:
receivedStudent.state || "",


pincode:
receivedStudent.pincode || "",


experience:
receivedStudent.experience || "N/A",


program:
receivedStudent.program || "N/A",


branch:
receivedStudent.branch || "Not Assigned",



document:

typeof receivedStudent.document === "object"

?

receivedStudent.document?.name || "Uploaded Document"

:

receivedStudent.document || "No Document"




};



setStudent(formattedStudent);

setStatus(
formattedStudent.status
);



},[receivedStudent,navigate]);







if(!student){

return null;

}







const isPending =

status==="Pending Approval"
||
status==="Pending";



const isApproved =

status==="Approved";



const isRejected =

status==="Rejected";









// UPDATE STATUS


const updateAdmissionStatus=(newStatus)=>{


const updatedStudent={

...student,

status:newStatus

};




setStudent(updatedStudent);

setStatus(newStatus);





localStorage.setItem(

"admissionStatus",

newStatus

);





localStorage.setItem(

"admissionStudent",

JSON.stringify(updatedStudent)

);





localStorage.setItem(

"admissionApplication",

JSON.stringify(updatedStudent)

);









const applications = JSON.parse(

localStorage.getItem("admissionApplications")
||
"[]"

);




const updatedApplications = applications.map((item)=>{


if(item.id===student.id){

return updatedStudent;

}


return item;


});




localStorage.setItem(

"admissionApplications",

JSON.stringify(updatedApplications)

);




};









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
sm:text-4xl
font-black
"

>

Admission Details

</h1>


<p

className="
text-slate-400
"

>

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
p-5
sm:p-7
"

>



<div

className="
flex
flex-col
sm:flex-row
justify-between
gap-5
"

>


<div

className="
flex
items-center
gap-4
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

className="
text-teal-400
"

/>


</div>




<div>


<h2

className="
text-2xl
font-bold
"

>

{student.name}

</h2>



<p

className="
text-slate-400
break-all
"

>

{student.email}

</p>


</div>


</div>







<span

className={`

px-5
py-2
rounded-full
font-bold
w-fit

${
isApproved

?

"bg-green-500/20 text-green-400"

:

isRejected

?

"bg-red-500/20 text-red-400"

:

"bg-yellow-500/20 text-yellow-400"

}

`}

>

{status}

</span>



</div>


</motion.div>









{/* DETAILS */}



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


<p>
Phone:
<span className="ml-2 text-white">
{student.phone}
</span>
</p>


<p className="mt-3">
DOB:
<span className="ml-2 text-white">
{student.dob}
</span>
</p>


<p className="mt-3">
Gender:
<span className="ml-2 text-white">
{student.gender}
</span>
</p>


</div>








{/* ADDRESS */}


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

Address

</h2>


<div className="
flex
gap-3
">

<MapPin className="text-teal-400"/>


<p>

{student.address}

<br/>

{student.city},

{student.state}

<br/>

{student.pincode}

</p>


</div>


</div>








{/* SKATING */}



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

<span className="ml-2 text-white">

{student.program}

</span>


</p>



<p className="mt-3">

Experience:

<span className="ml-2 text-white">

{student.experience}

</span>


</p>




<p className="mt-3">

Branch:

<span className="ml-2 text-white">

{student.branch}

</span>


</p>



</div>









{/* DOCUMENT */}



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
bg-[#07131f]
rounded-xl
p-4
flex
items-center
gap-3
">


<FileText className="text-teal-400"/>


<span>

{student.document}

</span>


</div>


</div>







</div>









{/* ACTIONS */}



<div

className="
mt-8
flex
flex-col
sm:flex-row
gap-4
"

>


{


isPending &&

<>


<button

onClick={()=>updateAdmissionStatus("Approved")}

className="
flex-1
bg-green-500
hover:bg-green-600
py-4
rounded-xl
font-bold
flex
justify-center
items-center
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
hover:bg-red-600
py-4
rounded-xl
font-bold
flex
justify-center
items-center
gap-2
"

>


<XCircle/>

Reject Admission

</button>


</>

}









{

isApproved &&


<button

onClick={()=>generateReceipt(student)}

className="
w-full
bg-teal-500
hover:bg-teal-600
py-4
rounded-xl
font-bold
flex
justify-center
items-center
gap-2
"

>


<Download/>

Generate Receipt


</button>


}







{

isRejected &&


<div

className="
w-full
bg-red-500/20
border
border-red-500/30
text-red-400
py-4
rounded-xl
text-center
font-bold
"

>

Admission Rejected

</div>


}





</div>






</div>


);


}