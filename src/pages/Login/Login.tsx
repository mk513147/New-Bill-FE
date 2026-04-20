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
  HStack,
} from '@chakra-ui/react'
import { PasswordInput } from '@/components/ui/password-input'
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form'
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
import { setAuthenticated } from '@/utils/authSession'
import { clearSubscriptionInactive } from '@/utils/subscriptionAccess'

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

  const onSubmit: SubmitHandler<FormValues> = async (creds) => {
    dispatch(setLoading({ loading: true, message: 'Logging in...' }))
    try {
      const res = await API.post(API_ENDPOINTS.AUTH.LOGIN, creds)

      if (res.status === 200) {
        setAuthenticated(true)
        clearSubscriptionInactive()
        dispatch(setProfile(res?.data?.data?.data))
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
    } finally {
      dispatch(clearLoading())
    }
  }

  const onError = (errors: FieldErrors<FormValues>) => {
    Object.values(errors).forEach((err) => {
      toastFunc(err?.message || 'Fill the required fields', 'error')
    })
  }

  return (
    <MotionFlex
      w="100vw"
      h="100vh"
      bgGradient="linear-gradient(135deg, #0f172a 0%, #1a1f35 50%, #0d0f17 100%)"
      align="center"
      justify="center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      overflow="hidden"
      position="relative"
    >
      {/* Decorative gradients */}
      <Box
        position="absolute"
        w="600px"
        h="600px"
        borderRadius="full"
        bgGradient="radial-gradient(circle, rgba(96,165,250,0.2), transparent)"
        top="-200px"
        right="-100px"
        filter="blur(80px)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        w="500px"
        h="500px"
        borderRadius="full"
        bgGradient="radial-gradient(circle, rgba(52,211,153,0.15), transparent)"
        bottom="-150px"
        left="-100px"
        filter="blur(80px)"
        pointerEvents="none"
      />

      {/* Logo */}
      <HStack position="absolute" top={6} left={6} gap={2} cursor="pointer" asChild zIndex={10}>
        <RouterLink to="/">
          <Box
            w="28px"
            h="28px"
            borderRadius="8px"
            bgGradient="linear-gradient(135deg, #60a5fa, #34d399)"
            display="flex"
            align="center"
            justify="center"
            color="white"
            fontWeight="800"
            fontSize="16px"
          >
            E
          </Box>
          <Text
            fontSize="xl"
            fontWeight="800"
            bgGradient="linear-gradient(90deg, #60a5fa, #34d399)"
            bgClip="text"
            color="transparent"
          >
            Ebill
          </Text>
        </RouterLink>
      </HStack>

      {/* Main Content */}
      <MotionFlex
        w="100%"
        maxW="420px"
        direction="column"
        align="center"
        px={6}
        position="relative"
        zIndex={2}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Heading */}
        <MotionBox
          textAlign="center"
          mb={12}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Heading
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight="800"
            color="white"
            lineHeight="1.2"
          >
            Welcome Back
          </Heading>

          <Text mt={4} fontSize="sm" color="gray.400">
            Sign in to your account to continue
          </Text>
        </MotionBox>

        {/* Login Card */}
        <MotionBox
          w="100%"
          bg="rgba(255,255,255,0.03)"
          backdropFilter="blur(16px)"
          border="1px solid"
          borderColor="rgba(255,255,255,0.1)"
          borderRadius="2xl"
          px={8}
          py={10}
          boxShadow="0 25px 50px rgba(0,0,0,0.4)"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <Stack gap={6}>
              <Field.Root>
                <Field.Label fontSize="sm" fontWeight="600" color="gray.200" mb={2}>
                  Email Address
                </Field.Label>
                <Input
                  {...register('emailId', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  type="email"
                  size="lg"
                  bg="rgba(255,255,255,0.05)"
                  borderColor="rgba(255,255,255,0.1)"
                  color="white"
                  placeholder="you@example.com"
                  _placeholder={{ color: 'gray.500' }}
                  _focus={{
                    borderColor: 'blue.400',
                    boxShadow: '0 0 0 3px rgba(96,165,250,0.1)',
                  }}
                  _hover={{ borderColor: 'rgba(255,255,255,0.2)' }}
                />
              </Field.Root>

              <Field.Root>
                <Field.Label fontSize="sm" fontWeight="600" color="gray.200" mb={2}>
                  Password
                </Field.Label>
                <PasswordInput
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  size="lg"
                  bg="rgba(255,255,255,0.05)"
                  borderColor="rgba(255,255,255,0.1)"
                  color="white"
                  placeholder="••••••••"
                  _placeholder={{ color: 'gray.500' }}
                  _focus={{
                    borderColor: 'blue.400',
                    boxShadow: '0 0 0 3px rgba(96,165,250,0.1)',
                  }}
                  _hover={{ borderColor: 'rgba(255,255,255,0.2)' }}
                />
              </Field.Root>

              <Flex justify="flex-end">
                <Link
                  fontSize="xs"
                  fontWeight="500"
                  color="blue.300"
                  _hover={{ color: 'blue.200' }}
                >
                  Forgot password?
                </Link>
              </Flex>

              <MotionBox
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Button
                  type="submit"
                  size="lg"
                  w="100%"
                  fontWeight="600"
                  borderRadius="xl"
                  bg="linear-gradient(135deg, #60a5fa 0%, #34d399 100%)"
                  color="white"
                  _hover={{
                    opacity: 0.9,
                  }}
                  _active={{ transform: 'scale(0.98)' }}
                >
                  Sign In
                </Button>
              </MotionBox>
            </Stack>
          </form>
        </MotionBox>

        {/* Footer */}
        <Text mt={8} fontSize="xs" color="gray.500" textAlign="center">
          By signing in, you agree to our{' '}
          <Link color="blue.300" fontSize="xs">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link color="blue.300" fontSize="xs">
            Privacy Policy
          </Link>
        </Text>
      </MotionFlex>
    </MotionFlex>
  )
}

export default Login
