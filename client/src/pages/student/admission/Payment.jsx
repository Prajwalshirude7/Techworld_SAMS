import {
useState
} from "react";


import {
useNavigate
} from "react-router-dom";


import toast from "react-hot-toast";


import {
CreditCard,
Banknote,
CheckCircle
} from "lucide-react";


import scanner from "../../../assets/images/scanner.png";








export default function Payment({

formData,

updateData,

submitApplication

}){



const navigate = useNavigate();





const [paymentMethod,setPaymentMethod]=useState(

formData?.paymentMethod || ""

);









const selectPayment=(method)=>{


setPaymentMethod(method);


updateData({

paymentMethod:method

});


};









const handleSubmit=()=>{



if(!paymentMethod){


toast.error(

"Please select payment method"

);


return;


}








const paymentStatus =

paymentMethod==="Online Payment"

?

"Paid"

:

"Pending";









// PAYMENT RECORD


const payment={



id:Date.now(),



studentName:

formData.name,



email:

formData.email,



branch:

formData.branch,



program:

formData.program,



amount:

Number(formData.programFees || 0),



paymentMethod,



paymentStatus,



status:

paymentStatus==="Paid"

?

"Completed"

:

"Pending",



date:

new Date()

.toLocaleDateString()



};









const oldPayments = JSON.parse(

localStorage.getItem("payments")

||

"[]"

);








localStorage.setItem(

"payments",

JSON.stringify(

[

...oldPayments,

payment

]

)

);









// UPDATE FORM DATA


updateData({

paymentMethod,

paymentStatus

});









// SUBMIT APPLICATION FROM PARENT


submitApplication();








toast.success(

"Admission submitted successfully"

);








setTimeout(()=>{


navigate("/student/dashboard");


},1000);



};













return(


<div

className="
space-y-6
"

>





<h2

className="
text-3xl
font-black
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








{/* AMOUNT */}



<div

className="
bg-[#102235]
rounded-2xl
p-5
border
border-slate-700
"

>


<p

className="
text-slate-400
"

>

Program Fee

</p>



<h3

className="
text-3xl
font-black
text-teal-400
mt-2
"

>


₹{formData.programFees || 0}


</h3>



<p

className="
text-slate-300
mt-2
"

>

{formData.program}

</p>



</div>









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


onClick={()=>selectPayment(

"Online Payment"

)}



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

"border-slate-700 hover:border-teal-400"

}

`}



>


<div

className="
flex
items-center
gap-3
"

>


<CreditCard

className="
text-teal-400
"

/>



<h4

className="
text-lg
font-bold
"

>

Online Payment

</h4>


</div>




<p

className="
text-slate-400
mt-3
"

>

Pay using QR code.

</p>









{

paymentMethod==="Online Payment" &&


<div

className="
flex
justify-center
mt-6
"

>


<img


src={scanner}


alt="Payment QR"


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



onClick={()=>selectPayment(

"Cash Payment"

)}



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

"border-slate-700 hover:border-teal-400"

}

`}



>


<div

className="
flex
items-center
gap-3
"

>


<Banknote

className="
text-teal-400
"

/>



<h4

className="
text-lg
font-bold
"

>

Cash Payment

</h4>


</div>





<p

className="
text-slate-400
mt-3
"

>

Pay directly at selected branch.

</p>



</div>









{/* SUMMARY */}



<div

className="
bg-teal-500/10
border
border-teal-500/30
rounded-xl
p-4
flex
gap-3
items-center
"

>


<CheckCircle

className="
text-teal-400
"

/>


<p

className="
text-slate-300
"

>

Your admission will be sent to admin after payment submission.

</p>



</div>









<button


type="button"


onClick={handleSubmit}


className="
w-full
bg-teal-500
hover:bg-teal-600
py-4
rounded-xl
font-bold
text-white
transition
cursor-pointer
"

>


Submit Application


</button>









</div>






</div>


);


}