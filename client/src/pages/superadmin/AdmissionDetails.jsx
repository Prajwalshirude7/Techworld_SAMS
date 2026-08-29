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

import {
  useEffect,
  useState
} from "react";

import generateReceipt from "../../utils/generateReceipt";



export default function AdmissionDetails(){


const navigate = useNavigate();

const location = useLocation();



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



const formattedStudent = {


...receivedStudent,


phone:
receivedStudent.phone || "N/A",


dob:
receivedStudent.dob || "N/A",


gender:
receivedStudent.gender || "N/A",


father_name:
receivedStudent.father_name || "N/A",


branch:
receivedStudent.branch || "Not Assigned",


program:
receivedStudent.program || "Not Assigned",


experience:
receivedStudent.experience || "N/A",


address:
receivedStudent.address || "Not Available",


city:
receivedStudent.city || "",


state:
receivedStudent.state || "",


pincode:
receivedStudent.pincode || "",



document:

typeof receivedStudent.document === "object"

?

receivedStudent.document?.name || "Uploaded Document"

:

receivedStudent.document || "No Document"



};



setStudent(formattedStudent);


setStatus(
formattedStudent.status || "Pending Approval"
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







const updateAdmissionStatus=(newStatus)=>{


const updatedStudent = {

...student,

status:newStatus

};



setStudent(updatedStudent);

setStatus(newStatus);





// CURRENT STUDENT DATA

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






// UPDATE APPLICATION LIST

const applications = JSON.parse(

localStorage.getItem("admissionApplications")

||

"[]"

);




const updatedApplications = applications.map(item=>{


if(item.id===student.id){

return updatedStudent;

}


return item;


});





localStorage.setItem(

"admissionApplications",

JSON.stringify(updatedApplications)

);







// ADD STUDENT AFTER APPROVAL

if(newStatus==="Approved"){



const existingStudents = JSON.parse(

localStorage.getItem("academyStudents")

||

"[]"

);





const exists = existingStudents.some(

item=>item.email===student.email

);






if(!exists){


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



{/* BACK BUTTON */}

<button

onClick={()=>navigate("/super-admin/admissions")}

className="
flex
items-center
gap-2
text-teal-400
mb-6
hover:text-teal-300
"

>

<ArrowLeft size={20}/>

Back To Admissions

</button>






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
max-w-5xl
mx-auto
bg-[#102235]
border
border-slate-700
rounded-3xl
p-6
sm:p-10
"

>



{/* HEADER */}

<div

className="
flex
flex-col
sm:flex-row
justify-between
gap-5
"

>


<div>

<h1

className="
text-3xl
sm:text-5xl
font-black
"

>

Admission Details

</h1>



<p

className="
text-slate-400
mt-3
"

>

Review student application details

</p>


</div>






<div

className={`

px-5
py-3
rounded-full
font-bold


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

</div>



</div>









{/* STUDENT PROFILE */}

<div

className="
mt-10
grid
grid-cols-1
md:grid-cols-2
gap-6
"

>



<InfoCard

icon={<User/>}

title="Student Name"

value={student.name}

/>



<InfoCard

icon={<FileText/>}

title="Email"

value={student.email}

/>



<InfoCard

icon={<FileText/>}

title="Phone"

value={student.phone}

/>



<InfoCard

icon={<MapPin/>}

title="Branch"

value={student.branch}

/>



<InfoCard

icon={<FileText/>}

title="Program"

value={student.program}

/>



<InfoCard

icon={<FileText/>}

title="Experience"

value={student.experience}

/>



</div>









{/* PERSONAL DETAILS */}

<div

className="
mt-8
bg-[#07131f]
rounded-3xl
p-6
border
border-slate-700
"

>


<h2

className="
text-2xl
font-black
mb-5
"

>

Personal Information

</h2>



<div

className="
space-y-3
text-slate-300
"

>


<p>

<b className="text-white">
Date Of Birth:
</b>

{" "}

{student.dob}

</p>



<p>

<b className="text-white">
Gender:
</b>

{" "}

{student.gender}

</p>



<p>

<b className="text-white">
Address:
</b>

{" "}

{student.address}

</p>



<p>

<b className="text-white">
City:
</b>

{" "}

{student.city}

</p>



<p>

<b className="text-white">
State:
</b>

{" "}

{student.state}

</p>



<p>

<b className="text-white">
Pincode:
</b>

{" "}

{student.pincode}

</p>



</div>



</div>









{/* DOCUMENT */}

<div

className="
mt-8
bg-[#07131f]
rounded-3xl
p-6
border
border-slate-700
"

>


<h2

className="
text-2xl
font-black
mb-4
"

>

Documents

</h2>



<p

className="
text-slate-300
"

>

{student.document}

</p>



</div>









{/* ACTIONS */}

<div

className="
mt-10
flex
flex-wrap
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
min-w-[180px]
bg-green-500
hover:bg-green-600
py-3
rounded-xl
font-bold
flex
items-center
justify-center
gap-2
"

>

<CheckCircle size={20}/>

Approve Admission

</button>






<button

onClick={()=>updateAdmissionStatus("Rejected")}

className="
flex-1
min-w-[180px]
bg-red-500
hover:bg-red-600
py-3
rounded-xl
font-bold
flex
items-center
justify-center
gap-2
"

>

<XCircle size={20}/>

Reject Admission

</button>


</>

}









{

isApproved &&


<button

onClick={()=>generateReceipt(student)}

className="
flex-1
min-w-[180px]
bg-teal-500
hover:bg-teal-600
py-3
rounded-xl
font-bold
flex
items-center
justify-center
gap-2
"

>

<Download size={20}/>

Download Receipt

</button>


}





</div>









</motion.div>





</div>

);

}








function InfoCard({

icon,

title,

value

}){


return(

<div

className="
bg-[#07131f]
border
border-slate-700
rounded-2xl
p-5
"

>


<div

className="
text-teal-400
mb-3
"

>

{icon}

</div>


<p

className="
text-slate-400
"

>

{title}

</p>


<h3

className="
text-lg
font-bold
mt-2
break-all
"

>

{value || "N/A"}

</h3>



</div>


);

}