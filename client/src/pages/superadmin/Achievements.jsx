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
p-5
sm:p-8
lg:p-10
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


<h1

className="
text-4xl
font-black
"

>

Manage Achievements

</h1>


<p

className="
text-slate-400
mt-2
"

>

Achievements displayed on public website.

</p>


</div>





<button

onClick={()=>setShowModal(true)}

className="
bg-teal-500
px-5
py-3
rounded-xl
font-bold
flex
gap-2
"

>

<Plus/>

Add Achievement

</button>



</div>









<div

className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-6
mt-10
"

>


{

achievements.length===0 &&

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
p-6
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

className="text-teal-400"

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
"

>

{item.description}

</p>



<p

className="
text-teal-400
mt-3
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
"

>


<h2 className="
text-2xl
font-bold
">

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

onClick={addAchievement}

className="
mt-5
w-full
bg-teal-500
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