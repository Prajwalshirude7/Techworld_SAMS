import {
Search,
User,
MapPin,
Eye,
GraduationCap
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







export default function Students(){



const navigate = useNavigate();




const [students,setStudents]=useState([]);


const [search,setSearch]=useState("");

const [branch,setBranch]=useState("All");








// LOAD STUDENTS


useEffect(()=>{


const data = JSON.parse(

localStorage.getItem("academyStudents")

||

"[]"

);



setStudents(data);



},[]);









const branches=[


"All",


...new Set(

students.map(

item=>

item.branch

)

)


];









const filteredStudents = students.filter((student)=>{


const searchMatch =


student.name

?.toLowerCase()

.includes(

search.toLowerCase()

)

||

student.email

?.toLowerCase()

.includes(

search.toLowerCase()

);





const branchMatch =


branch==="All"

||

student.branch===branch;







return(

searchMatch && branchMatch

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

View approved students enrolled in SAMS Academy.

</p>



</div>









{/* SEARCH FILTER */}



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
md:grid-cols-2
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

className="
text-slate-400
"

/>




<input


placeholder="Search student..."


value={search}


onChange={(e)=>setSearch(e.target.value)}


className="
bg-transparent
outline-none
w-full
py-3
"




/>



</div>









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


{

branches.map(item=>(


<option

key={item}

value={item}

className="text-black"

>

{item}

</option>


))


}



</select>





</div>









{/* STUDENT CARDS */}



<div

className="
mt-8
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-3
gap-6
"

>





{

filteredStudents.length===0 &&


<div

className="
col-span-full
bg-[#102235]
border
border-slate-700
rounded-3xl
p-10
text-center
text-slate-400
"

>

No approved students found.

</div>



}









{

filteredStudents.map((student,index)=>(



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



whileHover={{

y:-6

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


<User

className="
text-teal-400
"

size={30}


/>


</div>





<span

className="
bg-green-500/20
text-green-400
px-3
py-1
rounded-full
text-sm
"

>

Active

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
break-all
"

>

{student.email}

</p>









<div

className="
mt-5
space-y-3
text-slate-300
"

>



<p

className="
flex
items-center
gap-2
"

>


<MapPin

size={18}

className="
text-teal-400
"

/>



{student.branch || "N/A"}


</p>







<p

className="
flex
items-center
gap-2
"

>


<GraduationCap

size={18}

className="
text-teal-400
"

/>


{student.program || "N/A"}



</p>







</div>









<button


onClick={()=>navigate(

"/super-admin/student-details",

{

state:{

student

}

}

)}



className="
mt-6
w-full
border
border-slate-600
rounded-xl
py-3
flex
justify-center
items-center
gap-2
hover:bg-slate-800
transition
"

>


<Eye size={18}/>


View Student


</button>







</motion.div>



))


}





</div>









</div>


);


}