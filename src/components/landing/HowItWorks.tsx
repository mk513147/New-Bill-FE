import { Box, Container, Heading, SimpleGrid, Text, VStack, HStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Upload, Activity, TrendingUp, CheckCircle2 } from 'lucide-react'

const MotionBox = motion.create(Box)
const MotionVStack = motion.create(VStack)

const steps = [
  {
    number: '01',
    title: 'Set Up Your Business Profile',
    description:
      'Create your shop profile, add staff members with role-based access, and configure your business settings in minutes.',
    icon: Upload,
    color: 'purple.400',
    gradient: 'linear(to-br, purple.500, purple.700)',
  },
  {
    number: '02',
    title: 'Add Products, Suppliers & Customers',
    description:
      'Build your product catalog with categories and pricing, manage supplier details, and import customer information for easy management.',
    icon: Activity,
    color: 'purple.500',
    gradient: 'linear(to-br, purple.500, purple.700)',
  },
  {
    number: '03',
    title: 'Process Sales & Purchases',
    description:
      'Create bills and invoices, record purchases, handle returns, and manage payments. All transactions automatically update your inventory.',
    icon: TrendingUp,
    color: 'purple.300',
    gradient: 'linear(to-br, purple.500, purple.700)',
  },
  {
    number: '04',
    title: 'Monitor & Grow with Analytics',
    description:
      'View real-time dashboards, analyze sales trends, track profit margins, monitor stock levels, and make data-driven decisions to scale your business.',
    icon: CheckCircle2,
    color: 'purple.400',
    gradient: 'linear(to-br, purple.500, purple.700)',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
    },
  },
}

export function HowItWorks() {
  return (
    <Box bg="black" py={{ base: 16, md: 24 }} position="relative" id="how-it-works">
      <Container maxW="7xl">
        {/* Section Header */}
        <VStack gap={4} mb={16} textAlign="center">
          <HStack gap={2} color="purple.400">
            <CheckCircle2 size={24} />
            <Text fontSize="sm" fontWeight="700" textTransform="uppercase" letterSpacing="wider">
              Simple Process
            </Text>
          </HStack>

          <Heading
            size={{ base: '2xl', md: '4xl' }}
            fontWeight="800"
            letterSpacing="tight"
            color="white"
          >
            Get Started in Just 4 Simple Steps
          </Heading>

          <Text fontSize={{ base: 'md', md: 'xl' }} color="gray.400" maxW="3xl" fontWeight="500">
            From setup to success: automate your business and start making data-driven decisions
          </Text>
        </VStack>

        {/* Steps */}
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 4 }}
            gap={{ base: 12, md: 8 }}
            position="relative"
          >
            {/* Connection Line for Desktop */}
            <Box
              display={{ base: 'none', md: 'block' }}
              position="absolute"
              top="80px"
              left="10%"
              right="10%"
              h="2px"
              bgGradient="linear(to-r, purple.700, purple.500, purple.700)"
              zIndex={0}
            />

            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <MotionVStack
                  key={step.number}
                  variants={itemVariants}
                  gap={6}
                  position="relative"
                  zIndex={1}
                >
                  {/* Icon Circle */}
                  <MotionBox
                    position="relative"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box
                      w="160px"
                      h="160px"
                      borderRadius="full"
                      bgGradient={step.gradient}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      color="white"
                      shadow="xl"
                      position="relative"
                    >
                      <Icon size={64} strokeWidth={1.5} />

                      {/* Step Number Badge */}
                      <Box
                        position="absolute"
                        top="-4"
                        right="-4"
                        w="48px"
                        h="48px"
                        borderRadius="full"
                        bg="white"
                        color="gray.800"
                        fontWeight="800"
                        fontSize="xl"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        shadow="lg"
                        borderWidth="4px"
                        borderColor="white"
                      >
                        {step.number}
                      </Box>
                    </Box>
                  </MotionBox>

                  {/* Content */}
                  <VStack gap={3} textAlign="center">
                    <Heading size="lg" fontWeight="700" color="white">
                      {step.title}
                    </Heading>
                    <Text
                      fontSize="md"
                      color="gray.400"
                      lineHeight="1.7"
                      fontWeight="500"
                      maxW="320px"
                    >
                      {step.description}
                    </Text>
                  </VStack>
                </MotionVStack>
              )
            })}
          </SimpleGrid>
        </MotionBox>
      </Container>
    </Box>
  )
}
