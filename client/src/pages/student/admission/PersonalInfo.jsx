export default function PersonalInfo({

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

Personal Information

</h2>







<div>

<label className="text-slate-300">
Full Name
</label>


<input

type="text"

value={formData.name || ""}

onChange={(e)=>

updateData({

name:e.target.value

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

/>

</div>








<div>

<label className="text-slate-300">
Email
</label>


<input

type="email"

value={formData.email || ""}

onChange={(e)=>

updateData({

email:e.target.value

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

/>

</div>







<div>

<label className="text-slate-300">
Phone Number
</label>


<input

type="tel"

value={formData.phone || ""}

onChange={(e)=>

updateData({

phone:e.target.value

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

/>

</div>








<div>

<label className="text-slate-300">
Date of Birth
</label>


<input

type="date"

value={formData.dob || ""}

onChange={(e)=>

updateData({

dob:e.target.value

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

/>


</div>








<div>

<label className="text-slate-300">
Gender
</label>


<select

value={formData.gender || ""}

onChange={(e)=>

updateData({

gender:e.target.value

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
Select Gender
</option>


<option value="Male">
Male
</option>


<option value="Female">
Female
</option>


<option value="Other">
Other
</option>


</select>


</div>








<div>

<label className="text-slate-300">
Emergency Contact
</label>


<input

type="tel"

value={formData.emergency || ""}

onChange={(e)=>

updateData({

emergency:e.target.value

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

/>


</div>



</div>

)

}