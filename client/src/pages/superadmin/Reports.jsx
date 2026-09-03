import {
LineChart,
Line,
BarChart,
Bar,
PieChart,
Pie,
Cell,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
Legend
} from "recharts";


import {
Users,
IndianRupee,
Building2,
Award,
FileText
} from "lucide-react";


import {
motion
} from "framer-motion";


import {
useEffect,
useState
} from "react";





export default function Reports(){



const [students,setStudents]=useState([]);

const [payments,setPayments]=useState([]);

const [branches,setBranches]=useState([]);

const [achievements,setAchievements]=useState([]);

const [admissions,setAdmissions]=useState([]);








useEffect(()=>{


setStudents(

JSON.parse(

localStorage.getItem("academyStudents")

||

"[]"

)

);



setPayments(

JSON.parse(

localStorage.getItem("payments")

||

"[]"

)

);



setBranches(

JSON.parse(

localStorage.getItem("academyBranches")

||

"[]"

)

);



setAchievements(

JSON.parse(

localStorage.getItem("academyAchievements")

||

"[]"

)

);



setAdmissions(

JSON.parse(

localStorage.getItem("admissionApplications")

||

"[]"

)

);



},[]);









// TOTAL REVENUE


const totalRevenue = payments.reduce(

(sum,item)=>

sum + Number(item.amount || item.price || 0),

0

);







// MONTHLY REVENUE


const revenueData = payments.reduce(

(acc,item)=>{


const date = new Date(

item.date || item.createdAt || Date.now()

);



const month = date.toLocaleString(

"default",

{
month:"short"
}

);



const existing = acc.find(

x=>x.month===month

);



if(existing){

existing.revenue += Number(

item.amount || item.price || 0

);

}

else{


acc.push({

month,

revenue:Number(

item.amount || item.price || 0

)

});


}



return acc;


},

[]


);









// STUDENT GROWTH


const studentGrowth=[

{
month:"Total",
students:students.length
}

];











// BRANCH PERFORMANCE


const branchData = branches.map(branch=>{


const count = students.filter(

student=>

student.branch===branch.branchName

).length;



return{

name:branch.branchName,

students:count

};


});











// PROGRAM DISTRIBUTION


const programMap={};



students.forEach(student=>{


const program=

student.program || "Other";


programMap[program]=

(programMap[program] || 0)+1;


});





const programData = Object.keys(programMap).map(item=>(

{

name:item,

value:programMap[item]

}

));







const COLORS=[

"#14b8a6",

"#22c55e",

"#38bdf8",

"#f59e0b"

];









const cards=[


{

title:"Total Students",

value:students.length,

icon:Users

},


{

title:"Total Revenue",

value:`₹${totalRevenue.toLocaleString("en-IN")}`,

icon:IndianRupee

},


{

title:"Active Branches",

value:branches.filter(

b=>b.status==="Active"

).length,

icon:Building2

},


{

title:"Achievements",

value:achievements.length,

icon:Award

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



<motion.div

initial={{
opacity:0,
y:-20
}}

animate={{
opacity:1,
y:0
}}

>


<h1

className="
text-3xl
sm:text-4xl
font-black
"

>

Reports & Analytics

</h1>



<p

className="
text-slate-400
mt-2
"

>

Real-time academy performance overview.

</p>



</motion.div>









{/* CARDS */}



<div

className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-4
gap-5
mt-8
"

>


{

cards.map((item,index)=>{


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
p-6
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


<p className="
text-slate-400
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



<div

className="
bg-teal-500/20
p-4
rounded-xl
"

>


<Icon

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









{/* CHARTS */}



<div

className="
grid
grid-cols-1
xl:grid-cols-2
gap-6
mt-10
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


<h2 className="
text-xl
font-bold
mb-5
">

Student Growth

</h2>



<ResponsiveContainer

width="100%"

height={300}

>


<LineChart data={studentGrowth}>


<XAxis dataKey="month"/>

<YAxis/>

<Tooltip/>


<Line

dataKey="students"

stroke="#14b8a6"

strokeWidth={3}

/>


</LineChart>


</ResponsiveContainer>



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


<h2 className="
text-xl
font-bold
mb-5
">

Revenue

</h2>



<ResponsiveContainer

width="100%"

height={300}

>


<BarChart data={revenueData}>


<XAxis dataKey="month"/>

<YAxis/>

<Tooltip/>


<Bar

dataKey="revenue"

fill="#14b8a6"

/>


</BarChart>


</ResponsiveContainer>



</div>



</div>









<div

className="
grid
grid-cols-1
xl:grid-cols-2
gap-6
mt-6
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


<h2 className="
text-xl
font-bold
mb-5
">

Branch Performance

</h2>



<ResponsiveContainer

width="100%"

height={300}

>


<BarChart data={branchData}>


<XAxis dataKey="name"/>

<YAxis/>


<Tooltip/>


<Bar

dataKey="students"

fill="#22c55e"

/>


</BarChart>


</ResponsiveContainer>



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


<h2 className="
text-xl
font-bold
mb-5
">

Program Distribution

</h2>



<ResponsiveContainer

width="100%"

height={300}

>


<PieChart>


<Pie

data={programData}

dataKey="value"

outerRadius={100}

label

>


{

programData.map(

(entry,index)=>(


<Cell

key={index}

fill={COLORS[index % COLORS.length]}

/>


)

)


}


</Pie>


<Tooltip/>


<Legend/>


</PieChart>



</ResponsiveContainer>



</div>







</div>








</div>


);


}