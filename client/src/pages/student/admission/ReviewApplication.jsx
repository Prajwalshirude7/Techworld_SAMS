import {
User,
MapPin,
Trophy,
FileText,
Phone,
Mail,
CheckCircle
} from "lucide-react";





export default function ReviewApplication({

formData={}

}){





return(


<div

className="
space-y-6
"

>





<h2

className="
text-2xl
sm:text-3xl
font-black
text-white
"

>

Review Application

</h2>





<p

className="
text-slate-400
"

>

Please verify your details before submitting admission.

</p>









<div

className="
grid
grid-cols-1
lg:grid-cols-2
gap-6
"

>








{/* PERSONAL DETAILS */}



<Card

title="Personal Information"

icon={<User/>}

>


<Info

label="Name"

value={formData.name}

/>


<Info

label="Email"

value={formData.email}

/>


<Info

label="Phone"

value={formData.phone}

/>


<Info

label="DOB"

value={formData.dob}

/>


<Info

label="Gender"

value={formData.gender}

/>



</Card>









{/* ADDRESS */}



<Card

title="Address Details"

icon={<MapPin/>}

>


<Info

label="Address"

value={formData.address}

/>


<Info

label="City"

value={formData.city}

/>


<Info

label="State"

value={formData.state}

/>


<Info

label="Pincode"

value={formData.pincode}

/>



</Card>









{/* SKATING DETAILS */}



<Card

title="Training Details"

icon={<Trophy/>}

>


<Info

label="Program"

value={formData.program}

/>



<Info

label="Branch"

value={formData.branch}

/>



<Info

label="Experience"

value={formData.experience}

/>



{

formData.programFees &&


<Info

label="Program Fees"

value={`₹${formData.programFees}`}

/>



}



</Card>









{/* DOCUMENT */}



<Card

title="Documents"

icon={<FileText/>}

>


<Info

label="Uploaded File"

value={

typeof formData.document==="object"

?

formData.document?.name

:

formData.document

}

/>


</Card>









</div>









{/* CONFIRM BOX */}



<div

className="
bg-teal-500/10
border
border-teal-500/30
rounded-2xl
p-5
flex
gap-4
items-center
"

>


<CheckCircle

className="
text-teal-400
shrink-0
"

/>


<p

className="
text-slate-300
"

>

Please confirm that all information provided above is correct before continuing to payment.

</p>



</div>









</div>


);



}









function Card({

title,

icon,

children

}){


return(


<div

className="
bg-[#07131f]
border
border-slate-700
rounded-3xl
p-5
sm:p-6
"

>


<div

className="
flex
items-center
gap-3
mb-5
"

>


<div

className="
bg-teal-500/20
p-3
rounded-xl
"

>


{

icon

}


</div>



<h3

className="
text-xl
font-bold
text-white
"

>

{title}

</h3>


</div>




<div

className="
space-y-3
"

>

{children}

</div>



</div>


);


}









function Info({

label,

value

}){


return(


<div

className="
flex
flex-col
sm:flex-row
sm:justify-between
gap-1
border-b
border-slate-800
pb-3
"

>


<span

className="
text-slate-400
"

>

{label}

</span>



<span

className="
text-white
font-semibold
break-all
"

>

{value || "N/A"}

</span>



</div>


);


}