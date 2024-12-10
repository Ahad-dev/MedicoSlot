import { Footer, HeroSection, Navbar, ServicesSection } from "@/components/home"

const Home = () => {
  return (
    <>
      <Navbar/>
    <div className="mx-10 space-y-8 mb-10">
      <HeroSection></HeroSection>
      <ServicesSection/>
    </div>
    <Footer></Footer>
    </>
  )
}

export default Home
