export default function ReviewApplication({

formData={}

}){


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

Review Application

</h2>








<div


className="
bg-[#07131f]
border
border-slate-700
rounded-3xl
p-5
sm:p-8
space-y-8
"


>







{/* Personal Details */}



<div>


<h3

className="
text-xl
sm:text-2xl
font-bold
text-teal-400
mb-4
"

>

Personal Information

</h3>



<div className="space-y-3">


<p className="text-slate-300">

<span className="text-white font-semibold">
Name:
</span>

{" "}
{formData.name}

</p>




<p className="text-slate-300">

<span className="text-white font-semibold">
Email:
</span>

{" "}
{formData.email}

</p>





<p className="text-slate-300">

<span className="text-white font-semibold">
Phone:
</span>

{" "}
{formData.phone}

</p>





<p className="text-slate-300">

<span className="text-white font-semibold">
DOB:
</span>

{" "}
{formData.dob}

</p>





<p className="text-slate-300">

<span className="text-white font-semibold">
Gender:
</span>

{" "}
{formData.gender}

</p>


</div>


</div>








<hr className="border-slate-700"/>








{/* Address */}



<div>


<h3

className="
text-xl
sm:text-2xl
font-bold
text-teal-400
mb-4
"

>

Address Details

</h3>




<p className="text-slate-300">

{formData.address}

</p>



<p className="text-slate-300 mt-2">

{formData.city},

{" "}

{formData.state}

-

{" "}

{formData.pincode}

</p>



</div>









<hr className="border-slate-700"/>








{/* Skating */}



<div>


<h3

className="
text-xl
sm:text-2xl
font-bold
text-teal-400
mb-4
"

>

Skating Details

</h3>



<p className="text-slate-300">

<span className="text-white font-semibold">

Experience:

</span>

{" "}
{formData.experience}

</p>




<p className="text-slate-300 mt-3">

<span className="text-white font-semibold">

Program:

</span>

{" "}
{formData.program}

</p>



</div>









<hr className="border-slate-700"/>








{/* Documents */}



<div>


<h3

className="
text-xl
sm:text-2xl
font-bold
text-teal-400
mb-4
"

>

Documents

</h3>




<p className="text-slate-300">

{

formData.document

?

"✓ Document Uploaded"

:

"Not Uploaded"

}


</p>



</div>









<hr className="border-slate-700"/>








{/* Terms */}



<div>


<h3

className="
text-xl
sm:text-2xl
font-bold
text-teal-400
mb-4
"

>

Terms Agreement

</h3>




<p className="text-slate-300">

{

formData.termsAccepted

?

"✓ Accepted"

:

"Not Accepted"

}


</p>



</div>







</div>





</div>


)

}