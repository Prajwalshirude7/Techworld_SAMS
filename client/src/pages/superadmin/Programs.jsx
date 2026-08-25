import {
  Plus,
  Pencil,
  Trash2,
  X,
  IndianRupee,
  Clock,
  CheckCircle,
  CircleOff,
  Trophy
} from "lucide-react";

import { motion } from "framer-motion";
import { useState } from "react";



export default function Programs(){



const defaultPrograms=[

{
id:1,
name:"Beginner Skating Batch",
category:"Beginner",
duration:"1 Month",
fees:"1500",
description:
"Basic skating training for beginners including balance, control and skating fundamentals.",
status:"Active"
},


{
id:2,
name:"Quad Skating Program",
category:"Intermediate",
duration:"1 Month",
fees:"1200",
description:
"Quad skating training with advanced techniques and road skating practice.",
status:"Active"
},


{
id:3,
name:"Inline Skating Program",
category:"Advanced",
duration:"1 Month",
fees:"1200",
description:
"Inline skating training focused on speed, skills and performance improvement.",
status:"Active"
},


{
id:4,
name:"Professional Inline Training",
category:"Professional",
duration:"1 Month",
fees:"1200",
description:
"Professional level skating training for competitions and advanced athletes.",
status:"Inactive"
}

];





const [programs,setPrograms]=useState(()=>{


const saved =
localStorage.getItem("academyPrograms");


return saved
?
JSON.parse(saved)
:
defaultPrograms;


});





const [showModal,setShowModal]=useState(false);


const [editMode,setEditMode]=useState(false);


const [selectedProgram,setSelectedProgram]=useState(null);





const [programData,setProgramData]=useState({

name:"",
category:"",
duration:"",
fees:"",
description:"",
status:"Active"

});







const handleChange=(e)=>{


setProgramData({

...programData,

[e.target.name]:e.target.value

});


};








const openAddModal=()=>{


setEditMode(false);


setProgramData({

name:"",
category:"",
duration:"",
fees:"",
description:"",
status:"Active"

});


setShowModal(true);


};









const editProgram=(program)=>{


setEditMode(true);


setSelectedProgram(program);


setProgramData(program);


setShowModal(true);


};









const closeModal=()=>{


setShowModal(false);


setEditMode(false);


setSelectedProgram(null);


};









const saveProgram=()=>{



let updated;



if(editMode){


updated=programs.map((item)=>

item.id===selectedProgram.id

?

{
...item,
...programData
}

:

item

);


}

else{


updated=[

...programs,

{

id:Date.now(),

...programData

}

];


}





setPrograms(updated);



localStorage.setItem(

"academyPrograms",

JSON.stringify(updated)

);



closeModal();



};









const deleteProgram=(id)=>{


const updated=

programs.filter(

(item)=>item.id!==id

);



setPrograms(updated);



localStorage.setItem(

"academyPrograms",

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

Programs Management

</h1>


<p

className="
text-slate-400
mt-2
"

>

Manage skating courses, fees and training programs.

</p>


</div>






<button


onClick={openAddModal}


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

Add Program

</button>




</div>









{/* PROGRAM CARDS */}



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

programs.map((program)=>(



<motion.div


key={program.id}


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


<Trophy

className="
text-teal-400
"

size={30}

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
program.status==="Active"

?

"bg-green-500/20 text-green-400"

:

"bg-red-500/20 text-red-400"

}

`}

>


{program.status}

</span>


</div>









<h2

className="
text-xl
font-bold
mt-6
"

>

{program.name}

</h2>




<p

className="
text-slate-400
mt-2
"

>

{program.description}

</p>








<div

className="
mt-6
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

<Clock

size={18}

className="
text-teal-400
"

/>


{program.duration}

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


₹{program.fees}/month

</p>




<p>

Category:

<span className="
text-white
ml-2
"

>

{program.category}

</span>


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


onClick={()=>editProgram(program)}


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


<Pencil size={18}/>

Edit


</button>







<button


onClick={()=>deleteProgram(program.id)}


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
"Edit Program"
:
"Add Program"
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

["name","Program Name"],

["category","Category"],

["duration","Duration"],

["fees","Monthly Fees"]

]

.map(([key,placeholder])=>(


<input

key={key}

name={key}

value={programData[key]}

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
outline-none
"

/>


))

}






<textarea


name="description"

value={programData.description}

onChange={handleChange}

placeholder="Program Description"


className="
w-full
mb-4
bg-[#07131f]
border
border-slate-700
rounded-xl
px-4
py-3
outline-none
"

rows="4"

/>







<select


name="status"

value={programData.status}

onChange={handleChange}


className="
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


onClick={saveProgram}


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
"Update Program"
:
"Save Program"

}

</button>






</div>



</div>



}



</div>


);


}