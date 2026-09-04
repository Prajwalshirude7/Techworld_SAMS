import {
  useEffect,
  useState
} from "react";



export default function SkatingInfo({

  formData = {},

  updateData

}) {



const [programs,setPrograms] = useState([]);

const [branches,setBranches] = useState([]);




// LOAD SUPER ADMIN DATA DYNAMICALLY

useEffect(()=>{


const loadData = ()=>{


const savedPrograms = JSON.parse(

localStorage.getItem("academyPrograms")

||

"[]"

);



const savedBranches = JSON.parse(

localStorage.getItem("academyBranches")

||

"[]"

);





setPrograms(

savedPrograms.filter(

item => item.status === "Active"

)

);





setBranches(

savedBranches.filter(

item => item.status === "Active"

)

);



};



// initial load

loadData();



// update whenever super admin changes data

window.addEventListener(

"storage",

loadData

);



return()=>{


window.removeEventListener(

"storage",

loadData

);


};



},[]);









return(


<div

className="
space-y-8
"

>



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









{/* EXPERIENCE */}


<div>


<label

className="
text-slate-300
font-medium
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
px-4
sm:px-5
py-3
sm:py-4
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









{/* PROGRAM */}


<div>


<label

className="
text-slate-300
font-medium
"

>

Select Program

</label>






<select


value={formData.program || ""}


onChange={(e)=>{


const selectedProgram = programs.find(

item => item.name === e.target.value

);



updateData({

program:selectedProgram?.name || "",

programFees:selectedProgram?.fees || ""

});


}}



className="
w-full
mt-2
bg-[#07131f]
border
border-slate-700
rounded-xl
px-4
sm:px-5
py-3
sm:py-4
text-white
outline-none
focus:border-teal-500
"

>



<option value="">

Select Program

</option>





{

programs.length===0 &&


<option

disabled

>

No programs available

</option>


}




{

programs.map(program=>(


<option

key={program.id}

value={program.name}

>

{program.name} - ₹{program.fees}

</option>


))


}



</select>


</div>









{/* BRANCH SELECTION */}



<div>


<label

className="
text-slate-300
font-medium
"

>

Select Branch

</label>







<select


value={formData.branch || ""}



onChange={(e)=>

updateData({

branch:e.target.value

})

}



className="
w-full
mt-2
bg-[#07131f]
border
border-slate-700
rounded-xl
px-4
sm:px-5
py-3
sm:py-4
text-white
outline-none
focus:border-teal-500
"

>




<option value="">

Choose Branch

</option>







{

branches.length===0 &&

<option

disabled

>

No active branches available

</option>


}






{

branches.map(branch=>(


<option


key={branch.id}


value={branch.branchName}


>

{branch.branchName}

{branch.location &&

` - ${branch.location}`

}


</option>


))


}



</select>






{

branches.length===0 &&


<p

className="
text-yellow-400
text-sm
mt-2
"

>

No branches available. Please contact academy.

</p>


}



</div>







</div>


);


}