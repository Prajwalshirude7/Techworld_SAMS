import {
LayoutDashboard,
FileText,
Building2,
UserCog,
Users,
Image,
Megaphone,
CreditCard,
Package,
BarChart3,
Settings,
LogOut
} from "lucide-react";

import { NavLink } from "react-router-dom";

import logo from "../../assets/images/logosams.png";



export default function Sidebar(){


const menu=[

{
name:"Dashboard",
path:"/super-admin/dashboard",
icon:LayoutDashboard
},

{
name:"Admissions",
path:"/super-admin/admissions",
icon:FileText
},

{
name:"Branches",
path:"/super-admin/branches",
icon:Building2
},

{
name:"Branch Admins",
path:"/super-admin/branch-admins",
icon:UserCog
},

{
name:"Students",
path:"/super-admin/students",
icon:Users
},

{
name:"Gallery",
path:"/super-admin/gallery",
icon:Image
},

{
name:"Announcements",
path:"/super-admin/announcements",
icon:Megaphone
},

{
name:"Payments",
path:"/super-admin/payments",
icon:CreditCard
},

{
name:"Products",
path:"/super-admin/products",
icon:Package
},

{
name:"Reports",
path:"/super-admin/reports",
icon:BarChart3
},

{
name:"Settings",
path:"/super-admin/settings",
icon:Settings
}

];



return(

<aside

className="
fixed
left-0
top-0
h-screen
w-72
bg-[#06111b]
border-r
border-slate-800
p-6
hidden
lg:flex
flex-col
z-50
"

>


{/* LOGO SECTION */}

<div

className="
flex
items-center
gap-4
mb-10
"

>


<img

src={logo}

alt="SAMS Logo"

className="
w-16
h-16
rounded-full
object-cover
shadow-[0_0_25px_rgba(20,184,166,.5)]
"

/>



<div>

<h2

className="
text-white
font-black
text-2xl
"

>

SAMS

</h2>


<p

className="
text-teal-400
text-xs
font-bold
tracking-[4px]
"

>

ADMIN PANEL

</p>


</div>


</div>





{/* MENU */}


<nav

className="
flex-1
space-y-2
"

>


{

menu.map((item,index)=>{


const Icon=item.icon;


return(

<NavLink

key={index}

to={item.path}


className={({isActive})=>

`

flex
items-center
gap-4
px-4
py-3
rounded-xl
font-semibold
transition-all
duration-300

${
isActive

?

"bg-teal-500 text-white shadow-lg shadow-teal-500/30"

:

"text-slate-400 hover:bg-[#102235] hover:text-white"

}

`

}

>


<Icon size={21}/>


<span>

{item.name}

</span>


</NavLink>

)


})

}


</nav>







{/* LOGOUT */}


<button

className="
flex
items-center
gap-4
px-4
py-3
rounded-xl
text-red-400
hover:bg-red-500/10
font-semibold
transition
"

>

<LogOut size={21}/>

Logout


</button>





</aside>


)

}