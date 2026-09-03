import { Upload } from "lucide-react";


export default function Documents({
formData,
updateData
}){


const handleFileChange=(e)=>{

const file=e.target.files[0];


if(file){

updateData({

document:{
name:file.name,
type:file.type,
size:file.size
}

});


}

};



return(

<div className="space-y-6">


<h2 className="
text-2xl
font-bold
text-white
">
Upload Documents
</h2>



<div className="
bg-[#07131f]
border
border-slate-700
rounded-xl
p-5
">


<label className="
text-slate-300
block
mb-3
">

Upload Identity Document

</label>


<input

type="file"

onChange={handleFileChange}

className="
w-full
text-white
"

 />



{
formData.document &&

<p className="
mt-3
text-teal-400
">

Selected:

{formData.document.name}

</p>

}



</div>



</div>

);


}