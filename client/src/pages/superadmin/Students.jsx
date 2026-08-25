import {
  Users,
  Search,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Eye,
  Trash2,
  X
} from "lucide-react";


import { motion } from "framer-motion";
import { useState, useEffect } from "react";



export default function Students(){



const [search,setSearch]=useState("");

const [selectedStudent,setSelectedStudent]=useState(null);


const [students,setStudents]=useState([]);







// LOAD APPROVED STUDENTS

useEffect(()=>{


const approvedStudent =

JSON.parse(

localStorage.getItem("admissionStudent") || "null"

);





if(!approvedStudent){

setStudents([]);

return;

}







const formattedStudent = {


id:1,


name:
approvedStudent.name
||
"Unknown",



email:
approvedStudent.email
||
"Not Available",



phone:
approvedStudent.phone
||
"Not Available",



branch:
approvedStudent.branch
||
"Not Assigned",



program:
approvedStudent.program
||
"Not Assigned",



membership:

approvedStudent.status==="Approved"

?

"Active"

:

"Inactive"



};





setStudents([formattedStudent]);





},[]);











// DELETE STUDENT


const deleteStudent=(id)=>{


const updatedStudents =

students.filter(

(student)=>

student.id!==id

);



setStudents(updatedStudents);



localStorage.removeItem(
"admissionStudent"
);



};









const filteredStudents =

students.filter((student)=>

student.name

.toLowerCase()

.includes(

search.toLowerCase()

)

);









return(


<div

className="
min-h-screen
bg-[#07131f]
p-5
sm:p-6
lg:p-10
text-white
"

>









{/* HEADER */}



<div>


<h1

className="
text-3xl
sm:text-4xl
font-black
"

>

Students Management

</h1>



<p

className="
text-slate-400
mt-2
"

>

Manage registered students and academy members.

</p>


</div>









{/* STUDENT COUNT */}



<div

className="
mt-8
grid
grid-cols-1
sm:grid-cols-3
gap-5
"

>


<div

className="
bg-[#102235]
border
border-slate-700
rounded-3xl
p-5
"

>


<p className="text-slate-400">

Total Students

</p>


<h2 className="
text-3xl
font-black
mt-2
">

{students.length}

</h2>


</div>



<div

className="
bg-[#102235]
border
border-slate-700
rounded-3xl
p-5
"

>


<p className="text-slate-400">

Active Members

</p>


<h2 className="
text-3xl
font-black
mt-2
text-green-400
">

{

students.filter(

(item)=>item.membership==="Active"

).length

}

</h2>


</div>




<div

className="
bg-[#102235]
border
border-slate-700
rounded-3xl
p-5
"

>


<p className="text-slate-400">

Inactive Members

</p>


<h2 className="
text-3xl
font-black
mt-2
text-yellow-400
">

{

students.filter(

(item)=>item.membership==="Inactive"

).length

}

</h2>


</div>



</div>









{/* SEARCH */}



<div

className="
mt-8
bg-[#102235]
border
border-slate-700
rounded-3xl
p-5
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


onChange={(e)=>

setSearch(e.target.value)

}



className="
w-full
bg-transparent
outline-none
py-3
text-white
"

/>



</div>


</div>









{/* STUDENT CARDS */}



<div

className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-6
mt-8
"

>


{


filteredStudents.map((student)=>(


<motion.div


key={student.id}


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


<Users

size={32}

className="
text-teal-400
"

/>


</div>






<span

className={`
px-4
py-2
rounded-full
text-sm

${
student.membership==="Active"

?

"bg-green-500/20 text-green-400"

:

"bg-yellow-500/20 text-yellow-400"

}

`}

>

{student.membership}

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









<div

className="
mt-5
space-y-4
text-slate-300
"

>



<p className="
flex
items-center
gap-3
">

<Mail

size={18}

className="text-teal-400"

/>


{student.email}

</p>







<p className="
flex
items-center
gap-3
">

<Phone

size={18}

className="text-teal-400"

/>


{student.phone}

</p>








<p className="
flex
items-center
gap-3
">

<MapPin

size={18}

className="text-teal-400"

/>


{student.branch}

</p>







<p className="
flex
items-center
gap-3
">

<GraduationCap

size={18}

className="text-teal-400"

/>


{student.program}

</p>



</div>









<div

className="
flex
gap-4
mt-8
"

>


<button


onClick={()=>setSelectedStudent(student)}



className="
flex-1
border
border-slate-600
rounded-xl
py-3
flex
justify-center
items-center
gap-2
hover:bg-slate-800
"

>


<Eye size={18}/>

View


</button>







<button


onClick={()=>deleteStudent(student.id)}



className="
flex-1
bg-red-500/20
text-red-400
rounded-xl
py-3
flex
justify-center
items-center
gap-2
"

>


<Trash2 size={18}/>

Remove


</button>





</div>






</motion.div>


))


}



</div>









{/* EMPTY STATE */}



{

filteredStudents.length===0 &&


<div

className="
mt-10
text-center
bg-[#102235]
border
border-slate-700
rounded-3xl
p-10
text-slate-400
"

>


No approved students found.



</div>


}









{/* PROFILE MODAL */}




{

selectedStudent &&


<div

className="
fixed
inset-0
bg-black/60
flex
items-center
justify-center
p-5
z-50
"

>


<div

className="
bg-[#102235]
border
border-slate-700
rounded-3xl
p-7
w-full
max-w-lg
"

>


<div

className="
flex
justify-between
items-center
"

>


<h2 className="
text-2xl
font-bold
">

Student Profile

</h2>




<button

onClick={()=>setSelectedStudent(null)}

>

<X/>

</button>



</div>







<div

className="
mt-6
space-y-4
text-slate-300
"

>


<p>
Name:

<span className="
text-white
font-bold
ml-2
">

{selectedStudent.name}

</span>

</p>



<p>
Email:

<span className="
text-white
font-bold
ml-2
">

{selectedStudent.email}

</span>

</p>




<p>
Phone:

<span className="
text-white
font-bold
ml-2
">

{selectedStudent.phone}

</span>

</p>




<p>
Branch:

<span className="
text-white
font-bold
ml-2
">

{selectedStudent.branch}

</span>

</p>




<p>
Program:

<span className="
text-white
font-bold
ml-2
">

{selectedStudent.program}

</span>

</p>




<p>
Membership:

<span className="
text-white
font-bold
ml-2
">

{selectedStudent.membership}

</span>

</p>



</div>



</div>


</div>


}



</div>


);

}