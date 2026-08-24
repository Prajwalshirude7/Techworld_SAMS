import {
  UserCog,
  Search,
  Plus,
  Pencil,
  Trash2,
  Mail,
  Phone,
  Building2,
  X
} from "lucide-react";

import { motion } from "framer-motion";
import { useState } from "react";


export default function BranchAdmins(){


const [search,setSearch]=useState("");

const [showModal,setShowModal]=useState(false);

const [editMode,setEditMode]=useState(false);

const [selectedAdmin,setSelectedAdmin]=useState(null);



const [admins,setAdmins]=useState([


{
id:1,
name:"Amit Patil",
email:"amit@gmail.com",
phone:"9876543210",
branch:"Pune Camp",
status:"Active"
},


{
id:2,
name:"Sneha More",
email:"sneha@gmail.com",
phone:"8765432109",
branch:"Nashik Road",
status:"Active"
}


]);




const [adminData,setAdminData]=useState({

name:"",
email:"",
phone:"",
branch:"",
status:"Active"

});





const handleChange=(e)=>{


setAdminData({

...adminData,

[e.target.name]:e.target.value

});


};





const closeModal=()=>{


setShowModal(false);

setEditMode(false);

setSelectedAdmin(null);


setAdminData({

name:"",
email:"",
phone:"",
branch:"",
status:"Active"

});


};








const addAdmin=()=>{


setAdmins([

...admins,

{
id:Date.now(),
...adminData
}

]);


closeModal();


};








const editAdmin=(admin)=>{


setSelectedAdmin(admin);


setAdminData({

name:admin.name,
email:admin.email,
phone:admin.phone,
branch:admin.branch,
status:admin.status

});


setEditMode(true);

setShowModal(true);


};







const updateAdmin=()=>{


setAdmins(

admins.map((admin)=>


admin.id===selectedAdmin.id

?

{
...admin,
...adminData
}

:

admin


)

);


closeModal();


};








const deleteAdmin=(id)=>{


setAdmins(

admins.filter(

(admin)=>admin.id!==id

)

);


};








return(


<div

className="
min-h-screen
bg-[#07131f]
p-6
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
text-4xl
font-black
"

>

Branch Admin Management

</h1>


<p

className="
text-slate-400
mt-2
"

>

Manage branch administrators and access control.

</p>


</div>





<button

onClick={()=>setShowModal(true)}

className="
bg-teal-500
px-6
py-3
rounded-xl
font-bold
flex
items-center
gap-2
"

>


<Plus size={20}/>

Add Admin

</button>



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

className="text-slate-400"

/>


<input

placeholder="Search admin..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="
bg-transparent
outline-none
w-full
py-3
"

/>



</div>


</div>









{/* ADMIN CARDS */}



<div

className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-7
mt-8
"

>


{


admins

.filter((admin)=>

admin.name
.toLowerCase()
.includes(search.toLowerCase())

)

.map((admin)=>(



<motion.div


key={admin.id}


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
"

>


<div

className="
bg-teal-500/20
p-4
rounded-2xl
"

>


<UserCog

className="text-teal-400"

size={32}

/>


</div>




<span

className="
bg-green-500/20
text-green-400
px-4
py-2
rounded-full
h-fit
"

>

{admin.status}

</span>


</div>







<h2

className="
text-2xl
font-bold
mt-6
"

>

{admin.name}

</h2>







<div

className="
mt-5
space-y-4
text-slate-300
"

>


<p className="flex gap-3">

<Mail

size={20}

className="text-teal-400"

/>

{admin.email}

</p>




<p className="flex gap-3">

<Phone

size={20}

className="text-teal-400"

/>

{admin.phone}

</p>





<p className="flex gap-3">

<Building2

size={20}

className="text-teal-400"

/>

{admin.branch}

</p>


</div>









<div

className="
flex
gap-4
mt-8
"

>


<button

onClick={()=>editAdmin(admin)}

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

onClick={()=>deleteAdmin(admin.id)}

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
p-8
w-full
max-w-xl
"

>



<div

className="
flex
justify-between
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
"Edit Admin"
:
"Add Branch Admin"

}

</h2>



<button onClick={closeModal}>

<X/>

</button>


</div>







{

[
["name","Admin Name"],
["email","Email"],
["phone","Phone"],
["branch","Assigned Branch"]

]

.map(([key,placeholder])=>(


<input

key={key}

name={key}

value={adminData[key]}

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






<select

name="status"

value={adminData.status}

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

onClick={
editMode
?
updateAdmin
:
addAdmin
}

className="
w-full
bg-teal-500
py-3
rounded-xl
font-bold
mt-5
"

>


{

editMode
?
"Update Admin"
:
"Save Admin"

}


</button>





</div>


</div>


}



</div>


)

}