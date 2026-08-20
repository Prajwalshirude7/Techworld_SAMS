export default function Documents({

formData={},

updateData

}) {



const handleFileChange=(e)=>{


const file=e.target.files[0];


if(file){

updateData({

document:file

});

}


};





return(


<div className="space-y-6">





<h2

className="
text-2xl
sm:text-3xl
font-bold
text-white
"

>

Upload Documents

</h2>







<div

className="
bg-[#07131f]
border
border-slate-700
rounded-3xl
p-5
sm:p-8
"

>





<label

className="
text-slate-300
block
mb-4
"

>

Upload Identity Proof

</label>






<input


type="file"


accept=".jpg,.jpeg,.png,.pdf"


onChange={handleFileChange}



className="
w-full
text-white
file:bg-teal-500
file:text-white
file:border-0
file:px-5
file:py-3
file:rounded-xl
file:mr-4
cursor-pointer
"




/>







{

formData.document &&


<p

className="
mt-5
text-teal-400
break-all
"

>

✓ Selected:

{" "}

{formData.document.name}


</p>


}







</div>





</div>


)

}