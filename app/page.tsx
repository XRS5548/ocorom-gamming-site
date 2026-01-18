import FAQ from '@/components/website/faq'
import FooterMinimal from '@/components/website/footer'
import GamesListingSection from '@/components/website/gamming'
import HeroSection from '@/components/website/hero'
import HowItWorksSection from '@/components/website/howitwork'
import GamingNavbar from '@/components/website/navbar'
import StatsSection from '@/components/website/stats'
import Testimonials from '@/components/website/testimonial'
import WhyChooseUsSection from '@/components/website/whychooseus'
import React from 'react'

export default function page() {
  return (
    <div>
      <HeroSection />
      <GamesListingSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <StatsSection />
      <Testimonials />
      <FAQ />
    </div>
  )
}
