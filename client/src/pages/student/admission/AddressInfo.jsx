export default function AddressInfo({

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

Address Information

</h2>







{/* Address */}


<div>


<label

className="
text-slate-300
"

>

Complete Address

</label>



<textarea


value={formData.address || ""}


onChange={(e)=>

updateData({

address:e.target.value

})

}


rows="4"


placeholder="Enter your complete address"


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
placeholder:text-slate-500
outline-none
focus:border-teal-500
resize-none
"


/>


</div>









{/* City */}


<div>


<label

className="
text-slate-300
"

>

City

</label>



<input


type="text"


value={formData.city || ""}


onChange={(e)=>

updateData({

city:e.target.value

})

}


placeholder="Enter city"


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
placeholder:text-slate-500
outline-none
focus:border-teal-500
"


/>


</div>









{/* State */}


<div>


<label

className="
text-slate-300
"

>

State

</label>



<input


type="text"


value={formData.state || ""}


onChange={(e)=>

updateData({

state:e.target.value

})

}


placeholder="Enter state"


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
placeholder:text-slate-500
outline-none
focus:border-teal-500
"


/>


</div>









{/* Pincode */}


<div>


<label

className="
text-slate-300
"

>

Pincode

</label>



<input


type="number"


value={formData.pincode || ""}


onChange={(e)=>

updateData({

pincode:e.target.value

})

}


placeholder="Enter pincode"


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
placeholder:text-slate-500
outline-none
focus:border-teal-500
"


/>


</div>





</div>


)

}