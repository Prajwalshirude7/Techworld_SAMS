import {
Home,
User,
FileText,
CreditCard,
ShoppingBag,
MapPin,
Trophy,
Calendar,
Phone,
HelpCircle,
Settings
}
from "lucide-react";


export default function StudentSidebar(){


const menu=[
["Dashboard",Home],
["My Profile",User],
["Apply For Admission",FileText],
["Subscription Plans",CreditCard],
["Products",ShoppingBag],
["Branches",MapPin],
["Achievements",Trophy],
["Events",Calendar],
["Contact Us",Phone],
["Help & Support",HelpCircle],
["Settings",Settings]
];



return(

<div
className="
w-72
min-h-screen
bg-[#102235]
p-6
"
>


<h1
className="
text-2xl
font-bold
text-teal-400
mb-8
"
>
SAMS
</h1>



<div className="space-y-2">


{
menu.map(([name,Icon])=>(

<div

key={name}

className="
flex
items-center
gap-4
px-4
py-3
rounded-xl
text-slate-300
hover:bg-teal-500/20
hover:text-white
cursor-pointer
transition
"

>

<Icon size={20}/>

<span>
{name}
</span>


</div>


))
}


</div>


</div>

)

}