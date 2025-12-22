import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  Badge,
  HStack,
  VStack,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Sparkles, TrendingUp, Zap } from 'lucide-react'
import { Link as RouterLink } from 'react-router-dom'

const MotionBox = motion.create(Box)
const MotionText = motion.create(Text)
const MotionButton = motion.create(Button)

export function HeroSection() {
  return (
    <Box bg="black" py={{ base: 20, md: 32 }} position="relative" overflow="hidden">
      {/* Animated background elements */}
      <MotionBox
        position="absolute"
        top="-10%"
        right="-5%"
        w="600px"
        h="600px"
        bgGradient="radial(purple.500, transparent)"
        borderRadius="full"
        filter="blur(80px)"
        opacity={0.3}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <MotionBox
        position="absolute"
        bottom="-10%"
        left="-5%"
        w="500px"
        h="500px"
        bgGradient="radial(purple.600, transparent)"
        borderRadius="full"
        filter="blur(80px)"
        opacity={0.3}
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <Container maxW="7xl" position="relative" zIndex={1}>
        <Stack gap={8} align="center" textAlign="center">
          {/* Badge */}
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              colorPalette="purple"
              size="lg"
              px={4}
              py={2}
              borderRadius="full"
              fontSize="sm"
              fontWeight="600"
              display="flex"
              alignItems="center"
              gap={2}
            >
              <Sparkles size={16} />
              Trusted by 1000+ businesses
            </Badge>
          </MotionBox>

          {/* Main Heading */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Heading
              size={{ base: '3xl', md: '6xl' }}
              fontWeight="900"
              letterSpacing="tight"
              lineHeight="1.1"
              bgGradient="linear(to-r, purple.400, purple.600)"
              bgClip="text"
              maxW="5xl"
              mb={6}
              color={'white'}
            >
              Smart Billing & Inventory Management
            </Heading>
          </MotionBox>

          {/* Subheading */}
          <MotionText
            fontSize={{ base: 'lg', md: '2xl' }}
            color="gray.300"
            maxW="3xl"
            fontWeight="500"
            lineHeight="1.6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Streamline your business operations with our powerful, easy-to-use platform. Track
            inventory, manage billing, and grow your business effortlessly.
          </MotionText>

          {/* Features List */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <HStack
              gap={{ base: 4, md: 8 }}
              flexWrap="wrap"
              justify="center"
              fontSize={{ base: 'sm', md: 'md' }}
              color="gray.600"
              fontWeight="500"
            >
              <HStack>
                <Box color="green.500">
                  <Zap size={18} fill="currentColor" />
                </Box>
                <Text>Real-time tracking</Text>
              </HStack>
              <HStack>
                <Box color="blue.500">
                  <TrendingUp size={18} />
                </Box>
                <Text>Smart analytics</Text>
              </HStack>
              <HStack>
                <Box color="purple.500">
                  <Sparkles size={18} />
                </Box>
                <Text>Easy to use</Text>
              </HStack>
            </HStack>
          </MotionBox>

          {/* CTA Buttons */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Stack direction={{ base: 'column', sm: 'row' }} gap={4} pt={4}>
              <MotionButton
                size="xl"
                px={8}
                py={7}
                bgGradient="linear(to-r, purple.500, purple.700)"
                color="white"
                fontSize="lg"
                fontWeight="700"
                borderRadius="full"
                shadow="xl"
                _hover={{
                  transform: 'translateY(-2px)',
                  shadow: '2xl',
                }}
                asChild
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RouterLink to="/login">Start Free Trial</RouterLink>
              </MotionButton>

              <MotionButton
                size="xl"
                px={8}
                py={7}
                variant="outline"
                borderWidth="2px"
                borderColor="purple.500"
                fontSize="lg"
                fontWeight="600"
                borderRadius="full"
                bg="transparent"
                color="white"
                _hover={{
                  bg: 'gray.50',
                  borderColor: 'gray.400',
                  transform: 'translateY(-2px)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </MotionButton>
            </Stack>
          </MotionBox>

          {/* Trust Indicators */}
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            pt={8}
          >
            <VStack gap={2}>
              <Text fontSize="sm" color="gray.400" fontWeight="500">
                No credit card required • Free 14-day trial
              </Text>
            </VStack>
          </MotionBox>
        </Stack>
      </Container>
    </Box>
  )
}
