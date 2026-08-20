export default function StudentSidebar(){

const menu=[
"Dashboard",
"My Profile",
"Admission",
"Membership",
"Products",
"Events",
"Settings"
]


return(

<aside className="
w-72
min-h-screen
bg-[#102235]
border-r
border-slate-800
p-6
">


<h1 className="
text-3xl
font-bold
text-teal-400
">
SAMS
</h1>


<p className="
text-slate-400
mt-2
">
Student Portal
</p>


<nav className="
mt-10
space-y-5
">


{
menu.map((item)=>(
<div
key={item}
className="
text-slate-200
hover:text-teal-400
cursor-pointer
font-medium
"
>

{item}

</div>
))
}


</nav>


</aside>

)

}