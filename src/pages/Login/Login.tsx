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
import dash from '@/assets/Dash-Image.jpg'
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
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('eb_logged_in', 'true')

        dispatch(setProfile(res.data.data.data))
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
    <>
      {!isLarge ? (
        <Flex w="100%" h="100vh" justify="center" align="center" bg="white">
          <Flex w="100%" maxW="450px" h="100%" direction="column" position="relative" bg="white">
            <Box
              w="100%"
              h="320px"
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

              <Box position="relative" zIndex={3} mt={5} top={'40%'}>
                <Heading fontSize="44px" fontWeight="bold" color="white">
                  Hello!
                </Heading>
                <Text fontSize="lg" color="white" mt={3}>
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
              <Heading fontSize="28px" fontWeight="semibold" color="blue.700">
                Login
              </Heading>

              <Box w="100%" mt={6} maxW="350px">
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                  <Stack gap={5} w="100%">
                    <Field.Root w="100%">
                      <Field.Label color="gray.700" fontSize="sm" mb={1} fontWeight="medium">
                        Email
                      </Field.Label>

                      <Input
                        {...register('emailId', { required: 'Email Id is required' })}
                        size="lg"
                        bg="white"
                        border="1px solid"
                        borderColor="gray.300"
                        color="gray.800"
                        borderRadius="full"
                        _focus={{ borderColor: 'blue.500', bg: 'white' }}
                      />
                    </Field.Root>

                    <Field.Root w="100%">
                      <Field.Label color="gray.700" fontSize="sm" mb={1} fontWeight="medium">
                        Password
                      </Field.Label>

                      <PasswordInput
                        {...register('password', { required: 'Password is required' })}
                        size="lg"
                        bg="white"
                        border="1px solid"
                        borderColor="gray.300"
                        color="gray.800"
                        borderRadius="full"
                        _focus={{ borderColor: 'blue.500', bg: 'white' }}
                      />
                    </Field.Root>

                    <Flex justify="flex-end" mt={-2}>
                      <Link
                        fontSize="sm"
                        color="blue.600"
                        _hover={{ textDecoration: 'underline', color: 'blue.700' }}
                      >
                        Forgot Your Password?
                      </Link>
                    </Flex>

                    <Button
                      type="submit"
                      w="100%"
                      size="lg"
                      bg="blue.600"
                      color="white"
                      borderRadius="full"
                      fontSize="lg"
                      mt={2}
                      _hover={{ bg: 'blue.700' }}
                    >
                      Log In
                    </Button>
                  </Stack>
                </form>
              </Box>
            </Box>
          </Flex>
        </Flex>
      ) : (
        <Flex w="100vw" h="100vh" bg="white">
          <Flex
            w={{ base: '100%', md: '50%' }}
            h="100%"
            direction="column"
            justify="center"
            align="center"
            px={{ base: 6, md: 16 }}
            position="relative"
          >
            <HStack position="absolute" top="40px" left={{ base: '20px', md: '40px' }} gap={2}>
              <Image src={logo} w="34px" h="34px" alt="Logo" />
              <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                Ebill
              </Text>
            </HStack>

            <Box w="100%" textAlign="center" mt={{ base: 20, md: 0 }} mb={8}>
              <Heading fontSize="5xl" fontWeight="semibold" color="gray.800">
                Welcome Back
              </Heading>

              <Text mt={6} fontSize="md" color="gray.500">
                Enter your email and password to access your account.
              </Text>
            </Box>

            <Box w="100%" maxW="420px">
              <form onSubmit={handleSubmit(onSubmit, onError)}>
                <Stack gap={5} w="100%">
                  <Field.Root w="100%">
                    <Field.Label color="gray.700" fontSize="sm" mb={1} fontWeight="medium">
                      Email
                    </Field.Label>

                    <Input
                      {...register('emailId', { required: 'Email Id is required' })}
                      size="lg"
                      bg="white"
                      border="1px solid"
                      borderColor="gray.300"
                      color="gray.800"
                      borderRadius="md"
                      _focus={{ borderColor: 'blue.500', bg: 'white' }}
                    />
                  </Field.Root>

                  <Field.Root w="100%">
                    <Field.Label color="gray.700" fontSize="sm" mb={1} fontWeight="medium">
                      Password
                    </Field.Label>

                    <PasswordInput
                      {...register('password', { required: 'Password is required' })}
                      size="lg"
                      bg="white"
                      border="1px solid"
                      borderColor="gray.300"
                      color="gray.800"
                      borderRadius="md"
                      _focus={{ borderColor: 'blue.500', bg: 'white' }}
                    />
                  </Field.Root>

                  <Flex justify="flex-end" mt={-2}>
                    <Link
                      fontSize="sm"
                      color="blue.600"
                      _hover={{ textDecoration: 'underline', color: 'blue.700' }}
                    >
                      Forgot Your Password?
                    </Link>
                  </Flex>

                  <Button
                    type="submit"
                    w="100%"
                    size="lg"
                    bg="blue.600"
                    color="white"
                    borderRadius="md"
                    fontSize="lg"
                    mt={2}
                    _hover={{ bg: 'blue.700' }}
                  >
                    Log In
                  </Button>
                </Stack>
              </form>
            </Box>
          </Flex>

          <Flex
            display={{ base: 'none', md: 'flex' }}
            w="50%"
            h="100%"
            justify="center"
            align="center"
            borderLeftRadius="2xl"
            overflow="hidden"
            direction="column"
            bgGradient="linear-gradient(110deg, #3b5cff 10%, #5f6bff 90%)"
            position="relative"
          >
            <Box w="100%" display="flex" flexDirection="column" alignItems="center" pt="90px">
              <Box
                color="white"
                textAlign="left"
                maxW="600px"
                pl={{ base: 6, md: 6, sm: 4, lg: 8 }}
                mb={12}
              >
                <Heading fontSize="4xl" fontWeight="light" letterSpacing="wide" lineHeight="1.2">
                  Effortlessly manage your inventory and stock operations.
                </Heading>

                <Text
                  mt={5}
                  fontSize="lg"
                  opacity={0.9}
                  fontWeight="light"
                  letterSpacing="wide"
                  lineHeight="1.6"
                  maxW="600px"
                >
                  Log in to access your inventory dashboard and streamline your warehouse
                  management.
                </Text>
              </Box>

              <Box position="relative" display="flex" justifyContent="center" w="100%">
                <Image
                  src={login}
                  alt="Login Illustration"
                  width="75%"
                  position={'relative'}
                  left={0}
                  borderRadius="lg"
                  zIndex={1}
                />

                <Image
                  src={dash}
                  alt="Dashboard Overlay"
                  position="absolute"
                  right="5%"
                  top="28%"
                  width="40%"
                  shadow="lg"
                  borderRadius="xl"
                  zIndex={5}
                />
              </Box>
            </Box>
          </Flex>
        </Flex>
      )}
    </>
  )
}

export default Login
