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





// RECEIVED DATA FROM ADMISSIONS PAGE

const receivedStudent = location.state?.student;






const [student,setStudent] = useState(null);


const [status,setStatus] = useState(

receivedStudent?.status || "Pending Approval"

);









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
receivedStudent.program || "Not Assigned",


branch:
receivedStudent.branch || "Not Assigned",




document:

typeof receivedStudent.document==="object"

?

receivedStudent.document?.name || "Uploaded Document"

:

receivedStudent.document || "No Document"




};




setStudent(formattedStudent);


setStatus(

formattedStudent.status ||

"Pending Approval"

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
// UPDATE ADMISSION STATUS


const updateAdmissionStatus = (newStatus)=>{


const updatedStudent = {

...student,

status:newStatus

};




setStudent(updatedStudent);

setStatus(newStatus);








// =============================
// UPDATE CURRENT STUDENT STATUS
// =============================


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









// =============================
// UPDATE ADMISSIONS LIST
// =============================


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












// =============================
// ADD APPROVED STUDENT
// =============================


if(newStatus==="Approved"){



const existingStudents = JSON.parse(

localStorage.getItem("academyStudents")

||

"[]"

);







const alreadyExists = existingStudents.some(

(item)=>

item.email===student.email

);








if(!alreadyExists){



const newStudent={


id:Date.now(),


name:student.name,


email:student.email,


phone:student.phone,


dob:student.dob,


gender:student.gender,


address:student.address,


city:student.city,


state:student.state,


pincode:student.pincode,


program:student.program,


branch:student.branch,


experience:student.experience,


joinedDate:

new Date().toLocaleDateString(),


status:"Active"



};







localStorage.setItem(

"academyStudents",

JSON.stringify(

[

...existingStudents,

newStudent

]

)

);



}



}




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
transition
"

>

<ArrowLeft size={22}/>

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
mt-2
"

>

Review complete student application.

</p>


</div>



</div>









{/* PROFILE CARD */}


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
md:flex-row
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

size={35}

className="
text-teal-400
"

/>


</div>





<div>


<h2

className="
text-xl
sm:text-2xl
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









{/* INFORMATION GRID */}


<div

className="
grid
grid-cols-1
lg:grid-cols-2
gap-6
mt-6
"

>







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

<MapPin

className="
text-teal-400
shrink-0
"

/>



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



<div className="
space-y-3
">


<p>

Program:

<span className="
text-white
ml-2
">

{student.program}

</span>


</p>




<p>

Experience:

<span className="
text-white
ml-2
">

{student.experience}

</span>


</p>




<p>

Branch:

<span className="
text-white
ml-2
">

{student.branch}

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

Documents

</h2>




<div className="
bg-[#07131f]
rounded-xl
p-4
flex
justify-between
items-center
"

>


<div className="
flex
items-center
gap-3
"

>


<FileText

className="
text-teal-400
"

/>


<span>

{student.document || "No document uploaded"}

</span>


</div>





<button

className="
text-teal-400
hover:text-teal-300
"

>


<Download size={22}/>


</button>



</div>


</div>







</div>









{/* ACTION BUTTONS */}


<div

className="
mt-8
flex
flex-col
sm:flex-row
gap-4
"

>


{/* PENDING */}

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
items-center
justify-center
gap-2
transition
"

>

<CheckCircle size={22}/>

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
items-center
justify-center
gap-2
transition
"

>

<XCircle size={22}/>

Reject Admission

</button>


</>

}







{/* APPROVED */}

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
items-center
justify-center
gap-2
transition
"

>


<Download size={22}/>

Generate Receipt


</button>


}








{/* REJECTED */}

{

isRejected &&


<div

className="
w-full
bg-red-500/20
border
border-red-500/30
rounded-xl
p-5
text-center
"

>


<p

className="
text-red-400
font-bold
mb-4
"

>

Admission Rejected

</p>





<button


onClick={()=>updateAdmissionStatus("Pending Approval")}


className="
w-full
bg-yellow-500
hover:bg-yellow-600
text-black
py-3
rounded-xl
font-bold
flex
items-center
justify-center
gap-2
transition
"

>


<CheckCircle size={20}/>

Edit Status


</button>



</div>


}



</div>


</div>


);

}