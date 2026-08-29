import {
  Search,
  FileText,
  CheckCircle,
  XCircle,
  Eye,
  MapPin,
  Download
} from "lucide-react";


import {
  motion
} from "framer-motion";


import {
  useState,
  useEffect
} from "react";


import {
  useNavigate
} from "react-router-dom";


import generateReceipt from "../../utils/generateReceipt";





export default function Admissions(){


const navigate = useNavigate();



const [search,setSearch]=useState("");

const [status,setStatus]=useState("All");

const [branch,setBranch]=useState("All");


const [applications,setApplications]=useState([]);


const [branches,setBranches]=useState([]);









// LOAD DATA


useEffect(()=>{


const savedApplications = JSON.parse(

localStorage.getItem("admissionApplications")

||

"[]"

);



setApplications(savedApplications);






const savedBranches = JSON.parse(

localStorage.getItem("academyBranches")

||

"[]"

);



setBranches(

savedBranches.filter(

item=>item.status==="Active"

)

);



},[]);












// UPDATE STATUS


const updateStatus=(id,newStatus)=>{


const updatedApplications = applications.map(item=>{


if(item.id===id){


return{

...item,

status:newStatus

};


}


return item;


});





setApplications(updatedApplications);





localStorage.setItem(

"admissionApplications",

JSON.stringify(updatedApplications)

);






const updatedStudent = updatedApplications.find(

item=>item.id===id

);






if(updatedStudent){



localStorage.setItem(

"admissionStudent",

JSON.stringify(updatedStudent)

);




localStorage.setItem(

"admissionApplication",

JSON.stringify(updatedStudent)

);






if(newStatus==="Approved"){



const students = JSON.parse(

localStorage.getItem("academyStudents")

||

"[]"

);





const exists = students.some(

item=>item.email===updatedStudent.email

);





if(!exists){


localStorage.setItem(

"academyStudents",

JSON.stringify(

[

...students,

{

...updatedStudent,

studentStatus:"Active",

joinedDate:

new Date()

.toLocaleDateString()

}

]

)

);



}



}



}



};









const approveApplication=(id)=>{


updateStatus(

id,

"Approved"

);


};






const rejectApplication=(id)=>{


updateStatus(

id,

"Rejected"

);


};









const filteredApplications = applications.filter((item)=>{


const searchMatch =

item.name

?.toLowerCase()

.includes(

search.toLowerCase()

);



const statusMatch =

status==="All"

||

item.status===status;





const branchMatch =

branch==="All"

||

item.branch===branch;





return(

searchMatch

&&

statusMatch

&&

branchMatch

);


});









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







<div>

<h1

className="
text-3xl
sm:text-5xl
font-black
"

>

Admissions Management

</h1>



<p

className="
text-slate-400
mt-2
"

>

Review student applications and manage admissions.

</p>


</div>









{/* FILTER */}


<div

className="
mt-8
bg-[#102235]
border
border-slate-700
rounded-3xl
p-5
grid
grid-cols-1
md:grid-cols-3
gap-4
"

>



<div

className="
flex
items-center
gap-3
bg-[#07131f]
border
border-slate-700
rounded-xl
px-4
"

>


<Search

size={20}

className="text-slate-400"

/>


<input


placeholder="Search student..."


value={search}


onChange={(e)=>setSearch(e.target.value)}


className="
bg-transparent
outline-none
py-3
w-full
"

/>


</div>








<select

value={status}

onChange={(e)=>setStatus(e.target.value)}

className="
bg-[#07131f]
border
border-slate-700
rounded-xl
px-4
py-3
"

>


<option value="All">
All Status
</option>


<option value="Pending Approval">
Pending
</option>


<option value="Approved">
Approved
</option>


<option value="Rejected">
Rejected
</option>


</select>









<select

value={branch}

onChange={(e)=>setBranch(e.target.value)}

className="
bg-[#07131f]
border
border-slate-700
rounded-xl
px-4
py-3
"

>


<option value="All">

All Branches

</option>




{

branches.map(item=>(


<option

key={item.id}

value={item.branchName}

>

{item.branchName}

</option>


))

}



</select>



</div>









{/* CARDS */}



<div

className="
mt-8
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-6
"

>



{

filteredApplications.map((student,index)=>(



<motion.div


key={student.id}


initial={{
opacity:0,
y:20
}}


animate={{
opacity:1,
y:0
}}


transition={{
delay:index*0.05
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
flex
justify-between
items-start
"

>


<div

className="
bg-teal-500/20
p-4
rounded-2xl
"

>


<FileText

size={28}

className="text-teal-400"

/>


</div>




<span

className="
px-4
py-2
rounded-full
bg-yellow-500/20
text-yellow-400
"

>

{student.status}

</span>



</div>






<h2

className="
text-xl
font-bold
mt-6
"

>

{student.name}

</h2>




<p

className="
text-slate-400
"

>

{student.email}

</p>







<p

className="
flex
items-center
gap-2
mt-5
"

>


<MapPin

size={18}

className="text-teal-400"

/>


{student.branch || "Not Selected"}


</p>






<p className="mt-3">

Program:

<span className="ml-2">

{student.program}

</span>


</p>








<div

className="
mt-6
flex
flex-wrap
gap-3
"

>



<button

onClick={()=>navigate(

"/super-admin/admission-details",

{

state:{
student
}

}

)}

className="
flex-1
border
border-slate-600
rounded-xl
py-3
flex
justify-center
gap-2
"

>


<Eye size={18}/>

View

</button>









{

student.status==="Pending Approval" &&

<>


<button

onClick={()=>approveApplication(student.id)}

className="
flex-1
bg-green-500
rounded-xl
py-3
font-bold
flex
justify-center
gap-2
"

>


<CheckCircle size={18}/>

Approve


</button>






<button

onClick={()=>rejectApplication(student.id)}

className="
flex-1
bg-red-500
rounded-xl
py-3
font-bold
flex
justify-center
gap-2
"

>


<XCircle size={18}/>

Reject


</button>


</>


}









{

student.status==="Approved" &&


<button

onClick={()=>generateReceipt(student)}

className="
flex-1
bg-teal-500
rounded-xl
py-3
font-bold
flex
justify-center
gap-2
"

>


<Download size={18}/>

Receipt


</button>


}




</div>







</motion.div>



))


}



</div>






</div>


);


}