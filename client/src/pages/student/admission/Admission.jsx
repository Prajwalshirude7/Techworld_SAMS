import {
useState,
useEffect
} from "react";


import {
motion
} from "framer-motion";


import toast from "react-hot-toast";


import {
useNavigate
} from "react-router-dom";



import PersonalInfo from "./PersonalInfo";
import AddressInfo from "./AddressInfo";
import SkatingInfo from "./SkatingInfo";
import Documents from "./Documents";
import TermsConditions from "./TermsConditions";
import ReviewApplication from "./ReviewApplication";
import Payment from "./Payment";







export default function Admission(){



const navigate = useNavigate();





const steps=[

"Personal",
"Address",
"Skating",
"Documents",
"Terms",
"Review",
"Payment"

];







const [currentStep,setCurrentStep]=useState(0);



const [programs,setPrograms]=useState([]);

const [branches,setBranches]=useState([]);








// LOAD SUPER ADMIN DATA


useEffect(()=>{


const savedPrograms = JSON.parse(

localStorage.getItem("academyPrograms")

||

"[]"

);



setPrograms(

savedPrograms.filter(

item=>

item.status==="Active"

)

);






const savedBranches = JSON.parse(

localStorage.getItem("academyBranches")

||

"[]"

);



setBranches(

savedBranches.filter(

item=>

item.status==="Active"

)

);




},[]);









const [formData,setFormData]=useState({



name:

localStorage.getItem("studentName")

|| "",




email:

localStorage.getItem("studentEmail")

|| "",




phone:

localStorage.getItem("studentPhone")

|| "",






dob:"",

gender:"",

emergency:"",






address:"",

city:"",

state:"",

pincode:"",






experience:"",





program:"",




programFees:"",





// IMPORTANT

// Branch selected during registration

branch:

localStorage.getItem("studentBranch")

|| "",






document:null,





termsAccepted:false,





paymentMethod:"",





paymentStatus:"",




});











// UPDATE FORM DATA


const updateData=(data)=>{


setFormData(prev=>({

...prev,

...data


}));


};











// VALIDATION


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

!formData.program ||

!formData.branch ||

!formData.experience

){


toast.error(

"Please select program and experience"

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












// SAVE APPLICATION


const submitApplication=()=>{



const application={



id:Date.now(),




...formData,





status:"Pending Approval",





submittedAt:

new Date()

.toLocaleDateString()




};









// SAVE CURRENT APPLICATION


localStorage.setItem(

"admissionApplication",

JSON.stringify(application)

);









// SAVE STATUS


localStorage.setItem(

"admissionStatus",

"Pending Approval"

);









// SAVE FOR SUPER ADMIN


const oldApplications = JSON.parse(

localStorage.getItem("admissionApplications")

||

"[]"

);









localStorage.setItem(

"admissionApplications",

JSON.stringify(

[

...oldApplications,

application

]

)

);









toast.success(

"Admission submitted successfully"

);






setTimeout(()=>{


navigate("/student/dashboard");


},1000);



};












// NEXT


const nextPage=()=>{


if(!validateStep())

return;




if(currentStep < steps.length-1){


setCurrentStep(

prev=>prev+1

);


}



};









const previousPage=()=>{


if(currentStep>0){


setCurrentStep(

prev=>prev-1

);


}



};











// RENDER STEPS


const renderStep=()=>{



switch(currentStep){



case 0:

return(

<PersonalInfo

formData={formData}

updateData={updateData}

/>

);







case 1:

return(

<AddressInfo

formData={formData}

updateData={updateData}

/>

);







case 2:

return(

<SkatingInfo

formData={formData}

updateData={updateData}

programs={programs}

branches={branches}

/>

);







case 3:

return(

<Documents

formData={formData}

updateData={updateData}

/>

);







case 4:

return(

<TermsConditions

formData={formData}

updateData={updateData}

/>

);







case 5:

return(

<ReviewApplication

formData={formData}

/>

);







case 6:

return(

<Payment

formData={formData}

updateData={updateData}

submitApplication={submitApplication}

/>

);






default:

return null;


}



};









return(


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

p-5

sm:p-8

lg:p-10

"

>





<h1

className="

text-3xl

sm:text-5xl

font-black

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

pb-5

"

>


<div

className="

flex

gap-6

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

"bg-[#1B2D44] text-slate-400"

}

`}

>

{index+1}

</div>




<p

className="

text-xs

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









<div className="mt-10">


{renderStep()}


</div>









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


disabled={currentStep===0}


onClick={previousPage}


className="

w-full

sm:w-auto

px-8

py-3

rounded-xl

bg-[#1B2D44]

disabled:opacity-40

"

>


Back


</button>









{

currentStep < steps.length-1 &&


<button


onClick={nextPage}


className="

w-full

sm:w-auto

px-10

py-3

rounded-xl

bg-teal-500

hover:bg-teal-600

font-bold

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