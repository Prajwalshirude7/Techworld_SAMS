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






// LOAD REGISTERED STUDENTS

useEffect(()=>{


const storedStudents =
JSON.parse(
localStorage.getItem("students") || "[]"
);



const formattedStudents =

storedStudents.map((student,index)=>(


{

id:index+1,

name:student.name || "Unknown",

email:student.email || "Not Available",

phone:student.phone || "Not Available",

branch:student.branch || "Not Assigned",

program:student.program || "Not Assigned",

membership:"Inactive"

}


));



setStudents(formattedStudents);



},[]);









// DELETE STUDENT


const deleteStudent=(id)=>{


const updatedStudents =

students.filter(

(student)=>
student.id!==id

);



setStudents(updatedStudents);



localStorage.setItem(

"students",

JSON.stringify(updatedStudents)

);


};









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












{/* STUDENTS GRID */}



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

students

.filter((student)=>

student.name
.toLowerCase()
.includes(
search.toLowerCase()
)

)

.map((student)=>(



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


className="
px-4
py-2
rounded-full
text-sm
bg-yellow-500/20
text-yellow-400
"

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





<p

className="
flex
items-center
gap-3
"

>

<Mail

size={18}

className="
text-teal-400
"

/>


{student.email}


</p>







<p

className="
flex
items-center
gap-3
"

>


<Phone

size={18}

className="
text-teal-400
"

/>


{student.phone}


</p>







<p

className="
flex
items-center
gap-3
"

>


<MapPin

size={18}

className="
text-teal-400
"

/>



{student.branch}



</p>







<p

className="
flex
items-center
gap-3
"

>



<GraduationCap

size={18}

className="
text-teal-400
"

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

students.length===0 &&


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


No registered students found.



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


<h2

className="
text-2xl
font-bold
"

>

Student Profile

</h2>



<button


onClick={()=>
setSelectedStudent(null)
}

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

<span className="text-white ml-2 font-bold">

{selectedStudent.name}

</span>


</p>




<p>

Email:

<span className="text-white ml-2 font-bold">

{selectedStudent.email}

</span>


</p>




<p>

Phone:

<span className="text-white ml-2 font-bold">

{selectedStudent.phone}

</span>


</p>




<p>

Branch:

<span className="text-white ml-2 font-bold">

{selectedStudent.branch}

</span>


</p>




<p>

Program:

<span className="text-white ml-2 font-bold">

{selectedStudent.program}

</span>


</p>





</div>





</div>



</div>


}



</div>


);


}