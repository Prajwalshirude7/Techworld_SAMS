export default function SkatingInfo({

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

Skating Information

</h2>







{/* Experience */}


<div>


<label

className="
text-slate-300
"

>

Previous Experience

</label>




<select


value={formData.experience || ""}


onChange={(e)=>

updateData({

experience:e.target.value

})

}


className="
w-full
mt-2
bg-[#07131f]
border
border-slate-700
rounded-xl
px-5
py-4
text-white
outline-none
focus:border-teal-500
"

>


<option value="">

Select Experience

</option>



<option value="No Experience">

No Experience

</option>



<option value="Beginner">

Beginner

</option>



<option value="Intermediate">

Intermediate

</option>



<option value="Professional">

Professional

</option>



</select>


</div>









{/* Program */}


<div>


<label

className="
text-slate-300
"

>

Select Program

</label>




<select


value={formData.program || ""}


onChange={(e)=>

updateData({

program:e.target.value

})

}


className="
w-full
mt-2
bg-[#07131f]
border
border-slate-700
rounded-xl
px-5
py-4
text-white
outline-none
focus:border-teal-500
"


>



<option value="">

Select Program

</option>



<option value="Basic Skating">

Basic Skating

</option>



<option value="Advanced Skating">

Advanced Skating

</option>



<option value="Speed Skating">

Speed Skating

</option>



<option value="Competition Training">

Competition Training

</option>



</select>


</div>







</div>


)

}