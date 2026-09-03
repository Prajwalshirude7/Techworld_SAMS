import {
  ArrowLeft,
  User,
  MapPin,
  FileText,
  CheckCircle,
  XCircle,
  Download,
  RefreshCcw
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


import toast from "react-hot-toast";


import generateReceipt from "../../utils/generateReceipt";




export default function AdmissionDetails(){


const navigate = useNavigate();

const location = useLocation();



const receivedStudent = location.state?.student;



const [student,setStudent] = useState(null);


const [status,setStatus] = useState(
  receivedStudent?.status || "Pending Approval"
);



const [updating,setUpdating] = useState(false);








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



branch:
receivedStudent.branch || "Not Assigned",



program:
receivedStudent.program || "Not Assigned",



experience:
receivedStudent.experience || "N/A",



address:
receivedStudent.address || "Not Available",



city:
receivedStudent.city || "N/A",



state:
receivedStudent.state || "N/A",



pincode:
receivedStudent.pincode || "N/A",





// FIX DOCUMENT DISPLAY

document:

receivedStudent.document?.name

||

receivedStudent.document

||

"No Document Uploaded"



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










// UPDATE STATUS FUNCTION


const updateAdmissionStatus=(newStatus)=>{



if(updating)

return;




setUpdating(true);





const updatedStudent={


...student,


status:newStatus


};






setStudent(updatedStudent);


setStatus(newStatus);








// UPDATE CURRENT APPLICATION


localStorage.setItem(

"admissionStatus",

newStatus

);






localStorage.setItem(

"admissionApplication",

JSON.stringify(updatedStudent)

);






localStorage.setItem(

"admissionStudent",

JSON.stringify(updatedStudent)

);












// UPDATE APPLICATION ARRAY


const applications = JSON.parse(

localStorage.getItem("admissionApplications")

||

"[]"

);







const updatedApplications = applications.map(item=>{


if(item.id === student.id){


return updatedStudent;


}



return item;



});








localStorage.setItem(

"admissionApplications",

JSON.stringify(updatedApplications)

);











// UPDATE STUDENT DATABASE


let students = JSON.parse(

localStorage.getItem("academyStudents")

||

"[]"

);






const studentIndex = students.findIndex(

item=>

item.email === student.email

);









if(newStatus==="Approved"){



const approvedStudent={


...updatedStudent,


studentStatus:"Active",


joinedDate:

new Date().toLocaleDateString()


};







if(studentIndex===-1){


students.push(

approvedStudent

);


}

else{


students[studentIndex]=approvedStudent;


}




}









if(newStatus==="Rejected"){



students = students.filter(

item=>

item.email !== student.email

);



}









localStorage.setItem(

"academyStudents",

JSON.stringify(students)

);










toast.success(

`Admission status changed to ${newStatus}`,

{

id:"admission-status-toast"

}

);






setTimeout(()=>{


setUpdating(false);


},500);



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

inline-flex
items-center
justify-center

px-6
py-2

rounded-full

font-bold
text-lg

w-fit
h-fit

self-start
sm:self-center


${
status==="Approved"

?

"bg-green-500/20 text-green-400 border border-green-500/30"

:

status==="Rejected"

?

"bg-red-500/20 text-red-400 border border-red-500/30"

:

"bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"

}

`}

>

{status}

</div>



</div>









{/* STATUS MANAGEMENT */}


<div

className="
mt-8
bg-[#07131f]
border
border-slate-700
rounded-3xl
p-6
"

>


<h2

className="
text-2xl
font-black
mb-5
"

>

Manage Admission Status

</h2>




<div

className="
flex
flex-wrap
gap-4
"

>


<button

disabled={updating}

onClick={()=>updateAdmissionStatus("Approved")}

className="
flex
items-center
gap-2
px-5
py-3
rounded-xl
bg-green-500
hover:bg-green-600
font-bold
disabled:opacity-50
"

>

<CheckCircle size={18}/>

Approve

</button>







<button

disabled={updating}

onClick={()=>updateAdmissionStatus("Rejected")}

className="
flex
items-center
gap-2
px-5
py-3
rounded-xl
bg-red-500
hover:bg-red-600
font-bold
disabled:opacity-50
"

>

<XCircle size={18}/>

Reject

</button>








<button

disabled={updating}

onClick={()=>updateAdmissionStatus("Pending Approval")}

className="
flex
items-center
gap-2
px-5
py-3
rounded-xl
bg-yellow-400
text-black
font-bold
disabled:opacity-50
"

>

<RefreshCcw size={18}/>

Reset Pending

</button>



</div>





<p

className="
mt-4
text-slate-400
"

>

Current Status:

<span

className="
ml-2
text-white
font-bold
"

>

{status}

</span>

</p>


</div>









{/* STUDENT INFORMATION */}



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
border
border-slate-700
rounded-3xl
p-6
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









{/* DOCUMENT SECTION */}


<div

className="
mt-8
bg-[#07131f]
border
border-slate-700
rounded-3xl
p-6
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




<div

className="
flex
items-center
gap-3
text-slate-300
"

>


<FileText

size={22}

className="text-teal-400"

/>



<span>

{student.document || "No Document Uploaded"}

</span>



</div>



</div>









{/* RECEIPT */}



{

status==="Approved" &&


<button

onClick={()=>generateReceipt(student)}

className="
mt-8
w-full
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
