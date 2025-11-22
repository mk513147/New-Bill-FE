import { Box, Button, Input, Stack, Link, Heading, Flex, Field } from '@chakra-ui/react'
import { PasswordInput } from '@/components/ui/password-input'
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form'
import '@/styles/loginForm.css'
import { useState } from 'react'
import logo from '@/assets/logo.png'
import { ToasterUtil } from '@/components/ToasterUtil.tsx'
import { API } from '@/Api/api'
import { useNavigate } from 'react-router-dom'
import { setProfile } from '@/Redux/Slices/profileSlice'
import { useDispatch } from 'react-redux'
import { AxiosError } from 'axios'
import API_ENDPOINTS from '@/Api/apiEndpoints'
import Loading from '@/components/Loading'

interface FormValues {
  emailId: string
  password: string
}

const Login = () => {
  const toastFunc = ToasterUtil()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = async (creds) => {
    setLoading(true)

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
      setLoading(false)
    }
  }

  const onError = (errors: FieldErrors<FormValues>) => {
    Object.values(errors).forEach((err) => {
      toastFunc(err?.message || 'Fill the required fields', 'error')
    })
  }

  return (
    <>
      {loading && <Loading />}
      <Flex width={'100vw'} height={'100vh'} bgColor="white">
        <Flex
          width={'45%'}
          height={'100%'}
          bgColor="#0074E4"
          alignItems={'center'}
          justifyContent={'center'}
          roundedRight="xl"
        >
          <img src={logo} alt="Logo" height="450px" width="450px" />
        </Flex>
        <Flex
          width="55%"
          height="100%"
          alignItems="center"
          justifyContent="center"
          zIndex={1}
          pointerEvents="auto"
        >
          <Flex
            width={{ base: '85%', md: '60%' }}
            direction="column"
            justifyContent="center"
            alignItems="center"
            bgColor="whiteAlpha.800"
            backdropFilter="blur(1px)"
            p={8}
          >
            <Flex direction="column" justifyContent="flex-start" width="100%" mb={8}>
              <Heading
                size="5xl"
                textAlign="left"
                fontWeight="medium"
                color="gray.700"
                letterSpacing="wide"
                mb={4}
              >
                Welcome Back
              </Heading>
              <Heading size="xl" color="gray.600">
                Welcome back! Please enter your details.
              </Heading>
            </Flex>
            <form onSubmit={handleSubmit(onSubmit, onError)} className="login-form">
              <Stack align="center" width="100%" justify="center" gap={3}>
                <Field.Root width="100%" mb={6}>
                  <Box pos="relative" w="full">
                    <Field.Label color="gray.500" fontSize="lg" mb={1}>
                      Email
                    </Field.Label>
                    <Input
                      {...register('emailId', {
                        required: 'Email Id is required',
                      })}
                      variant="outline"
                      placeholder=""
                      className="peer"
                      size="lg"
                      color="gray.800"
                      bgColor="gray.200"
                      borderColor="teal.300"
                      _focus={{ outlineColor: 'teal.500' }}
                      value={'kaushal@gmail.com'}
                    />
                  </Box>
                </Field.Root>

                <Field.Root width="100%" mb={6}>
                  <Box pos="relative" w="full">
                    <Field.Label color="gray.500" fontSize="lg" mb={1}>
                      Password
                    </Field.Label>
                    <PasswordInput
                      {...register('password', {
                        required: 'Password is required',
                      })}
                      variant="outline"
                      placeholder=""
                      size="lg"
                      className="peer"
                      color="gray.800"
                      bgColor="gray.200"
                      borderColor="teal.300"
                      _focus={{ outlineColor: 'teal.500' }}
                      value={'Gautam@123'}
                    />
                  </Box>
                </Field.Root>

                <Button
                  type="submit"
                  bgColor="#0074E4"
                  variant="solid"
                  color="white"
                  mt={4}
                  w="full"
                  _hover={{
                    bgColor: '#3391FF',
                  }}
                  transition="all 0.3s ease-in-out"
                  fontSize="xl"
                  borderRadius="lg"
                  letterSpacing="widest"
                >
                  LOGIN
                </Button>
              </Stack>
            </form>
            <Link
              mt={4}
              color="teal.800"
              // onClick={() => navigate("/forgot-password")}
              fontSize="sm"
              textDecoration="underline"
              _hover={{ color: 'teal.700' }}
            >
              Forgot password?
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default Login
