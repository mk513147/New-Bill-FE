import {
  Box,
  Button,
  Input,
  Stack,
  Link,
  Heading,
  Flex,
  Field,
  Text,
  Image,
  HStack,
  useMediaQuery,
} from '@chakra-ui/react'
import { PasswordInput } from '@/components/ui/password-input'
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form'
import login from '@/assets/Login-Image.jpg'
import logo from '@/assets/logo.png'
import topSvg from '@/assets/top.svg'
import rightSvg from '@/assets/right.svg'

import { ToasterUtil } from '@/components/common/ToasterUtil'
import { API } from '@/api/api'
import { useNavigate } from 'react-router-dom'
import { setProfile } from '@/redux/slices/profileSlice'
import { useDispatch } from 'react-redux'
import { AxiosError } from 'axios'
import API_ENDPOINTS from '@/api/apiEndpoints'
import { clearLoading, setLoading } from '@/redux/slices/uiSlice'
import { Link as RouterLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const MotionFlex = motion(Flex)
const MotionBox = motion(Box)

interface FormValues {
  emailId: string
  password: string
}

const Login = () => {
  const toastFunc = ToasterUtil()
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm<FormValues>()
  const [isLarge] = useMediaQuery(['(min-width: 500px)'])

  const onSubmit: SubmitHandler<FormValues> = async (creds) => {
    dispatch(setLoading({ loading: true, message: 'Logging in...' }))
    try {
      const res = await API.post(API_ENDPOINTS.AUTH.LOGIN, creds)

      if (res.status === 200) {
        localStorage.setItem('eb_logged_in', 'true')
        dispatch(setProfile(res?.data?.data?.data))
        dispatch(clearLoading())
        toastFunc('Logged in successfully', 'success')
        navigate('/dashboard')
        return
      }
    } catch (error) {
      console.error('Login error:', error)

      if (error instanceof AxiosError) {
        const msg = error.response?.data?.message || 'Invalid Credentials'
        toastFunc(msg, 'error')
      } else {
        toastFunc('Something Went Wrong', 'error')
      }
    }
  }

  const onError = (errors: FieldErrors<FormValues>) => {
    Object.values(errors).forEach((err) => {
      toastFunc(err?.message || 'Fill the required fields', 'error')
    })
  }

  return (
    <>
      {!isLarge ? (
        <Flex w="100%" h="100vh" justify="center" align="center" bg="white">
          <Flex w="100%" maxW="450px" h="100%" direction="column" position="relative" bg="white">
            <Box
              w="100%"
              h="400px"
              bg="blue.600"
              borderBottomRadius="40px"
              position="relative"
              overflow="hidden"
              px="30px"
              pt="40px"
            >
              <Image
                src={topSvg}
                position="absolute"
                top="-22px"
                left="-30px"
                w="80%"
                zIndex={1}
                opacity={0.85}
              />

              <Image
                src={rightSvg}
                position="absolute"
                bottom="0px"
                right="10px"
                w="100px"
                zIndex={200}
              />

              <Box position="relative" zIndex={3} mt={5} top="40%">
                <Heading fontSize="48px" fontWeight="800" color="white">
                  Hello!
                </Heading>
                <Text fontSize="xl" color="white" mt={3} fontWeight="500">
                  Welcome to Ebill
                </Text>
              </Box>
            </Box>

            <Box
              w="100%"
              bg="white"
              mt="-60px"
              borderTopRadius="40px"
              px="30px"
              pt="40px"
              pb="50px"
              boxShadow="0px -4px 18px rgba(0,0,0,0.1)"
              zIndex={10}
            >
              <Heading fontSize="32px" fontWeight="700" color="blue.700">
                Login
              </Heading>

              <Box w="100%" mt={6} maxW="350px">
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                  <Stack gap={5}>
                    <Field.Root>
                      <Field.Label>Email</Field.Label>
                      <Input {...register('emailId')} size="lg" />
                    </Field.Root>

                    <Field.Root>
                      <Field.Label>Password</Field.Label>
                      <PasswordInput {...register('password')} size="lg" />
                    </Field.Root>

                    <Button type="submit" size="lg" w="100%">
                      Log In
                    </Button>
                  </Stack>
                </form>
              </Box>
            </Box>
          </Flex>
        </Flex>
      ) : (
        <MotionFlex
          w="100vw"
          h="100vh"
          bgGradient="radial-gradient(circle at top, #1a1a1a 0%, #0b0b0f 45%, #000000 100%)"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* LEFT — LOGIN */}
          <Flex
            w="50%"
            direction="column"
            justify="center"
            align="center"
            px={16}
            position="relative"
          >
            {/* Logo */}
            <HStack asChild position="absolute" top="40px" left="40px" gap={2} cursor="pointer">
              <RouterLink to="/">
                <Image src={logo} w="34px" h="34px" />
                <Text
                  fontSize="2xl"
                  fontWeight="800"
                  bgGradient="linear-gradient(90deg, #9f7aea, #63b3ed)"
                  bgClip="text"
                >
                  Ebill
                </Text>
              </RouterLink>
            </HStack>

            {/* Heading */}
            <MotionBox
              textAlign="center"
              mb={10}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Heading fontSize="5xl" fontWeight="800" color="white" lineHeight="1.1">
                Welcome Back
              </Heading>

              <Text mt={6} fontSize="lg" color="gray.400">
                Enter your credentials to continue
              </Text>
            </MotionBox>

            {/* Login Card */}
            <MotionBox
              w="100%"
              maxW="420px"
              bg="rgba(255,255,255,0.04)"
              backdropFilter="blur(14px)"
              border="1px solid"
              borderColor="rgba(255,255,255,0.08)"
              borderRadius="2xl"
              px={8}
              py={10}
              boxShadow="0 20px 60px rgba(0,0,0,0.6)"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <form onSubmit={handleSubmit(onSubmit, onError)}>
                <Stack gap={5}>
                  <Field.Root>
                    <Field.Label color="gray.300">Email</Field.Label>
                    <Input
                      {...register('emailId')}
                      size="lg"
                      bg="rgba(255,255,255,0.06)"
                      borderColor="rgba(255,255,255,0.12)"
                      color="white"
                      _focus={{ borderColor: 'purple.400' }}
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label color="gray.300">Password</Field.Label>
                    <PasswordInput
                      {...register('password')}
                      size="lg"
                      bg="rgba(255,255,255,0.06)"
                      borderColor="rgba(255,255,255,0.12)"
                      color="white"
                      _focus={{ borderColor: 'purple.400' }}
                    />
                  </Field.Root>

                  <Flex justify="flex-end">
                    <Link fontSize="sm" color="purple.300">
                      Forgot your password?
                    </Link>
                  </Flex>

                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Button
                      type="submit"
                      size="lg"
                      w="100%"
                      borderRadius="full"
                      bgGradient="linear-gradient(135deg, #9f7aea, #6b46c1)"
                      color="white"
                      fontWeight="700"
                    >
                      Log In
                    </Button>
                  </motion.div>
                </Stack>
              </form>
            </MotionBox>
          </Flex>

          <Flex
            w="50%"
            direction="column"
            justify="center"
            align="center"
            bgGradient="linear-gradient(135deg, #120018, #1a0026, #000000)"
            boxShadow="inset 0 0 120px rgba(159,122,234,0.15)"
            overflow="hidden"
          >
            <MotionBox
              textAlign="center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Heading color="white" fontSize="4xl" maxW="520px">
                Smart Billing & Inventory Management
              </Heading>

              <Text mt={6} color="gray.400" maxW="520px">
                Track inventory, manage billing, and grow your business effortlessly.
              </Text>
            </MotionBox>

            <motion.div
              style={{ marginTop: '56px', width: '72%' }}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Image src={login} borderRadius="2xl" boxShadow="0 40px 100px rgba(0,0,0,0.75)" />
            </motion.div>
          </Flex>
        </MotionFlex>
      )}
    </>
  )
}

export default Login
