import {
Home,
User,
Calendar,
CreditCard
} from "lucide-react";


export default function MobileBottomNav(){

return(

<div className="
fixed
bottom-0
left-0
right-0
md:hidden
bg-[#102235]
border-t
border-slate-700
h-16
flex
justify-around
items-center
z-50
">


<Home size={22}/>
<User size={22}/>
<Calendar size={22}/>
<CreditCard size={22}/>


</div>

)

}