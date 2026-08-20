import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import scanner from "../../../assets/images/scanner.png";


export default function Payment({

data,
updateData

}) {


const navigate = useNavigate();


const [paymentMethod,setPaymentMethod]=useState("");





const selectPayment=(method)=>{


setPaymentMethod(method);


updateData({

paymentMethod:method

});


};






const submitApplication=()=>{


if(!paymentMethod){

toast.error(
"Please select payment method"
);

return;

}




const applicationData={

...data,

paymentMethod,

status:"Pending Approval",

submittedAt:
new Date().toLocaleDateString()

};




// Save application data

localStorage.setItem(

"admissionApplication",

JSON.stringify(applicationData)

);



toast.success(
"Application submitted successfully!"
);





setTimeout(()=>{


navigate("/student/dashboard");


},1000);



};







return(

<div className="space-y-6">





<h2

className="
text-3xl
font-bold
text-white
"

>

Payment

</h2>








<div

className="
bg-[#07131f]
border
border-slate-700
rounded-3xl
p-5
sm:p-8
space-y-6
"

>





<h3

className="
text-xl
font-bold
text-white
"

>

Choose Payment Method

</h3>









{/* ONLINE PAYMENT */}



<div


onClick={()=>selectPayment("Online Payment")}


className={`

cursor-pointer
rounded-2xl
border
p-5
transition

${
paymentMethod==="Online Payment"

?

"border-teal-500 bg-teal-500/10"

:

"border-slate-700"

}

`

}


>


<h4

className="
text-white
font-bold
text-lg
"

>

Online Payment

</h4>


<p className="
text-slate-400
mt-2
">

Scan QR code and complete payment.

</p>






{

paymentMethod==="Online Payment" &&


<div

className="
mt-6
flex
justify-center
"

>


<img

src={scanner}

alt="Payment Scanner"

className="
w-52
sm:w-64
rounded-xl
"

/>


</div>


}





</div>









{/* CASH PAYMENT */}



<div


onClick={()=>selectPayment("Cash Payment")}


className={`

cursor-pointer
rounded-2xl
border
p-5
transition


${
paymentMethod==="Cash Payment"

?

"border-teal-500 bg-teal-500/10"

:

"border-slate-700"

}

`

}


>


<h4

className="
text-white
font-bold
text-lg
"

>

Cash Payment

</h4>



<p

className="
text-slate-400
mt-2
"

>

Pay directly at academy branch.

</p>



</div>









<button


onClick={submitApplication}


className="
w-full
bg-teal-500
hover:bg-teal-600
py-4
rounded-xl
text-white
font-bold
transition
"

>


Submit Application


</button>





</div>



</div>


)

}