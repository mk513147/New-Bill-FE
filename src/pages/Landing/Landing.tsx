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
import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion.create(Box)

export default function Landing() {
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      css={{
        scrollBehavior: 'smooth',
      }}
    >
      <LandingHeader />
      <HeroSection />
      <TrustBar />
      <Box id="features">
        <FeaturesSection />
      </Box>
      <HowItWorks />
      <AudienceSection />
      <ScreenshotsSection />
      <CTASection />
      <Footer />
    </MotionBox>
  )
}
