import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  Users,
  Building2,
  FileText,
  IndianRupee,
  Image,
  Megaphone,
  UserCog,
  CreditCard,
  Package,
  BarChart3,
  TrendingUp,
  CheckCircle,
  ArrowRight
} from "lucide-react";


import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/images/logosams.png";



export default function SuperAdminDashboard(){


const navigate = useNavigate();
const [dashboardData, setDashboardData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const response = await api.get("/admin/dashboard");

      console.log("Dashboard API Response:", response.data);

      if (response.data.success) {
        setDashboardData(response.data.data);
      } else {
        setError("Failed to load dashboard data");
      }

    } catch (err) {
      console.error("Dashboard API Error:", err);

      setError(
        err.response?.data?.message ||
        "Failed to load dashboard data"
      );

    } finally {
      setLoading(false);
    }
  };

  fetchDashboard();
}, []);


const stats=[

{
title:"Total Students",
value:"1200",
icon:Users
},

{
title:"Total Branches",
value:"12",
icon:Building2
},

{
title:"Pending Admissions",
value:"45",
icon:FileText
},

{
title:"Total Revenue",
value:"₹8,50,000",
icon:IndianRupee
}

];





const actions=[


{
title:"Manage Admissions",
desc:"Approve and manage applications",
icon:FileText,
path:"/super-admin/admissions"
},


{
title:"Manage Branches",
desc:"Create and control branches",
icon:Building2,
path:"/super-admin/branches"
},


{
title:"Gallery",
desc:"Manage uploaded images",
icon:Image,
path:"/super-admin/gallery"
},


{
title:"Announcements",
desc:"Post important updates",
icon:Megaphone,
path:"/super-admin/announcements"
},


{
title:"Branch Admins",
desc:"Manage administrator accounts",
icon:UserCog,
path:"/super-admin/branch-admins"
},


{
title:"Payments",
desc:"Track transactions",
icon:CreditCard,
path:"/super-admin/payments"
},


{
title:"Products",
desc:"Manage products",
icon:Package,
path:"/super-admin/products"
},


{
title:"Reports",
desc:"View analytics and reports",
icon:BarChart3,
path:"/super-admin/reports"
}


];





const activities=[

{
title:"New admission request received",
time:"10 minutes ago",
icon:FileText
},

{
title:"Branch information updated",
time:"1 hour ago",
icon:Building2
},

{
title:"New announcement published",
time:"Today",
icon:Megaphone
},

{
title:"Payment received",
time:"Today",
icon:CheckCircle
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
space-y-8
"

>





{/* WELCOME CARD */}

<motion.div

initial={{
opacity:0,
y:-20
}}

animate={{
opacity:1,
y:0
}}

className="
relative
overflow-hidden
bg-gradient-to-r
from-[#102235]
via-[#163b57]
to-[#102235]
border
border-slate-700
rounded-3xl
p-6
sm:p-8
flex
items-center
justify-between
gap-5
"

>


{/* TEXT */}

<div
className="
flex-1
"
>


<h1

className="
text-white
text-3xl
sm:text-4xl
lg:text-5xl
font-black
flex
items-center
gap-3
"

>

Welcome,

<span

className="
text-teal-400
text-3xl
sm:text-4xl
lg:text-5xl
font-black
drop-shadow-[0_0_15px_rgba(20,184,166,0.5)]
"

>

Rushikesh Tarde

</span>


<span>
👋
</span>


</h1>



<p

className="
text-slate-300
text-base
sm:text-lg
mt-5
max-w-2xl
"

>

Manage users, branches, applications and operations from one place.

</p>



</div>







{/* LOGO */}


<motion.div

whileHover={{
scale:1.05
}}

className="
hidden
md:flex
w-28
h-28
rounded-full
bg-teal-500/10
items-center
justify-center
shadow-[0_0_35px_rgba(20,184,166,.35)]
"

>


<img

src={logo}

alt="SAMS Logo"

className="
w-20
h-20
rounded-full
object-cover
"

/>


</motion.div>




</motion.div>








{/* STATS */}



<div

className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-4
gap-6
"

>


{

stats.map((item,index)=>{


const Icon=item.icon;


return(


<motion.div

key={index}

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
items-center
"

>


<div>


<p

className="
text-slate-400
"

>

{item.title}

</p>



<h2

className="
text-white
font-black
text-3xl
mt-3
"

>

{item.value}

</h2>


</div>



<div

className="
bg-teal-500/20
p-4
rounded-2xl
"

>


<Icon

size={32}

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









{/* QUICK ACTIONS */}



<section>


<h2

className="
text-white
text-3xl
font-black
mb-6
"

>

Quick Actions

</h2>




<div

className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-6
"

>


{

actions.map((item,index)=>{


const Icon=item.icon;


return(


<motion.div


key={index}


whileHover={{

y:-10,

scale:1.02

}}


onClick={()=>navigate(item.path)}


className="
cursor-pointer
bg-[#102235]
border
border-slate-700
rounded-3xl
p-6
transition
"

>


<div

className="
bg-teal-500/20
w-fit
p-4
rounded-2xl
"

>


<Icon

size={30}

className="
text-teal-400
"

/>


</div>





<h3

className="
text-white
text-xl
font-bold
mt-5
"

>

{item.title}

</h3>




<p

className="
text-slate-400
mt-2
"

>

{item.desc}

</p>




<div

className="
flex
justify-between
items-center
mt-5
"

>


<span

className="
text-teal-400
font-semibold
"

>

Open

</span>



<ArrowRight

size={20}

className="
text-teal-400
"

/>


</div>



</motion.div>


)


})


}


</div>


</section>









{/* RECENT ACTIVITY */}



<section

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
text-white
text-2xl
font-black
mb-6
"

>

Recent Activity

</h2>




<div

className="
space-y-5
"

>


{

activities.map((item,index)=>{


const Icon=item.icon;


return(

<div

key={index}

className="
flex
items-center
gap-4
"

>


<div

className="
bg-teal-500/20
p-3
rounded-xl
"

>


<Icon

className="
text-teal-400
"

/>


</div>



<div>


<p

className="
text-white
font-semibold
"

>

{item.title}

</p>



<p

className="
text-slate-400
text-sm
"

>

{item.time}

</p>


</div>


</div>

)


})


}


</div>



</section>









{/* OVERVIEW */}



<motion.div

whileHover={{
scale:1.01
}}

className="
bg-gradient-to-r
from-[#12344d]
to-[#102235]
border
border-teal-500/30
rounded-3xl
p-6
flex
items-center
gap-5
"

>


<div

className="
bg-teal-500/20
p-4
rounded-2xl
"

>


<TrendingUp

className="
text-teal-400
"

size={35}

/>


</div>



<div>


<h2

className="
text-white
text-xl
font-bold
"

>

System Overview

</h2>



<p

className="
text-slate-300
mt-2
"

>

Monitor organization growth, users and daily activities.

</p>


</div>



</motion.div>






</div>


)

}