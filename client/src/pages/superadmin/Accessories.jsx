import {
Plus,
Trash2
} from "lucide-react";

import {
useEffect,
useState
} from "react";


export default function Accessories(){

const [items,setItems]=useState([]);

const [name,setName]=useState("");



useEffect(()=>{

const data=JSON.parse(
localStorage.getItem("academyAccessories") || "[]"
);

setItems(data);

},[]);





const addItem=()=>{

if(!name)
return;


const newItem={

id:Date.now(),
name

};


const updated=[
...items,
newItem
];


setItems(updated);


localStorage.setItem(
"academyAccessories",
JSON.stringify(updated)
);


setName("");

};





const deleteItem=(id)=>{


const updated=items.filter(
item=>item.id!==id
);


setItems(updated);


localStorage.setItem(
"academyAccessories",
JSON.stringify(updated)
);


};



return(

<div className="
min-h-screen
bg-[#07131f]
text-white
p-5
sm:p-10
">


<div className="
flex
justify-between
items-center
">


<h1 className="
text-4xl
font-black
">

Manage Accessories

</h1>


</div>




<div className="
mt-8
bg-[#102235]
p-6
rounded-3xl
">


<input

value={name}

onChange={(e)=>setName(e.target.value)}

placeholder="Accessory name"

className="
bg-[#07131f]
border
border-slate-700
rounded-xl
p-3
w-full
"

/>


<button

onClick={addItem}

className="
mt-4
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

Add Accessory

</button>


</div>






<div className="
grid
grid-cols-1
md:grid-cols-3
gap-5
mt-8
">


{
items.map(item=>(

<div

key={item.id}

className="
bg-[#102235]
rounded-3xl
p-5
border
border-slate-700
flex
justify-between
"

>

<p>
{item.name}
</p>


<button

onClick={()=>deleteItem(item.id)}

className="
text-red-400
"

>

<Trash2/>

</button>


</div>

))

}


</div>



</div>

);


}