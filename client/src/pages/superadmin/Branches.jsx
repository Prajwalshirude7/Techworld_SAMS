import {
  Building2,
  MapPin,
  User,
  Phone,
  Pencil,
  Trash2,
  Search,
  Plus,
  X
} from "lucide-react";

import { motion } from "framer-motion";
import { useState } from "react";


export default function Branches(){


const [search,setSearch] = useState("");

const [showModal,setShowModal] = useState(false);

const [editMode,setEditMode] = useState(false);

const [selectedBranch,setSelectedBranch] = useState(null);



const [branches,setBranches] = useState([


{
id:1,
name:"Pune Camp",
code:"PUN001",
location:"Pune",
manager:"Amit Patil",
phone:"8765432109",
status:"Active"
},


{
id:2,
name:"Nashik Road",
code:"NAS001",
location:"Nashik",
manager:"Sneha More",
phone:"7654321098",
status:"Inactive"
}


]);





const [newBranch,setNewBranch]=useState({

name:"",
code:"",
location:"",
manager:"",
phone:"",
status:"Active"

});





const handleChange=(e)=>{


setNewBranch({

...newBranch,

[e.target.name]:e.target.value

});


};







const addBranch=()=>{


const branch={

id:Date.now(),

...newBranch

};


setBranches([

...branches,

branch

]);


closeModal();


};







const editBranch=(branch)=>{


setSelectedBranch(branch);


setNewBranch({

name:branch.name,

code:branch.code,

location:branch.location,

manager:branch.manager,

phone:branch.phone,

status:branch.status

});


setEditMode(true);

setShowModal(true);


};









const updateBranch=()=>{


const updatedBranches = branches.map((branch)=>{


if(branch.id===selectedBranch.id)

{

return{

...branch,

...newBranch

}

}


return branch;


});


setBranches(updatedBranches);


closeModal();


};









const deleteBranch=(id)=>{


setBranches(

branches.filter(

(branch)=>branch.id!==id

)

);


};










const closeModal=()=>{


setShowModal(false);

setEditMode(false);

setSelectedBranch(null);


setNewBranch({

name:"",
code:"",
location:"",
manager:"",
phone:"",
status:"Active"

});


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

Branch Management

</h1>


<p

className="
text-slate-400
mt-2
"

>

Create and manage academy branches.

</p>


</div>





<button

onClick={()=>setShowModal(true)}

className="
bg-teal-500
hover:bg-teal-600
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

Add Branch

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

placeholder="Search branches..."

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









{/* BRANCH CARDS */}



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

branches

.filter((branch)=>

branch.name
.toLowerCase()
.includes(search.toLowerCase())

)

.map((branch)=>(


<motion.div


key={branch.id}


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

<Building2

size={32}

className="text-teal-400"

/>


</div>





<span

className={`
px-4
py-2
rounded-full
text-sm

${
branch.status==="Active"

?

"bg-green-500/20 text-green-400"

:

"bg-red-500/20 text-red-400"

}

`}

>

{branch.status}

</span>



</div>







<h2

className="
text-2xl
font-bold
mt-6
"

>

{branch.name}

</h2>




<p

className="
text-slate-400
text-lg
"

>

Code: {branch.code}

</p>









<div

className="
space-y-4
mt-6
text-slate-300
"

>


<p className="flex gap-3 items-center">

<MapPin

size={20}

className="text-teal-400"

/>

{branch.location}

</p>




<p className="flex gap-3 items-center">

<User

size={20}

className="text-teal-400"

/>

{branch.manager}

</p>




<p className="flex gap-3 items-center">

<Phone

size={20}

className="text-teal-400"

/>

{branch.phone}

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


onClick={()=>editBranch(branch)}

className="
flex-1
border
border-slate-600
py-3
rounded-xl
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


onClick={()=>deleteBranch(branch.id)}

className="
flex-1
bg-red-500/20
text-red-400
py-3
rounded-xl
flex
justify-center
items-center
gap-2
hover:bg-red-500/30
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
z-50
p-5
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
"Edit Branch"
:
"Add New Branch"
}

</h2>



<button

onClick={closeModal}

>

<X/>

</button>


</div>








<div

className="
space-y-4
"

>


{

[
["name","Branch Name"],
["code","Branch Code"],
["location","Location"],
["manager","Manager Name"],
["phone","Phone"]

]

.map(([key,placeholder])=>(


<input

key={key}

name={key}

value={newBranch[key]}

onChange={handleChange}

placeholder={placeholder}

className="
w-full
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

value={newBranch.status}

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
updateBranch
:
addBranch

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
"Update Branch"
:
"Save Branch"

}


</button>



</div>


</div>


</div>


}



</div>


)


}