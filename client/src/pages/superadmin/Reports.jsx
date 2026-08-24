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
ResponsiveContainer
} from "recharts";

import {
TrendingUp,
Users,
IndianRupee,
Building2
} from "lucide-react";

import {motion} from "framer-motion";


export default function Reports(){



const studentGrowth=[

{
month:"Jan",
students:120
},

{
month:"Feb",
students:220
},

{
month:"Mar",
students:350
},

{
month:"Apr",
students:520
},

{
month:"May",
students:700
},

{
month:"Jun",
students:900
}

];




const revenueData=[

{
month:"Jan",
revenue:30000
},

{
month:"Feb",
revenue:45000
},

{
month:"Mar",
revenue:65000
},

{
month:"Apr",
revenue:90000
},

{
month:"May",
revenue:120000
}

];





const branchData=[

{
name:"Pune",
students:350
},

{
name:"Mumbai",
students:250
},

{
name:"Nashik",
students:180
}

];






const programData=[

{
name:"Beginner",
value:40
},

{
name:"Professional",
value:35
},

{
name:"Advanced",
value:25
}

];





const cards=[

{
title:"Total Students",
value:"900",
icon:Users
},

{
title:"Monthly Revenue",
value:"₹1,20,000",
icon:IndianRupee
},

{
title:"Active Branches",
value:"8",
icon:Building2
},

{
title:"Growth",
value:"+18%",
icon:TrendingUp
}

];




return(


<div

className="
min-h-screen
bg-[#07131f]
p-5
sm:p-8
lg:p-10
text-white
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

Monitor academy growth and performance.

</p>


</motion.div>







{/* SUMMARY CARDS */}



<div

className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-6
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
items-center
"

>

<div>

<p className="
text-slate-400
">

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



<Icon

className="
text-teal-400
"

size={35}

/>



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





{/* STUDENT GROWTH */}



<div

className="
bg-[#102235]
border
border-slate-700
rounded-3xl
p-6
"

>


<h2

className="
text-xl
font-bold
mb-5
"

>

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








{/* REVENUE */}



<div

className="
bg-[#102235]
border
border-slate-700
rounded-3xl
p-6
"

>


<h2

className="
text-xl
font-bold
mb-5
"

>

Revenue Overview

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









{/* LOWER ANALYTICS */}



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
p-6
"

>


<h2

className="
text-xl
font-bold
mb-5
"

>

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

fill="#14b8a6"

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
p-6
"

>


<h2

className="
text-xl
font-bold
mb-5
"

>

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

programData.map((entry,index)=>(

<Cell key={index}/>

))

}


</Pie>


</PieChart>



</ResponsiveContainer>


</div>




</div>







</div>


)

}