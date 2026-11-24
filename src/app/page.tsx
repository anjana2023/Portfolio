import Backdrop from "@/components/Backdrop";
import ScrollProgress from "@/components/ScrollProgress";
import CursorDot from "@/components/CursorDot";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Ticker from "@/components/Ticker";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Backdrop />
      <ScrollProgress />
      <CursorDot />
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Work />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
