import {
Plus,
Trash2,
Megaphone,
X,
Calendar
} from "lucide-react";


import {
motion
} from "framer-motion";


import {
useEffect,
useState
} from "react";





export default function Announcements(){



const emptyForm={

title:"",
message:"",
date:""

};





const [announcements,setAnnouncements]=useState([]);


const [showModal,setShowModal]=useState(false);


const [form,setForm]=useState(emptyForm);









// LOAD DATA


useEffect(()=>{


const saved = JSON.parse(

localStorage.getItem("academyAnnouncements")

||

"[]"

);


setAnnouncements(saved);



},[]);









const saveAnnouncements=(data)=>{


setAnnouncements(data);


localStorage.setItem(

"academyAnnouncements",

JSON.stringify(data)

);


};









const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};









const addAnnouncement=()=>{


if(

!form.title ||

!form.message

){


alert(
"Please fill announcement details"
);


return;


}






const newAnnouncement={


id:Date.now(),


...form,


date:

new Date().toLocaleDateString()



};






saveAnnouncements([

...announcements,

newAnnouncement

]);





setForm(emptyForm);


setShowModal(false);



};









const deleteAnnouncement=(id)=>{


const updated = announcements.filter(

item=>

item.id!==id

);



saveAnnouncements(updated);



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

Announcements

</h1>




<p

className="
text-slate-400
mt-2
"

>

Share important academy updates.

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


<Plus size={20}/>


Create Announcement


</button>




</div>









{/* LIST */}



<div

className="
mt-8
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-6
"

>








{

announcements.length===0 &&


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


No announcements available.

</div>


}









{

announcements.map((item,index)=>(


<motion.div


key={item.id}



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
w-fit
p-4
rounded-2xl
"

>


<Megaphone

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
leading-relaxed
"

>

{item.message}

</p>







<div

className="
flex
items-center
justify-between
mt-6
"

>


<p

className="
text-sm
text-slate-400
flex
items-center
gap-2
"

>


<Calendar size={16}/>


{item.date}


</p>







<button


onClick={()=>deleteAnnouncement(item.id)}


className="
bg-red-500/20
text-red-400
p-3
rounded-xl
"

>


<Trash2 size={18}/>


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
items-center
"

>


<h2

className="
text-2xl
font-black
"

>

New Announcement

</h2>




<button


onClick={()=>setShowModal(false)}

>

<X/>

</button>



</div>









<input


name="title"


placeholder="Announcement Title"


value={form.title}


onChange={handleChange}


className="
w-full
mt-5
bg-[#07131f]
border
border-slate-700
rounded-xl
p-3
"

 />









<textarea


name="message"


placeholder="Announcement Message"


value={form.message}


onChange={handleChange}


rows="5"


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


onClick={addAnnouncement}


className="
mt-5
w-full
bg-teal-500
py-3
rounded-xl
font-bold
"

>


Publish Announcement


</button>







</motion.div>


</div>


}





</div>


);


}