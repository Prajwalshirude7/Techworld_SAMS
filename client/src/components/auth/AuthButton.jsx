export default function AuthButton({

children,

type="submit",

disabled=false

}){


return(

<button

type={type}

disabled={disabled}

className="
w-full
bg-teal-500
hover:bg-teal-600
active:scale-95
transition-all
duration-300
py-3
rounded-xl
text-white
font-bold
text-lg
cursor-pointer
shadow-[0_0_30px_rgba(20,184,166,.5)]
disabled:opacity-50
"

>

{children}

</button>


);


}