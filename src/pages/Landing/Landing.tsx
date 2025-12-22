import {
  HeroSection,
  TrustBar,
  FeaturesSection,
  HowItWorks,
  AudienceSection,
  ScreenshotsSection,
  CTASection,
  Footer,
  LandingHeader,
} from '@/components/landing'

export default function Landing() {
  return (
    <>
      <LandingHeader />
      <HeroSection />
      <TrustBar />
      <FeaturesSection />
      <HowItWorks />
      <AudienceSection />
      <ScreenshotsSection />
      <CTASection />
      <Footer />
    </>
  )
}
