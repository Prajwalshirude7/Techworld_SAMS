import {
  Phone,
  Mail,
  MapPin,
  Save
} from "lucide-react";


import {
  useEffect,
  useState
} from "react";



export default function Contact(){


const defaultContact={

phone:[
"8830806221",
"7218158989",
"7666345539"
],

email:
"rushikeshtarde95@gmail.com",

branches:[
"Rahuri",
"Rahata",
"Shirdi",
"Ahmednagar"
],

description:
"Start your skating journey with Rushikesh Tarde Skates Arena."

};




const [contact,setContact]=useState(
defaultContact
);





useEffect(()=>{


const saved = JSON.parse(

localStorage.getItem("academyContact")

);


if(saved){

setContact(saved);

}


},[]);







const saveContact=()=>{


localStorage.setItem(

"academyContact",

JSON.stringify(contact)

);


alert(
"Contact details updated successfully"
);


};







return(


<div

className="
min-h-screen
bg-[#07131f]
text-white
p-5
sm:p-10
"

>


<h1

className="
text-3xl
sm:text-5xl
font-black
"

>

Manage Contact

</h1>



<p

className="
text-slate-400
mt-2
"

>

Update academy contact information displayed on website.

</p>






<div

className="
mt-8
bg-[#102235]
border
border-slate-700
rounded-3xl
p-6
space-y-6
"

>




{/* PHONE */}


<div>


<label className="
text-slate-400
"

>

Phone Numbers

</label>



<textarea

value={
contact.phone.join("\n")
}

onChange={(e)=>

setContact({

...contact,

phone:
e.target.value.split("\n")

})

}


className="
mt-2
w-full
bg-[#07131f]
border
border-slate-700
rounded-xl
p-3
outline-none
"

rows="3"

/>


</div>








{/* EMAIL */}


<div>


<label className="
text-slate-400
"

>

Email

</label>


<input

value={contact.email}


onChange={(e)=>

setContact({

...contact,

email:e.target.value

})

}


className="
mt-2
w-full
bg-[#07131f]
border
border-slate-700
rounded-xl
p-3
outline-none
"

/>



</div>









{/* BRANCHES */}


<div>


<label

className="
text-slate-400
"

>

Branches

</label>



<textarea


value={
contact.branches.join("\n")
}



onChange={(e)=>

setContact({

...contact,

branches:
e.target.value.split("\n")

})

}



className="
mt-2
w-full
bg-[#07131f]
border
border-slate-700
rounded-xl
p-3
outline-none
"

rows="4"

/>



</div>








{/* DESCRIPTION */}


<div>


<label

className="
text-slate-400
"

>

Contact Description

</label>



<textarea


value={
contact.description
}



onChange={(e)=>

setContact({

...contact,

description:e.target.value

})

}



className="
mt-2
w-full
bg-[#07131f]
border
border-slate-700
rounded-xl
p-3
outline-none
"

rows="3"

/>



</div>







<button


onClick={saveContact}


className="
bg-teal-500
hover:bg-teal-600
px-6
py-3
rounded-xl
font-bold
flex
items-center
gap-2
"

>


<Save size={20}/>


Save Contact


</button>




</div>



</div>


);


}