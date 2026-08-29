import {
useEffect,
useState
} from "react";


export default function Contact(){


const [contact,setContact]=useState({

phone:"",
email:"",
address:""

});



useEffect(()=>{


const data=JSON.parse(

localStorage.getItem("academyContact")

||

"{}"

);


setContact({

phone:data.phone || "",
email:data.email || "",
address:data.address || ""

});


},[]);




const saveContact=()=>{


localStorage.setItem(

"academyContact",

JSON.stringify(contact)

);


alert("Contact updated");

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


<h1 className="
text-4xl
font-black
">

Manage Contact

</h1>




<div className="
mt-8
bg-[#102235]
rounded-3xl
p-6
space-y-4
">


<input

placeholder="Phone"

value={contact.phone}

onChange={(e)=>
setContact({
...contact,
phone:e.target.value
})
}

className="
w-full
bg-[#07131f]
border
border-slate-700
rounded-xl
p-3
"

/>



<input

placeholder="Email"

value={contact.email}

onChange={(e)=>
setContact({
...contact,
email:e.target.value
})
}

className="
w-full
bg-[#07131f]
border
border-slate-700
rounded-xl
p-3
"

/>




<textarea

placeholder="Address"

value={contact.address}

onChange={(e)=>
setContact({
...contact,
address:e.target.value
})
}

className="
w-full
bg-[#07131f]
border
border-slate-700
rounded-xl
p-3
"

/>



<button

onClick={saveContact}

className="
bg-teal-500
px-6
py-3
rounded-xl
font-bold
"

>

Save Contact

</button>


</div>


</div>

);


}