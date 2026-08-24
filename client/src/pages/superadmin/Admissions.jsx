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
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Admissions(){


const navigate = useNavigate();


const [search,setSearch]=useState("");

const [status,setStatus]=useState("All");

const [branch,setBranch]=useState("All");



const defaultApplications=[

{
id:1,
name:"Rahul Sharma",
email:"rahul@gmail.com",
phone:"9876543210",
branch:"Pune Camp",
program:"Professional Skating",
date:"24 Aug 2026",
status:"Pending"
},

{
id:2,
name:"Aarav Patil",
email:"aarav@gmail.com",
phone:"8765432109",
branch:"Mumbai Central",
program:"Beginner Program",
date:"22 Aug 2026",
status:"Approved"
},

{
id:3,
name:"Riya Deshmukh",
email:"riya@gmail.com",
phone:"7654321098",
branch:"Nashik Road",
program:"Advanced Training",
date:"20 Aug 2026",
status:"Rejected"
}

];




const [applications,setApplications]=useState([]);





// LOAD APPLICATIONS

useEffect(()=>{


const savedApplications = JSON.parse(

localStorage.getItem("admissionApplications") || "[]"

);



if(savedApplications.length>0){

setApplications(savedApplications);

}

else{

setApplications(defaultApplications);

}



},[]);








// APPROVE

const approveApplication=(id)=>{


const updated = applications.map((item)=>{


if(item.id===id){

return{

...item,

status:"Approved"

}

}


return item;


});



setApplications(updated);



localStorage.setItem(

"admissionApplications",

JSON.stringify(updated)

);



};







// REJECT


const rejectApplication=(id)=>{


const updated = applications.map((item)=>{


if(item.id===id){

return{

...item,

status:"Rejected"

}

}


return item;


});



setApplications(updated);



localStorage.setItem(

"admissionApplications",

JSON.stringify(updated)

);


};










const filteredApplications = applications.filter((item)=>{


return(

item.name
.toLowerCase()
.includes(search.toLowerCase())

&&

(status==="All" || item.status===status)

&&

(branch==="All" || item.branch===branch)

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
value:applications.filter(
x=>x.status==="Pending"
).length,
icon:Clock
},


{
title:"Approved",
value:applications.filter(
x=>x.status==="Approved"
).length,
icon:CheckCircle
},


{
title:"Rejected",
value:applications.filter(
x=>x.status==="Rejected"
).length,
icon:XCircle
}


];









return(


<div className="
min-h-screen
bg-[#07131f]
p-5
sm:p-6
lg:p-10
text-white
">



<h1 className="
text-4xl
font-black
">

Admissions Management

</h1>


<p className="
text-slate-400
mt-2
">

Review, approve and manage student admission requests.

</p>







{/* STATS */}


<div className="
grid
grid-cols-2
lg:grid-cols-4
gap-4
mt-8
">


{
stats.map((item,index)=>{


const Icon=item.icon;


return(

<motion.div

key={index}

whileHover={{y:-5}}

className="
bg-[#102235]
border
border-slate-700
rounded-3xl
p-5
"

>


<div className="
flex
justify-between
items-center
">


<div>

<p className="
text-slate-400
text-sm
">

{item.title}

</p>


<h2 className="
text-3xl
font-black
mt-2
">

{item.value}

</h2>

</div>



<div className="
bg-teal-500/20
p-3
rounded-xl
">

<Icon
className="text-teal-400"
/>

</div>


</div>


</motion.div>

)

})


}


</div>









{/* FILTER */}



<div className="
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
">


<input

placeholder="Search student..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="
bg-[#07131f]
border
border-slate-700
rounded-xl
px-4
py-3
outline-none
"

/>




<select

value={status}

onChange={(e)=>setStatus(e.target.value)}

className="
bg-[#07131f]
border
border-slate-700
rounded-xl
px-4
"

>

<option>All</option>
<option>Pending</option>
<option>Approved</option>
<option>Rejected</option>

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
"

>

<option>All</option>
<option>Pune Camp</option>
<option>Mumbai Central</option>
<option>Nashik Road</option>

</select>


</div>









{/* CARDS */}



<div className="
grid
grid-cols-1
lg:grid-cols-2
gap-6
mt-8
">


{

filteredApplications.map((item)=>(


<motion.div

key={item.id}

whileHover={{y:-5}}

className="
bg-[#102235]
border
border-slate-700
rounded-3xl
p-6
"

>



<div className="
flex
justify-between
">

<div className="
bg-teal-500/20
p-4
rounded-2xl
">

<FileText
className="text-teal-400"
/>

</div>


<span className={`
px-4
py-2
rounded-full
${statusStyle(item.status)}
`}>

{item.status}

</span>


</div>





<h2 className="
text-2xl
font-bold
mt-5
">

{item.name}

</h2>


<p className="text-slate-400">

{item.email}

</p>





<div className="
mt-5
space-y-3
">


<p className="flex gap-2">

<MapPin className="text-teal-400"/>

{item.branch}

</p>


<p>
Program:
<span className="ml-2 text-white">

{item.program}

</span>
</p>


<p>
Applied:
<span className="ml-2 text-white">

{item.date}

</span>
</p>



</div>







<div className="
flex
gap-3
mt-6
flex-wrap
">


<button

onClick={()=>navigate(
"/super-admin/admission-details",
{
state:item
}
)}

className="
flex-1
border
border-slate-600
rounded-xl
py-3
"

>

<Eye size={18}/>

View

</button>






{
item.status==="Pending" &&

<>


<button

onClick={()=>approveApplication(item.id)}

className="
flex-1
bg-green-500
rounded-xl
font-bold
"

>

<CheckCircle size={18}/>

Approve

</button>



<button

onClick={()=>rejectApplication(item.id)}

className="
flex-1
bg-red-500
rounded-xl
font-bold
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

className="
flex-1
bg-teal-500
rounded-xl
font-bold
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

)

}