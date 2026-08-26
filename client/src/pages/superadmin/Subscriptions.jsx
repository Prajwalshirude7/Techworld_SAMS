import {
  Plus,
  Pencil,
  Trash2,
  X,
  IndianRupee,
  CalendarDays,
  CheckCircle,
  CircleOff
} from "lucide-react";

import { motion } from "framer-motion";
import { useState } from "react";



export default function Subscriptions(){



const defaultPlans=[


{
id:1,
name:"Monthly Skating Plan",
duration:"1 Month",
price:"1200",
benefits:
"Regular skating classes, basic training and academy support",
status:"Active"
},



{
id:2,
name:"Quarterly Skating Plan",
duration:"3 Months",
price:"3200",
benefits:
"Advanced training, weekend practice and progress tracking",
status:"Active"
},




{
id:3,
name:"Half Yearly Membership",
duration:"6 Months",
price:"6000",
benefits:
"Complete skating program with skill development",
status:"Active"
},




{
id:4,
name:"Annual Membership",
duration:"12 Months",
price:"11000",
benefits:
"Professional training, competitions and priority support",
status:"Inactive"
}



];







const [plans,setPlans]=useState(()=>{


const saved=

localStorage.getItem(
"subscriptionPlans"
);


return saved
?
JSON.parse(saved)
:
defaultPlans;


});







const [showModal,setShowModal]=useState(false);


const [editMode,setEditMode]=useState(false);


const [selectedPlan,setSelectedPlan]=useState(null);





const [planData,setPlanData]=useState({

name:"",
duration:"",
price:"",
benefits:"",
status:"Active"

});








const handleChange=(e)=>{


setPlanData({

...planData,

[e.target.name]:e.target.value

});


};









const openAdd=()=>{


setEditMode(false);


setPlanData({

name:"",
duration:"",
price:"",
benefits:"",
status:"Active"

});


setShowModal(true);


};









const editPlan=(plan)=>{


setEditMode(true);


setSelectedPlan(plan);


setPlanData(plan);


setShowModal(true);


};









const closeModal=()=>{


setShowModal(false);


setEditMode(false);


setSelectedPlan(null);


};









const savePlan=()=>{


let updated;



if(editMode){


updated=

plans.map((item)=>

item.id===selectedPlan.id

?

{
...item,
...planData
}

:

item

);


}

else{


updated=[

...plans,

{

id:Date.now(),

...planData

}

];


}





setPlans(updated);



localStorage.setItem(

"subscriptionPlans",

JSON.stringify(updated)

);



closeModal();


};









const deletePlan=(id)=>{


const updated=

plans.filter(

(item)=>item.id!==id

);



setPlans(updated);



localStorage.setItem(

"subscriptionPlans",

JSON.stringify(updated)

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
font-black
"

>

Subscription Management

</h1>


<p

className="
text-slate-400
mt-2
"

>

Manage academy membership plans and pricing.

</p>


</div>








<button

onClick={openAdd}

className="
bg-teal-500
px-6
py-3
rounded-xl
font-bold
flex
items-center
justify-center
gap-2
"

>


<Plus size={20}/>

Add Plan


</button>


</div>









{/* CARDS */}



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

plans.map((plan)=>(



<motion.div


key={plan.id}


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


<CalendarDays

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
plan.status==="Active"

?

"bg-green-500/20 text-green-400"

:

"bg-red-500/20 text-red-400"

}

`}

>


{plan.status}

</span>



</div>








<h2

className="
text-2xl
font-bold
mt-6
"

>

{plan.name}

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

<CalendarDays

size={18}

className="
text-teal-400
"

/>


{plan.duration}

</p>






<p

className="
flex
items-center
gap-3
"

>


<IndianRupee

size={18}

className="
text-teal-400
"

/>


₹{plan.price}


</p>







<p>

{plan.benefits}

</p>



</div>








<div

className="
flex
gap-3
mt-8
"

>


<button

onClick={()=>editPlan(plan)}

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


<Pencil size={18}/>

Edit


</button>







<button

onClick={()=>deletePlan(plan.id)}

className="
flex-1
bg-red-500/20
text-red-400
rounded-xl
py-3
flex
justify-center
gap-2
"

>


<Trash2 size={18}/>

Delete


</button>



</div>







</motion.div>


))


}



</div>









{/* MODAL */}



{

showModal &&


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
p-6
w-full
max-w-xl
"

>



<div

className="
flex
justify-between
items-center
mb-6
"

>


<h2

className="
text-2xl
font-bold
"

>

{

editMode
?
"Edit Subscription"
:
"Add Subscription"

}

</h2>



<button

onClick={closeModal}

>

<X/>

</button>



</div>







{

[
["name","Plan Name"],
["duration","Duration"],
["price","Price"]

]

.map(([key,placeholder])=>(


<input

key={key}

name={key}

value={planData[key]}

onChange={handleChange}

placeholder={placeholder}

className="
w-full
mb-4
bg-[#07131f]
border
border-slate-700
rounded-xl
px-4
py-3
"

/>


))

}






<textarea

name="benefits"

value={planData.benefits}

onChange={handleChange}

placeholder="Benefits"

rows="4"

className="
w-full
bg-[#07131f]
border
border-slate-700
rounded-xl
px-4
py-3
"

/>







<select

name="status"

value={planData.status}

onChange={handleChange}

className="
mt-4
w-full
bg-[#07131f]
border
border-slate-700
rounded-xl
px-4
py-3
"

>


<option>
Active
</option>


<option>
Inactive
</option>


</select>









<button

onClick={savePlan}

className="
mt-5
w-full
bg-teal-500
py-3
rounded-xl
font-bold
"

>


{

editMode
?
"Update Plan"
:
"Save Plan"

}


</button>






</div>


</div>


}



</div>


);


}