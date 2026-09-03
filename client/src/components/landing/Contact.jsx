import {
Phone,
Mail,
MapPin
} from "lucide-react";


import {
motion
} from "framer-motion";


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


const saved =
JSON.parse(

localStorage.getItem(
"academyContact"
)

);



if(saved){

setContact(saved);

}



},[]);







return(


<section

id="contact"

className="
bg-[#07131f]
text-white
py-20
px-5
sm:px-8
"

>


<div

className="
max-w-5xl
mx-auto
text-center
"

>



<h2

className="
text-3xl
sm:text-5xl
font-black
"

>

Contact

<span className="
text-teal-400
">

 RTSA

</span>

</h2>






<p

className="
text-slate-400
mt-4
"

>

{contact.description}

</p>









<motion.div


initial={{
opacity:0,
y:30
}}


whileInView={{
opacity:1,
y:0
}}



className="
mt-10
bg-[#102235]
border
border-slate-700
rounded-3xl
p-6
sm:p-10
"



>






<h3

className="
text-2xl
sm:text-3xl
font-black
"

>

Rushikesh Tarde Skates Arena

</h3>









<div

className="
grid
grid-cols-1
md:grid-cols-3
gap-8
mt-8
"

>







{/* PHONE */}


<div>


<div

className="
bg-teal-500/20
w-fit
mx-auto
p-4
rounded-2xl
"

>

<Phone
className="
text-teal-400
"
/>


</div>



<h4 className="
mt-4
text-slate-400
">

Call Us

</h4>



<p className="
font-bold
mt-2
"

>

{

contact.phone.map((item,index)=>(

<span key={index}>

{item}
<br/>

</span>

))

}

</p>


</div>










{/* EMAIL */}


<div>


<div

className="
bg-teal-500/20
w-fit
mx-auto
p-4
rounded-2xl
"

>

<Mail
className="
text-teal-400
"
/>


</div>




<h4 className="
mt-4
text-slate-400
">

Email

</h4>



<p

className="
font-bold
mt-2
break-all
"

>

{contact.email}

</p>



</div>










{/* BRANCHES */}



<div>


<div

className="
bg-teal-500/20
w-fit
mx-auto
p-4
rounded-2xl
"

>

<MapPin

className="
text-teal-400
"

/>

</div>



<h4

className="
mt-4
text-slate-400
"

>

Branches

</h4>



<p className="
font-bold
mt-2
"

>

{

contact.branches.map((item,index)=>(

<span key={index}>

{item}
<br/>

</span>

))

}

</p>



</div>








</div>







</motion.div>




</div>


</section>


);


}