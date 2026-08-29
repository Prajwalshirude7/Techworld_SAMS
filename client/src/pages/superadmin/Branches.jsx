import {
Plus,
Search,
Building2,
Pencil,
Trash2,
X,
UserCog
} from "lucide-react";


import {
motion
} from "framer-motion";


import {
useEffect,
useState
} from "react";







export default function Branches(){



const [branches,setBranches]=useState([]);


const [search,setSearch]=useState("");


const [showModal,setShowModal]=useState(false);


const [editId,setEditId]=useState(null);







const initialForm={


branchName:"",

location:"",

phone:"",

email:"",


adminName:"",

adminEmail:"",


status:"Active"


};





const [form,setForm]=useState(initialForm);









// LOAD BRANCHES


useEffect(()=>{


const saved = JSON.parse(

localStorage.getItem("academyBranches")

||

"[]"

);



setBranches(saved);



},[]);









const saveBranches=(data)=>{


setBranches(data);



localStorage.setItem(

"academyBranches",

JSON.stringify(data)

);



};









const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});



};









const saveBranch=()=>{


if(

!form.branchName ||

!form.location

){


return;


}







if(editId){



const updated = branches.map(item=>{


if(item.id===editId){


return{

...item,

...form

};


}



return item;



});




saveBranches(updated);



}

else{


const newBranch={


id:Date.now(),

...form


};



saveBranches([

...branches,

newBranch

]);



}







setForm(initialForm);


setEditId(null);


setShowModal(false);



};









const editBranch=(branch)=>{


setForm(branch);


setEditId(branch.id);


setShowModal(true);



};









const deleteBranch=(id)=>{


const updated = branches.filter(

item=>

item.id!==id

);



saveBranches(updated);



};









const filteredBranches = branches.filter(item=>


item.branchName

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


      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
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

Branch Management

</h1>



<p

className="
text-slate-400
mt-2
"

>

Create branches and assign branch administrators.

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
w-fit
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

className="
text-slate-400
"

/>



<input


placeholder="Search branch..."


value={search}


onChange={(e)=>setSearch(e.target.value)}


className="
bg-transparent
outline-none
py-3
w-full
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
gap-6
mt-8
"

>





{

filteredBranches.length===0 &&


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


No branches created yet.


</div>


}









{

filteredBranches.map((branch,index)=>(



<motion.div


key={branch.id}



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
rounded-2xl
"

>


<Building2

className="
text-teal-400
"

size={30}

/>


</div>







<span

className="
bg-green-500/20
text-green-400
px-3
py-1
rounded-full
text-sm
"

>


{branch.status}


</span>



</div>









<h2

className="
text-xl
font-bold
mt-6
"

>


{branch.branchName}


</h2>





<p

className="
text-slate-400
mt-2
"

>


{branch.location}


</p>









<div

className="
mt-5
bg-[#07131f]
rounded-xl
p-4
space-y-2
"

>


<div

className="
flex
items-center
gap-2
"

>


<UserCog

size={18}

className="
text-teal-400
"

/>



<p>


{branch.adminName || "No Admin Assigned"}


</p>


</div>



<p className="
text-sm
text-slate-400
"


>


{branch.adminEmail || "No admin email"}


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


onClick={()=>editBranch(branch)}



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


onClick={()=>deleteBranch(branch.id)}



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


          ))}

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



<motion.div


initial={{

scale:0.9,

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

              <div>

<h2

className="
text-2xl
font-black
"

>


{

editId

?

"Edit Branch"

:

"Create Branch"

}


</h2>



                <p
                  className="
                    text-slate-400
                    text-sm
                    mt-1
                  "
                >
                  {editingBranch
                    ? "Update branch information"
                    : "Enter branch details"}
                </p>

              </div>

<button


onClick={()=>setShowModal(false)}


>


<X/>


</button>



</div>









{

[

["branchName","Branch Name"],

["location","Location"],

["phone","Contact Number"],

["email","Branch Email"],

["adminName","Branch Admin Name"],

["adminEmail","Admin Email"]

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
px-4
py-3
outline-none
"



/>



))


}






              </div>

              <div
                className="
                  flex
                  gap-3
                  pt-3
                "
              >

<button


onClick={saveBranch}


className="
mt-6
w-full
bg-teal-500
hover:bg-teal-600
py-3
rounded-xl
font-bold
"

>


{

editId

?

"Update Branch"

:

"Save Branch"

}


                </button>




            </form>



</motion.div>



        </div>



}









</div>


);



}