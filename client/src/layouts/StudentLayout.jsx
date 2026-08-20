import {useState} from "react";

import StudentSidebar from "../components/student/StudentSidebar";
import StudentNavbar from "../components/navigation/StudentNavbar";


export default function StudentLayout({children}){


const [sidebarOpen,setSidebarOpen]=useState(false);


return(

<div
className="
min-h-screen
bg-[#07131f]
text-white
flex
"
>


{/* Desktop */}

<div className="
hidden
md:block
">

<StudentSidebar/>

</div>




{/* Mobile Sidebar */}

{
sidebarOpen &&

<div
className="
fixed
inset-0
z-50
md:hidden
"
>


<div
onClick={()=>setSidebarOpen(false)}
className="
absolute
inset-0
bg-black/45
"
/>


<div
className="
relative
w-72
h-full
"
>

<StudentSidebar/>

</div>


</div>

}




<div
className="
flex-1
"
>


<StudentNavbar
toggleSidebar={()=>setSidebarOpen(true)}
/>



<main
className="
p-4
sm:p-6
lg:p-8
"
>

{children}

</main>


</div>



</div>

)

}