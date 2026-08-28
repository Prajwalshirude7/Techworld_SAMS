import Navbar from "../../components/landing/Navbar";

import Hero from "../../components/landing/Hero";
import About from "../../components/landing/About";
import Programs from "../../components/landing/Programs";
import Branches from "../../components/landing/Branches";
import Gallery from "../../components/landing/Gallery";
import Achievements from "../../components/landing/Achievements";
import Accessories from "../../components/landing/Accessories";
import Contact from "../../components/landing/Contact";
import Footer from "../../components/landing/Footer";



export default function Home(){


return(

<>


{/* NAVBAR */}

<Navbar/>




{/* MAIN CONTENT */}

<main className="pt-20">





{/* HERO */}

<section>

<Hero/>

</section>








{/* ABOUT */}

<section

id="about"

>

<About/>

</section>








{/* PROGRAMS */}

<section

id="programs"

>

<Programs/>

</section>








{/* BRANCHES */}

<section

id="branches"

>

<Branches/>

</section>








{/* GALLERY */}

<section

id="gallery"

>

<Gallery/>

</section>








{/* ACHIEVEMENTS */}

<section

id="achievements"

>

<Achievements/>

</section>








{/* ACCESSORIES */}

<section

id="accessories"

>

<Accessories/>

</section>








{/* CONTACT */}

<section

id="contact"

>

<Contact/>

</section>





</main>








{/* FOOTER */}

<Footer/>




</>


);


}