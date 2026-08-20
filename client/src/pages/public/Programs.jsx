import { motion } from "framer-motion";
import {
  Trophy,
  Star,
  Zap,
  ArrowRight
} from "lucide-react";


const programs = [
  {
    title: "Beginner Skating",
    icon: Star,
    description:
      "Learn basic skating skills, balance, safety and confidence with expert coaches.",
    level: "Beginner",
  },

  {
    title: "Intermediate Training",
    icon: Zap,
    description:
      "Improve your skating techniques, speed, control and performance skills.",
    level: "Intermediate",
  },

  {
    title: "Competition Training",
    icon: Trophy,
    description:
      "Advanced coaching for competitions, professional training and achievements.",
    level: "Advanced",
  },
];


export default function Programs() {

  return (

    <div className="min-h-screen bg-[#08131E] px-6 py-16">


      {/* Header */}

      <motion.div
        initial={{
          opacity:0,
          y:-30
        }}
        animate={{
          opacity:1,
          y:0
        }}
        className="text-center"
      >

        <p className="text-teal-400 uppercase tracking-[5px]">
          Our Programs
        </p>


        <h1 className="mt-4 text-5xl font-black text-white">
          Choose Your Skating Journey
        </h1>


        <p className="mt-5 text-slate-400 max-w-2xl mx-auto">
          Structured skating programs designed for beginners,
          intermediate learners and professional athletes.
        </p>

      </motion.div>




      {/* Cards */}

      <div className="mt-14 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">


        {programs.map((program,index)=>{

          const Icon = program.icon;


          return (

            <motion.div

              key={index}

              initial={{
                opacity:0,
                y:40
              }}

              animate={{
                opacity:1,
                y:0
              }}

              transition={{
                delay:index*0.2
              }}

              whileHover={{
                y:-10
              }}

              className="
              rounded-3xl
              bg-[#102235]
              border
              border-white/10
              p-8
              hover:border-teal-400
              transition
              "

            >


              <div className="
              w-16 h-16 
              rounded-2xl 
              bg-teal-500/20
              flex
              items-center
              justify-center
              ">

                <Icon
                  size={32}
                  className="text-teal-400"
                />

              </div>



              <h2 className="
              mt-6
              text-2xl
              font-bold
              text-white
              ">

                {program.title}

              </h2>


              <span className="
              inline-block
              mt-3
              rounded-full
              bg-teal-500/20
              px-4
              py-1
              text-sm
              text-teal-300
              ">

                {program.level}

              </span>



              <p className="
              mt-5
              text-slate-400
              leading-7
              ">

                {program.description}

              </p>



              <button className="
              mt-6
              flex
              items-center
              gap-2
              text-teal-400
              font-semibold
              ">

                Learn More

                <ArrowRight size={18}/>

              </button>



            </motion.div>

          )

        })}


      </div>


    </div>

  );
}