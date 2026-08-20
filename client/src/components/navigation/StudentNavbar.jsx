import {
  Search,
  ChevronDown,
  Sun,
  Menu,
} from "lucide-react";


export default function StudentNavbar({ toggleSidebar }) {

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } 
  else if (hour < 17) {
    greeting = "Good Afternoon";
  }


  const studentName =
    localStorage.getItem("studentName") || "Student";


  return (

    <header
      className="
      w-full
      min-h-[90px]
      bg-[#102235]
      border-b
      border-slate-800
      flex
      items-center
      justify-between
      px-4
      sm:px-6
      lg:px-8
      py-4
      "
    >


      {/* LEFT SIDE */}

      <div
        className="
        flex
        items-center
        gap-3
        sm:gap-5
        min-w-0
        "
      >


        {/* Mobile Hamburger */}

        <button
          onClick={toggleSidebar}
          className="
          md:hidden
          w-12
          h-12
          rounded-2xl
          bg-[#1B2D44]
          flex
          items-center
          justify-center
          text-white
          hover:bg-teal-500
          transition
          "
        >

          <Menu size={26}/>

        </button>



        {/* Sun Icon */}

        <div
          className="
          hidden
          sm:flex
          w-12
          h-12
          lg:w-14
          lg:h-14
          rounded-2xl
          bg-[#1B2D44]
          items-center
          justify-center
          "
        >

          <Sun
            size={28}
            className="text-yellow-400"
          />

        </div>




        {/* Heading */}

        <div className="min-w-0">


          <p
            className="
            text-slate-400
            text-xs
            sm:text-sm
            "
          >

            {greeting} 👋

          </p>



          <h1
            className="
            text-xl
            sm:text-2xl
            lg:text-4xl
            font-bold
            text-white
            truncate
            max-w-[180px]
            sm:max-w-none
            "
          >

            Student Dashboard

          </h1>


        </div>


      </div>





      {/* RIGHT SIDE */}

      <div
        className="
        flex
        items-center
        gap-3
        "
      >



        {/* Search */}

        <div
          className="
          hidden
          lg:block
          relative
          "
        >

          <Search
            size={18}
            className="
            absolute
            left-5
            top-1/2
            -translate-y-1/2
            text-slate-500
            "
          />



          <input

            type="text"

            placeholder="Search anything..."

            className="
            w-72
            xl:w-96
            rounded-2xl
            bg-[#1B2D44]
            border
            border-slate-700
            py-4
            pl-14
            pr-5
            text-white
            placeholder:text-slate-500
            outline-none
            focus:border-teal-500
            "

          />

        </div>







        {/* Profile */}

        <button
          className="
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-slate-700
          bg-[#1B2D44]
          px-3
          sm:px-5
          py-2
          hover:border-teal-500
          transition
          "
        >


          {/* Avatar */}

          <div
            className="
            w-12
            h-12
            rounded-full
            bg-teal-500
            flex
            items-center
            justify-center
            text-xl
            font-bold
            text-white
            "
          >

            {
              studentName
              .charAt(0)
              .toUpperCase()
            }

          </div>





          {/* Details */}

          <div
            className="
            hidden
            sm:block
            text-left
            "
          >

            <p
              className="
              text-white
              font-semibold
              text-sm
              lg:text-base
              "
            >

              Hello,
              <br/>
              {studentName}

            </p>


            <p
              className="
              text-slate-400
              text-xs
              "
            >

              View Profile

            </p>


          </div>





          <ChevronDown
            size={18}
            className="
            hidden
            sm:block
            text-slate-400
            "
          />


        </button>



      </div>


    </header>

  );

}