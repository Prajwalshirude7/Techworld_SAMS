export default function TermsConditions({

formData={},

updateData

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

Terms & Conditions

</h2>









<div


className="
bg-[#07131f]
border
border-slate-700
rounded-3xl
p-5
sm:p-8
max-h-[550px]
overflow-y-auto
space-y-8
"


>









{/* Skater Responsibilities */}


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

Skater Responsibilities

</h3>



<p className="text-slate-300 mb-3">

✓ Proper skating attire should be worn during practice.

</p>


<p className="text-slate-300 mb-3">

✓ Helmet is compulsory during skating sessions.

</p>


<p className="text-slate-300 mb-3">

✓ Warm-up and stretching must be completed.

</p>


<p className="text-slate-300 mb-3">

✓ Students should maintain discipline during training.

</p>



<p className="text-slate-300">

✓ Students should follow instructions given by coaches.

</p>



</div>









{/* Parent Responsibilities */}



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

Parent Responsibilities

</h3>




<p className="text-slate-300 mb-3">

✓ Parents should ensure students reach on time.

</p>



<p className="text-slate-300 mb-3">

✓ Parents should cooperate with coaches.

</p>



<p className="text-slate-300">

✓ Parents should avoid disturbing training sessions.

</p>


</div>









{/* Safety Guidelines */}



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

Safety Guidelines

</h3>




<p className="text-slate-300 mb-3">

✓ Safety instructions provided by coaches must be followed.

</p>



<p className="text-slate-300">

✓ Academy rules must be followed during all training sessions.

</p>



</div>









{/* Payment Policy */}



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

Payment Policy

</h3>




<p className="text-slate-300">

Fees once paid cannot be adjusted or refunded after discontinuation of coaching.

</p>



</div>









{/* Undertaking */}



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

Undertaking

</h3>




<p className="text-slate-300 leading-relaxed">

I/We agree that the information provided is correct and accept academy rules, safety guidelines and payment policies.

</p>



</div>







</div>










{/* Checkbox */}



<div

className="
flex
items-start
gap-3
px-2
"

>


<input


type="checkbox"


checked={formData.termsAccepted || false}


onChange={(e)=>


updateData({

termsAccepted:e.target.checked

})


}


className="
w-5
h-5
mt-1
accent-teal-500
cursor-pointer
"


/>





<label

className="
text-white
text-sm
sm:text-base
cursor-pointer
"

>

I agree to all Terms & Conditions

</label>





</div>








</div>


)


}