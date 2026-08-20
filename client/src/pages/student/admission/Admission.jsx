import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import PersonalInfo from "./PersonalInfo";
import AddressInfo from "./AddressInfo";
import SkatingInfo from "./SkatingInfo";
import Documents from "./Documents";
import TermsConditions from "./TermsConditions";
import ReviewApplication from "./ReviewApplication";
import Payment from "./Payment";


export default function Admission() {


const steps = [
"Personal",
"Address",
"Skating",
"Documents",
"Terms",
"Review",
"Payment"
];



const [currentStep,setCurrentStep] = useState(0);



const [formData,setFormData] = useState({

name:
localStorage.getItem("studentName") || "",

email:
localStorage.getItem("studentEmail") || "",

phone:
localStorage.getItem("studentPhone") || "",

dob:"",
gender:"",
emergency:"",

address:"",
city:"",
state:"",
pincode:"",

experience:"",
program:"",

document:null,

termsAccepted:false,

paymentMethod:""

});




// update data

const updateData=(data)=>{

setFormData(prev=>({

...prev,
...data

}));

};





// validation

const validateStep=()=>{


switch(currentStep){


case 0:

if(
!formData.name ||
!formData.email ||
!formData.phone ||
!formData.dob ||
!formData.gender ||
!formData.emergency
){

toast.error(
"Please complete personal information"
);

return false;

}

break;



case 1:

if(
!formData.address ||
!formData.city ||
!formData.state ||
!formData.pincode
){

toast.error(
"Please complete address information"
);

return false;

}

break;




case 2:

if(
!formData.experience ||
!formData.program
){

toast.error(
"Please select skating details"
);

return false;

}

break;




case 3:

if(!formData.document){

toast.error(
"Please upload document"
);

return false;

}

break;



case 4:

if(!formData.termsAccepted){

toast.error(
"Please accept Terms & Conditions"
);

return false;

}

break;



default:

return true;


}


return true;


};





const nextPage=()=>{


if(!validateStep())
return;



if(currentStep < steps.length-1){

setCurrentStep(prev=>prev+1);

}


};





const previousPage=()=>{


if(currentStep>0){

setCurrentStep(prev=>prev-1);

}


};






const renderStep=()=>{


switch(currentStep){


case 0:

return (

<PersonalInfo

formData={formData}

updateData={updateData}

/>

);



case 1:

return (

<AddressInfo

formData={formData}

updateData={updateData}

/>

);



case 2:

return (

<SkatingInfo

formData={formData}

updateData={updateData}

/>

);



case 3:

return (

<Documents

formData={formData}

updateData={updateData}

/>

);



case 4:

return (

<TermsConditions

formData={formData}

updateData={updateData}

/>

);



case 5:

return (

<ReviewApplication

formData={formData}

/>

);



case 6:

return (

<Payment

formData={formData}

updateData={updateData}

/>

);



default:

return null;


}


};






return (


<motion.div

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

className="
min-h-screen
bg-[#07131f]
px-3
sm:px-6
py-6
"

>


<div

className="
max-w-6xl
mx-auto
bg-[#102235]
border
border-slate-700
rounded-3xl
p-4
sm:p-6
lg:p-10
"

>


<h1

className="
text-3xl
sm:text-5xl
font-bold
text-white
mb-10
"

>

Apply For Admission

</h1>





{/* STEPPER */}


<div

className="
overflow-x-auto
pb-6
"

>


<div

className="
flex
gap-7
min-w-max
"

>


{

steps.map((step,index)=>(


<div

key={step}

className="
w-24
flex
flex-col
items-center
"

>


<div

className={`
w-12
h-12
rounded-full
flex
items-center
justify-center
font-bold

${
index<=currentStep

?

"bg-teal-500 text-white"

:

"bg-[#1B2D44] text-slate-300"

}

`}

>

{index+1}

</div>




<p

className="
text-xs
sm:text-sm
text-slate-300
mt-3
text-center
"

>

{step}

</p>



</div>


))

}


</div>


</div>





{/* FORM CONTENT */}


<div className="mt-10">

{renderStep()}

</div>







{/* BUTTONS */}



<div

className="
flex
flex-col-reverse
sm:flex-row
justify-between
gap-4
mt-10
"

>


<button

onClick={previousPage}

disabled={currentStep===0}

className="
w-full
sm:w-auto
px-8
py-3
rounded-xl
bg-[#1B2D44]
text-white
disabled:opacity-40
"

>

Back

</button>







{

currentStep < 6 &&

<button

onClick={nextPage}

className="
w-full
sm:w-auto
px-10
py-3
rounded-xl
bg-teal-500
text-white
font-bold
hover:bg-teal-600
"

>

Next

</button>


}



</div>




</div>


</motion.div>


);


}