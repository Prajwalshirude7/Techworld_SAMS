import {
Plus,
Pencil,
Trash2,
X,
IndianRupee,
Clock,
Trophy,
Search
} from "lucide-react";


import {motion} from "framer-motion";


import {
useState,
useEffect
} from "react";





export default function Programs(){



const emptyForm={

name:"",
category:"",
duration:"",
fees:"",
description:"",
status:"Active"

};




const [programs,setPrograms]=useState([]);

const [showModal,setShowModal]=useState(false);

const [editId,setEditId]=useState(null);

const [search,setSearch]=useState("");



const [form,setForm]=useState(emptyForm);








// LOAD


useEffect(()=>{


const data=JSON.parse(

localStorage.getItem("academyPrograms")

||

"[]"

);


setPrograms(data);



},[]);









const savePrograms=(data)=>{


setPrograms(data);


localStorage.setItem(

"academyPrograms",

JSON.stringify(data)

);



};









const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};









const submitProgram=()=>{


if(

!form.name ||

!form.duration ||

!form.fees

){


alert(
"Please fill required details"
);


return;


}






if(editId){



const updated=

programs.map(item=>

item.id===editId

?

{

...item,

...form

}

:

item

);



savePrograms(updated);



}

else{



const newProgram={


id:Date.now(),

...form,


createdAt:

new Date().toLocaleDateString()


};





savePrograms([

...programs,

newProgram

]);



}






setForm(emptyForm);

setEditId(null);

setShowModal(false);



};









const editProgram=(program)=>{


setForm(program);

setEditId(program.id);

setShowModal(true);



};









const deleteProgram=(id)=>{


const updated=

programs.filter(

item=>

item.id!==id

);


savePrograms(updated);



};








const filteredPrograms=

programs.filter(item=>

item.name

.toLowerCase()

.includes(

search.toLowerCase()

)

);









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
sm:text-5xl
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

Programs created here will appear on student website.

</p>



</div>






<button


onClick={()=>setShowModal(true)}


className="
bg-teal-500
hover:bg-teal-600
px-5
py-3
rounded-xl
font-bold
flex
items-center
gap-2
"

>


<Plus/>

Add Program


</button>


</div>









{/* STATS */}


<div

className="
grid
grid-cols-1
sm:grid-cols-3
gap-5
mt-8
"

>


{

[

[
"Total Programs",
programs.length
],

[
"Active",
programs.filter(
p=>p.status==="Active"
).length
],

[
"Inactive",
programs.filter(
p=>p.status==="Inactive"
).length
]


].map((item,index)=>(



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


<p className="
text-slate-400
">

{item[0]}

</p>


<h2 className="
text-4xl
font-black
mt-2
">

{item[1]}

</h2>



</motion.div>


))


}



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

className="
text-slate-400
"

/>


<input


placeholder="Search programs..."


value={search}


onChange={(e)=>
setSearch(e.target.value)
}


className="
bg-transparent
outline-none
w-full
py-3
"


/>


</div>


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

filteredPrograms.length===0 &&


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

No programs created.

</div>


}







{

filteredPrograms.map((program,index)=>(


<motion.div


key={program.id}


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
"

>


<div

className="
bg-teal-500/20
p-4
rounded-xl
"

>


<Trophy

className="
text-teal-400
"

/>


</div>





<span

className={`

px-3
py-1
rounded-full
text-sm

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
mt-5
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
mt-5
space-y-3
"

>


<p className="
flex
gap-2
items-center
">

<Clock

size={18}

className="
text-teal-400
"

/>


{program.duration}

</p>





<p className="
flex
gap-2
items-center
">

<IndianRupee

size={18}

className="
text-teal-400
"

/>


{program.fees}

</p>




<p>

Category:

<span className="
text-teal-400
ml-2
">

{program.category}

</span>

</p>


</div>









<div

className="
flex
gap-3
mt-6
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
"

>


<Pencil/>

</button>






<button


onClick={()=>deleteProgram(program.id)}


className="
flex-1
bg-red-500/20
text-red-400
rounded-xl
"

>


<Trash2/>

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
bg-black/70
flex
items-center
justify-center
p-4
z-50
"

>


<motion.div


initial={{
scale:.8,
opacity:0
}}


animate={{
scale:1,
opacity:1
}}


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
"

>


<h2 className="
text-2xl
font-black
">

{
editId
?
"Edit Program"
:
"Add Program"
}

</h2>


<button

onClick={()=>setShowModal(false)}

>

<X/>

</button>


</div>







{

[
["name","Program Name"],
["category","Category"],
["duration","Duration"],
["fees","Fees"]

].map(([key,label])=>(


<input


key={key}

name={key}

placeholder={label}

value={form[key]}

onChange={handleChange}


className="
w-full
mt-4
bg-[#07131f]
border
border-slate-700
rounded-xl
p-3
"

/>


))


}





<textarea


name="description"

placeholder="Description"

value={form.description}

onChange={handleChange}


className="
w-full
mt-4
bg-[#07131f]
border
border-slate-700
rounded-xl
p-3
"

/>





<button


onClick={submitProgram}


className="
mt-5
w-full
bg-teal-500
py-3
rounded-xl
font-bold
"

>


Save Program


</button>



</motion.div>


</div>


}



</div>


);


}