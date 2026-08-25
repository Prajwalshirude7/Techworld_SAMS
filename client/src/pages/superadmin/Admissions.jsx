import {
  Search,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  MapPin,
  Download,
  Users
} from "lucide-react";


import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import generateReceipt from "../../utils/generateReceipt";



export default function Admissions(){


const navigate = useNavigate();



const [search,setSearch] = useState("");

const [status,setStatus] = useState("All");

const [branch,setBranch] = useState("All");

const [applications,setApplications] = useState([]);





// LOAD APPLICATIONS

useEffect(()=>{


const data = JSON.parse(

localStorage.getItem("admissionApplications")
||
"[]"

);


setApplications(data);


},[]);









// UPDATE STATUS

const updateStatus=(id,newStatus)=>{


const updatedApplications = applications.map((item)=>{


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



};








const approveApplication=(id)=>{

updateStatus(id,"Approved");

};



const rejectApplication=(id)=>{

updateStatus(id,"Rejected");

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

searchMatch &&
statusMatch &&
branchMatch

);


});









const statusStyle=(value)=>{


if(value==="Approved")

return "bg-green-500/20 text-green-400";


if(value==="Rejected")

return "bg-red-500/20 text-red-400";


return "bg-yellow-500/20 text-yellow-400";


};









const stats=[


{
title:"Total Applications",
value:applications.length,
icon:Users
},


{
title:"Pending",
value:

applications.filter(

x=>

x.status==="Pending Approval"

).length,

icon:Clock

},



{
title:"Approved",
value:

applications.filter(

x=>

x.status==="Approved"

).length,

icon:CheckCircle

},



{
title:"Rejected",
value:

applications.filter(

x=>

x.status==="Rejected"

).length,

icon:XCircle

}


];









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

Review, approve and manage student admission requests.

</p>


</div>









{/* STATS */}



<div

className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-5
mt-8
"

>


{

stats.map((item,index)=>{


const Icon=item.icon;


return(


<motion.div

key={index}

whileHover={{
y:-5
}}

className="
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
justify-between
items-center
"

>


<div>


<p

className="
text-slate-400
text-sm
"

>

{item.title}

</p>



<h2

className="
text-3xl
font-black
mt-2
"

>

{item.value}

</h2>


</div>




<div

className="
bg-teal-500/20
p-3
rounded-xl
"

>


<Icon

size={25}

className="
text-teal-400
"

/>


</div>



</div>


</motion.div>


)

})

}


</div>









{/* FILTER */}



<div

className="
mt-8
bg-[#102235]
border
border-slate-700
rounded-3xl
p-4
sm:p-6
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

onChange={(e)=>
setSearch(e.target.value)
}


className="
w-full
bg-transparent
outline-none
py-3
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


<option>
Pune Camp
</option>


<option>
Mumbai Central
</option>


<option>
Nashik Road
</option>


</select>


</div>









{/* CARDS */}



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

filteredApplications.length===0 &&

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

No admission applications found.

</div>


}






{

filteredApplications.map((item)=>(


<motion.div


key={item.id}


whileHover={{
y:-6
}}


className="
bg-[#102235]
border
border-slate-700
rounded-3xl
p-5
flex
flex-col
justify-between
"


>


<div>


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
font-semibold
${statusStyle(item.status)}
`}

>

{item.status}

</span>



</div>







<h2

className="
text-2xl
font-bold
mt-6
"

>

{item.name}

</h2>



<p

className="
text-slate-400
break-all
"

>

{item.email}

</p>







<div

className="
mt-6
space-y-4
"

>


<p className="
flex
gap-3
items-center
">

<MapPin

size={18}

className="text-teal-400"

/>


{item.branch || "Not Assigned"}

</p>





<p>

<span className="text-slate-400">

Program:

</span>


<span className="ml-2">

{item.program || "Not Assigned"}

</span>

</p>





<p>

<span className="text-slate-400">

Applied:

</span>


<span className="ml-2">

{item.submittedAt || "N/A"}

</span>

</p>



</div>


</div>









<div

className="
mt-8
flex
gap-3
flex-wrap
"

>






<button


onClick={()=>navigate(

"/super-admin/admission-details",

{

state:{
student:item
}

}

)}


className="
flex-1
h-12
rounded-xl
border
border-slate-600
flex
items-center
justify-center
gap-2
hover:bg-slate-800
"

>


<Eye size={18}/>

View


</button>








{

item.status==="Pending Approval" &&

<>


<button

onClick={()=>approveApplication(item.id)}

className="
flex-1
h-12
rounded-xl
bg-green-500
flex
items-center
justify-center
gap-2
font-semibold
"

>

<CheckCircle size={18}/>

Approve

</button>




<button

onClick={()=>rejectApplication(item.id)}

className="
flex-1
h-12
rounded-xl
bg-red-500
flex
items-center
justify-center
gap-2
font-semibold
"

>


<XCircle size={18}/>

Reject


</button>


</>

}







{

item.status==="Approved" &&


<button


onClick={()=>generateReceipt(item)}


className="
flex-1
h-12
rounded-xl
bg-teal-500
flex
items-center
justify-center
gap-2
font-semibold
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