import {
  Plus,
  Trash2,
  Pencil,
  X,
  Image as ImageIcon
} from "lucide-react";

import toast from "react-hot-toast";

import {
  useEffect,
  useState
} from "react";


import {
  motion
} from "framer-motion";




export default function Accessories(){


const emptyForm={

name:"",

category:"",

description:"",

price:"",

image:"",

status:"Active"

};




const [items,setItems]=useState([]);

const [form,setForm]=useState(emptyForm);

const [showModal,setShowModal]=useState(false);

const [editId,setEditId]=useState(null);






// LOAD PRODUCTS


useEffect(()=>{


const data=JSON.parse(

localStorage.getItem("academyAccessories")

||

"[]"

);


setItems(data);



},[]);







const saveItems=(data)=>{


setItems(data);


localStorage.setItem(

"academyAccessories",

JSON.stringify(data)

);


};









// INPUT CHANGE


const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};









// IMAGE UPLOAD


const handleImage=(e)=>{


const file=e.target.files[0];


if(!file)
return;



if(file.size > 500000){

toast.error(
"Image size should be less than 500KB"
);

return;

}



const reader=new FileReader();



reader.onloadend=()=>{


setForm({

...form,

image:reader.result

});


toast.success(
"Image uploaded successfully 🖼️"
);



};



reader.readAsDataURL(file);


};







// ADD / UPDATE

const saveAccessory = () => {


if(
!form.name ||
!form.price ||
!form.image
){

toast.error(
"Please fill product name, price and image"
);

return;

}



if(editId){


const updated = items.map(item =>

item.id === editId

?

{
...item,
...form
}

:

item

);


saveItems(updated);



toast.success(
"Product updated successfully ✨"
);



}

else{


const newItem={

id:Date.now(),

...form,

createdAt:new Date().toLocaleDateString()

};



saveItems([

...items,

newItem

]);



toast.success(
"Product added successfully 🎉"
);



}





setForm(emptyForm);

setEditId(null);

setShowModal(false);



};









// EDIT


const editItem=(item)=>{


setForm(item);

setEditId(item.id);

setShowModal(true);


};









// DELETE


const deleteItem = (id)=>{


const updated = items.filter(

item=>item.id!==id

);


saveItems(updated);



toast.success(
"Product deleted successfully 🗑️"
);



};








return(


<div

className="
min-h-screen
bg-[#07131f]
text-white
p-4
sm:p-8
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

Manage Accessories

</h1>


<p

className="
text-slate-400
mt-2
"

>

Products added here will appear on public portal.

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
items-center
gap-2
"

>


<Plus size={20}/>

Add Product


</button>




</div>









{/* PRODUCTS */}



<div

className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-3
gap-4
sm:gap-6
mt-6
"
>



{

items.length===0 &&


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

No accessories added.

</div>


}







{

items.map(item=>(


<motion.div


key={item.id}


whileHover={{
y:-5
}}


className="
bg-[#102235]
border
border-slate-700
rounded-2xl
overflow-hidden
"
>



<img

src={item.image}

alt={item.name}

className="
w-full
h-36
sm:h-48
object-cover
"

/>






<div

className="
p-3
sm:p-5
"

>


<h2

className="
text-lg
sm:text-xl
font-black
"
>

{item.name}

</h2>



<p

className="
text-sm
sm:text-base
text-teal-400
mt-1
font-semibold
"
>

{item.category}

</p>




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
mt-3
text-lg
font-bold
"
>

₹{item.price}

</p>







<div

className="
flex
gap-2
mt-4
"
>


<button

onClick={()=>editItem(item)}

className="
flex-1
border
border-slate-600
rounded-lg
py-2
flex
justify-center
items-center
"

>

<Pencil size={18}/>

</button>





<button

onClick={()=>deleteItem(item.id)}

className="
flex-1
bg-red-500/20
text-red-400
rounded-lg
flex
justify-center
items-center
py-2
"

>


<Trash2 size={18}/>

</button>



</div>



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


<div

className="
bg-[#102235]
rounded-3xl
border
border-slate-700
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

{
editId
?
"Edit Product"
:
"Add Product"
}

</h2>



<button

onClick={()=>setShowModal(false)}

>

<X/>

</button>


</div>









<input

name="name"

placeholder="Product Name"

value={form.name}

onChange={handleChange}

className="
input-style
"

/>





<input

name="category"

placeholder="Category"

value={form.category}

onChange={handleChange}

className="
input-style
"

/>





<input

name="price"

placeholder="Price"

value={form.price}

onChange={handleChange}

className="
input-style
"

/>






<textarea

name="description"

placeholder="Description"

value={form.description}

onChange={handleChange}

className="
input-style
"
/>








<label

className="
mt-4
block
border
border-dashed
border-slate-600
rounded-xl
p-5
text-center
cursor-pointer
"

>


<ImageIcon
className="mx-auto text-teal-400"
/>


<p className="text-slate-400 mt-2">

Upload Product Image

</p>



<input

type="file"

accept="image/*"

onChange={handleImage}

className="hidden"

/>



</label>








{

form.image &&

<img

src={form.image}

className="
mt-4
w-full
h-40
object-cover
rounded-xl
"

/>

}







<button

onClick={saveAccessory}

className="
mt-5
w-full
bg-teal-500
hover:bg-teal-600
transition
py-3
rounded-xl
font-bold
"

>

{

editId

?

"Update Product"

:

"Save Product"

}


</button>



</div>


</div>


}



</div>


);


}