import ContactSection from './components/contact'
import FeaturesSection from './components/features'
import Footer from './components/footer'
import HomeHero from './components/home'
import Header from './components/layout/Header'

export default function page() {
  return (
    <>
      <Header />
      <HomeHero />
      <FeaturesSection />
      <ContactSection />
      <Footer />
    </>
  )
}
