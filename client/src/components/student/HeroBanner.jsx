import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroSkater from "../../assets/images/hero-skater.png";

export default function HeroBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}

      className="
      relative
      mt-6
      sm:mt-8
      overflow-hidden
      rounded-3xl
      bg-gradient-to-br
      from-[#0FA89D]
      via-[#139FD2]
      to-[#187EF2]

      px-5
      py-8

      sm:px-10
      sm:py-10

      lg:px-12
      lg:py-12
      "
    >


      {/* Background Rings */}

      <div
        className="
        absolute
        -right-32
        -top-32
        w-72
        h-72

        sm:w-[420px]
        sm:h-[420px]

        rounded-full
        border
        border-white/10
        "
      />


      <div
        className="
        absolute
        right-10
        top-20
        w-48
        h-48

        sm:w-[280px]
        sm:h-[280px]

        rounded-full
        border
        border-white/10
        "
      />



      {/* Soft Background Glow */}

      <div
        className="
        absolute
        right-0
        top-0

        w-72
        h-72

        sm:w-[500px]
        sm:h-[500px]

        bg-cyan-300/20
        blur-[120px]
        rounded-full
        "
      />



      <div
        className="
        absolute
        bottom-0
        right-0

        w-64
        h-40

        sm:w-[420px]
        sm:h-[260px]

        bg-cyan-500/20
        blur-[90px]
        rounded-full
        "
      />




      <div
        className="
        relative
        z-10

        grid
        grid-cols-1
        lg:grid-cols-2

        gap-8
        lg:gap-10

        items-center
        "
      >



        {/* LEFT CONTENT */}

        <div>


          <motion.p
            initial={{
              opacity:0,
              y:-20
            }}

            animate={{
              opacity:1,
              y:0
            }}

            className="
            uppercase
            tracking-[4px]
            sm:tracking-[6px]
            text-xs
            sm:text-sm
            font-semibold
            text-white/80
            "
          >

            READY, SET, SKATE!

          </motion.p>




          <motion.h1

            initial={{
              opacity:0,
              x:-40
            }}

            animate={{
              opacity:1,
              x:0
            }}

            transition={{
              delay:.2
            }}


            className="
            mt-4

            text-4xl
            sm:text-5xl
            lg:text-6xl

            font-extrabold
            leading-tight
            text-white
            "

          >

            Welcome Back,
            <br/>

            Student!

          </motion.h1>




          <motion.p

            initial={{
              opacity:0
            }}

            animate={{
              opacity:1
            }}

            transition={{
              delay:.4
            }}

            className="
            mt-5
            sm:mt-7

            max-w-xl

            text-base
            sm:text-lg
            lg:text-xl

            leading-7
            sm:leading-9

            text-white/90
            "

          >

            Manage admissions, memberships,
            attendance, events, competitions
            and much more from one place.

          </motion.p>




          <motion.button

            whileHover={{
              scale:1.05,
              boxShadow:
              "0px 0px 35px rgba(255,255,255,.3)"
            }}

            whileTap={{
              scale:.95
            }}


            className="
            mt-8

            flex
            items-center
            gap-3

            rounded-2xl

            bg-white

            px-6
            sm:px-8

            py-4

            font-semibold

            text-teal-700
            "

          >

            Apply For Admission

            <ArrowRight size={20}/>

          </motion.button>


        </div>





        {/* RIGHT IMAGE SECTION */}


        <div
          className="
          relative
          flex
          justify-center
          items-center
          "
        >


          {/* Image Glow */}

          <div
            className="
            absolute

            w-64
            h-64

            sm:w-[400px]
            sm:h-[400px]

            bg-cyan-200/20

            blur-[100px]

            rounded-full
            "
          />




          {/* Floor Glow */}

          <div
            className="
            absolute

            bottom-10

            w-56
            sm:w-[400px]

            h-20

            bg-cyan-300/30

            blur-[70px]

            rounded-full
            "
          />





          {/* SKATER IMAGE */}


          <motion.img

            src={heroSkater}

            alt="Hero Skater"


            initial={{
              opacity:0,
              scale:.85
            }}


            animate={{
              opacity:1,
              scale:1,
              y:[0,-8,0]
            }}


            transition={{

              opacity:{
                duration:.8
              },

              scale:{
                duration:.8
              },

              y:{
                duration:4,
                repeat:Infinity,
                ease:"easeInOut"
              }

            }}



            className="
            relative
            z-20

            w-[280px]

            sm:w-[380px]

            lg:w-[520px]

            xl:w-[600px]


            object-contain

            select-none

            pointer-events-none

            drop-shadow-[0_35px_50px_rgba(0,0,0,.35)]
            "

          />


        </div>



      </div>


    </motion.section>
  );
}