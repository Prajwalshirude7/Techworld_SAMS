import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import Features from "../../components/landing/Features";
import Programs from "../../components/landing/Programs";
import Branches from "../../components/landing/Branches";
import Gallery from "../../components/landing/Gallery";
import Footer from "../../components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Programs />
      <Branches />
      <Gallery />
      <Footer />
    </>
  );
}