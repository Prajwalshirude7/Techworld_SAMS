import {
Plus,
Trash2,
X,
Trophy
} from "lucide-react";


import {
useState,
useEffect
} from "react";


import {
motion
} from "framer-motion";





export default function Achievements(){


const [achievements,setAchievements]=useState([]);

const [showModal,setShowModal]=useState(false);



const [form,setForm]=useState({

title:"",
description:"",
year:""

});







useEffect(()=>{


const data=JSON.parse(

localStorage.getItem("academyAchievements")

||

"[]"

);


setAchievements(data);


},[]);









const saveData=(data)=>{


setAchievements(data);


localStorage.setItem(

"academyAchievements",

JSON.stringify(data)

);


};








const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};









const addAchievement=()=>{


if(!form.title)
return;



const newAchievement={

id:Date.now(),

...form

};



saveData([

...achievements,

newAchievement

]);



setForm({

title:"",
description:"",
year:""

});


setShowModal(false);


};









const deleteAchievement=(id)=>{


saveData(

achievements.filter(

item=>item.id!==id

)

);


};









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
items-start
gap-5
"

>



<div>


<h1

className="
text-3xl
sm:text-4xl
font-black
leading-tight
"

>

Manage Achievements

</h1>



<p

className="
text-slate-400
mt-2
text-sm
sm:text-base
"

>

Achievements displayed on public website.

</p>


</div>








<button

onClick={()=>setShowModal(true)}

className="
bg-teal-500
hover:bg-teal-600
px-4
py-3
rounded-xl
font-bold
flex
items-center
gap-2
text-sm
sm:text-base
"

>


<Plus size={18}/>


Add Achievement


</button>



</div>









{/* CARDS */}



<div

className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-5
mt-8
"

>






{

achievements.length===0 &&


<div

className="
col-span-full
bg-[#102235]
border
border-slate-700
rounded-3xl
p-8
sm:p-10
text-center
text-slate-400
"

>


<Trophy

size={35}

className="
mx-auto
mb-4
text-teal-400
"

/>



No achievements added.


</div>



}










{

achievements.map(item=>(



<motion.div


key={item.id}


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
bg-teal-500/20
p-3
rounded-xl
w-fit
"

>


<Trophy

size={25}

className="
text-teal-400
"

/>


</div>






<h2

className="
text-xl
font-bold
mt-5
"

>

{item.title}

</h2>






<p

className="
text-slate-400
mt-3
text-sm
"

>

{item.description}

</p>






<p

className="
text-teal-400
mt-3
font-semibold
"

>

{item.year}

</p>






<button

onClick={()=>deleteAchievement(item.id)}

className="
mt-5
bg-red-500/20
text-red-400
px-4
py-2
rounded-xl
"

>


<Trash2 size={18}/>


</button>




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
z-50
flex
items-center
justify-center
p-4
"

>



<div

className="
bg-[#102235]
border
border-slate-700
rounded-3xl
p-5
w-full
max-w-xl
"

>



<div

className="
flex
justify-between
items-center
"

>


<h2

className="
text-xl
sm:text-2xl
font-bold
"

>

Add Achievement

</h2>



<button

onClick={()=>setShowModal(false)}

>


<X/>


</button>



</div>









{

[

["title","Achievement Title"],

["year","Year"]

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
outline-none
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
outline-none
"

/>









<button

onClick={addAchievement}

className="
mt-5
w-full
bg-teal-500
hover:bg-teal-600
py-3
rounded-xl
font-bold
"

>


Save Achievement


</button>







</div>



</div>



}





</div>



);


}