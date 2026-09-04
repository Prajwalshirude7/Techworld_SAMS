import {
Plus,
Trash2,
X,
Upload,
Quote
} from "lucide-react";


import {
motion
} from "framer-motion";


import {
useEffect,
useState
} from "react";


import toast from "react-hot-toast";





export default function Gallery(){



const emptyForm={

title:"",

category:"",

image:"",

description:"",

quote:""

};





const [gallery,setGallery]=useState([]);

const [showModal,setShowModal]=useState(false);

const [form,setForm]=useState(emptyForm);

const [preview,setPreview]=useState("");









// LOAD GALLERY


useEffect(()=>{


const data=JSON.parse(

localStorage.getItem("academyGallery")

||

"[]"

);



setGallery(data);



},[]);









const saveGallery=(data)=>{


setGallery(data);


localStorage.setItem(

"academyGallery",

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


const handleImageUpload=(e)=>{


const file=e.target.files[0];



if(file){


const imageURL=
URL.createObjectURL(file);



setPreview(imageURL);





const reader=new FileReader();



reader.onloadend=()=>{


setForm({

...form,

image:reader.result

});


};



reader.readAsDataURL(file);



}



};









// ADD IMAGE


const addImage=()=>{


if(

!form.title ||

!form.image

){


toast.error(
"Please upload image and add title"
);


return;


}





const newImage={


id:Date.now(),


...form,


createdAt:

new Date()

.toLocaleDateString()


};







saveGallery([

...gallery,

newImage

]);






setForm(emptyForm);

setPreview("");

setShowModal(false);



toast.success(
"Gallery image added"
);



};









// DELETE IMAGE


const deleteImage=(id)=>{


const updated=

gallery.filter(

item=>

item.id!==id

);





saveGallery(updated);



toast.success(
"Image deleted"
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

Gallery Management

</h1>



<p

className="
text-slate-400
mt-2
"

>

Manage academy achievements, memories and success stories.

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


Add Image


</button>



</div>









{/* GALLERY GRID */}



<div

className="
mt-8
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-3
gap-6
"

>





{

gallery.length===0 &&


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


No images uploaded yet.


</div>


}









{

gallery.map((item,index)=>(



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



className="
bg-[#102235]
border
border-slate-700
rounded-3xl
overflow-hidden
"

>



<img

src={item.image}

alt={item.title}

className="
w-full
h-56
object-cover
"

/>








<div

className="
p-5
"

>



<h2

className="
text-xl
font-bold
"

>

{item.title}

</h2>





<p

className="
text-teal-400
mt-2
"

>

{item.category}

</p>







<p

className="
text-slate-300
mt-4
text-sm
"

>

{item.description}

</p>









{

item.quote &&


<div

className="
mt-4
bg-[#07131f]
rounded-xl
p-4
"

>


<div className="
flex
gap-2
items-center
text-teal-400
"

>

<Quote size={18}/>

Success Quote

</div>



<p

className="
text-slate-300
italic
mt-2
text-sm
"

>

"{item.quote}"

</p>



</div>


}










<button


onClick={()=>deleteImage(item.id)}


className="
mt-5
w-full
bg-red-500/20
text-red-400
py-3
rounded-xl
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









{/* ADD MODAL */}



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
overflow-y-auto
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
my-10
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

Add Gallery Image

</h2>



<button

onClick={()=>setShowModal(false)}

>

<X/>

</button>



</div>









{/* IMAGE UPLOAD */}



<label

className="
mt-5
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


<input

type="file"

accept="image/*"

hidden

onChange={handleImageUpload}

/>



{

preview ?

<img

src={preview}

className="
h-48
w-full
object-cover
rounded-xl
"

/>


:

<div

className="
text-slate-400
"

>

<Upload

className="
mx-auto
mb-2
"

/>

Upload Academy Image

</div>


}



</label>









{

[

["title","Image Title"],

["category","Category"],

["description","Success Story"],

["quote","Academy Success Quote"]


].map(([key,label])=>(



<textarea


key={key}


name={key}


placeholder={label}


value={form[key]}


onChange={handleChange}


rows={

key==="description" ||
key==="quote"

?

3

:

1

}


className="
w-full
mt-4
bg-[#07131f]
border
border-slate-700
rounded-xl
p-3
outline-none
text-white
"


/>



))


}









<button


onClick={addImage}


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


Save Image


</button>







</div>


</div>



}




</div>


);


}