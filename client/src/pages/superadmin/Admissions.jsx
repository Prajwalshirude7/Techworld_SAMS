import {
  Search,
  FileText,
  CheckCircle,
  XCircle,
  Eye,
  MapPin,
  Download
} from "lucide-react";

import { motion } from "framer-motion";


import {
useState,
useEffect
} from "react";


import {
useNavigate
} from "react-router-dom";


import api from "../../services/api";
import generateReceipt from "../../utils/generateReceipt";





export default function Admissions(){


  const navigate = useNavigate();

  // =====================================================
  // STATES
  // =====================================================

  const [search, setSearch] = useState("");

const [search,setSearch]=useState("");

const [status,setStatus]=useState("All");

const [branch,setBranch]=useState("All");


const [applications,setApplications]=useState([]);


const [branches,setBranches]=useState([]);









// LOAD DATA

      setLoading(true);

      const response = await api.get("/admin/admissions");

const savedApplications = JSON.parse(

localStorage.getItem("admissionApplications")

||

"[]"

        setApplications(
          response.data.data || []
        );

      } else {


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


      }

},[]);




      console.error(
        "FETCH ADMISSIONS ERROR:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to load admissions"
      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // LOAD ON PAGE OPEN
  // =====================================================

  useEffect(() => {

const updateStatus=(id,newStatus)=>{


  }, []);


  // =====================================================
  // APPROVE ADMISSION
  // =====================================================

if(item.id===id){


    try {

...item,

status:newStatus

};


}


return item;


});






setApplications(updatedApplications);






// UPDATE ALL APPLICATIONS

localStorage.setItem(

"admissionApplications",

JSON.stringify(updatedApplications)

);









const updatedStudent = updatedApplications.find(

item=>item.id===id

);









if(updatedStudent){



// STUDENT DASHBOARD DATA


localStorage.setItem(

"admissionStudent",

JSON.stringify(updatedStudent)

);






localStorage.setItem(

"admissionApplication",

JSON.stringify(updatedStudent)

);









// CREATE STUDENT ONLY AFTER APPROVAL


if(newStatus==="Approved"){



const students = JSON.parse(

localStorage.getItem("academyStudents")

||

"[]"

);







const exists = students.some(

student=>

student.email===updatedStudent.email

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




          return (

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
sm:text-4xl
lg:text-5xl
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


</div>








{/* FILTER SECTION */}



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

        {/* SEARCH */}

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


        {/* STATUS */}

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
outline-none
"

>

          <option value="All">
            All Status
          </option>

          <option value="PENDING">
            Pending
          </option>

          <option value="APPROVED">
            Approved
          </option>

          <option value="REJECTED">
            Rejected
          </option>


</select>

        {/* BRANCH */}

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
outline-none
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









{/* APPLICATION CARDS */}



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

filteredApplications.length===0 &&

<div

className="
col-span-full
bg-[#102235]
rounded-3xl
p-10
text-center
text-slate-400
"

>

No admission applications found.

</div>

}






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


                <div>

                  {/* TOP */}

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

className={`

px-4
py-2
rounded-full
text-sm
font-semibold


${
student.status==="Approved"

?

"bg-green-500/20 text-green-400"

:

student.status==="Rejected"

?

"bg-red-500/20 text-red-400"

:

"bg-yellow-500/20 text-yellow-400"

}

`}

>

{student.status}

</span>


</div>

                  {/* STUDENT NAME */}

<h2 className="
text-xl
font-bold
mt-6
">

{student.name}

</h2>

                  {/* EMAIL */}

<p className="
text-slate-400
break-all
">

{student.email}

</p>





<div className="
mt-6
space-y-3
">

<p className="flex gap-2 items-center">

<MapPin
size={18}
className="text-teal-400"
/>

{student.branch || "Not Selected"}

</p>


<p>

<span className="text-slate-400">
Program:
</span>

<span className="ml-2">

{student.program || "Not Selected"}

</span>

</p>


<p>

<span className="text-slate-400">
Applied:
</span>

                        <span className="ml-2">

{student.submittedAt || "N/A"}

                        </span>

</p>


                  </div>

                </div>








<div className="
mt-8
flex
flex-wrap
gap-3
">


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
h-12
flex
items-center
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
font-bold
h-12
flex
items-center
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
font-bold
h-12
flex
items-center
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
font-bold
h-12
flex
items-center
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