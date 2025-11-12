import {
  Box,
  Spinner,
  Center,
  Button,
  Input,
  Stack,
  Link,
  Field,
  Heading,
  Flex,
  defineStyle,
} from "@chakra-ui/react";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { API } from "@/apiCall/api.ts";
import { useNavigate } from "react-router-dom";
import "@/styles/loginForm.css";
import { useState } from "react";
import { ToasterUtil, Toaster } from "@/components/ToasterUtil.tsx";
import { motion } from "framer-motion";

const MotionPath = motion.path;

interface FormValues {
  emailId: String;
  password: String;
}

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toastFunc = ToasterUtil();

  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (creds: any) => {
    setLoading(true);
    try {
      const { data } = await API.post("auth/login", creds);
      if (data.statusCode === 200) {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/dashboard");
        console.log(`Logged In Successfully!!.`);
      }
    } catch (error: any) {
      console.error("Login error:", error.message);
      toastFunc(`Invalid credentials. Please try again.`, `error`);
    } finally {
      setLoading(false);
    }
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    Object.values(errors).forEach((error) => {
      toastFunc(error?.message || "Fill the required fields", "error");
    });
  };

  const floatingStyles = defineStyle({
    pos: "absolute",
    bg: "bg",
    px: "0.5",
    top: "-3",
    insetStart: "2",
    bgColor: "transparent",
    fontWeight: "normal",
    pointerEvents: "none",
    transition: "position",
    fontSize: "lg",
    _peerPlaceholderShown: {
      color: "gray.500",
      top: "2.5",
      insetStart: "3",
    },
    _peerFocusVisible: {
      color: "teal.500",
      top: "-6",
      insetStart: "2",
    },
  });

  return (
    <>
      {loading && (
        <Box pos="absolute" inset="0" bg="whiteAlpha.600" zIndex={1000}>
          <Center h="full">
            <Spinner color="teal.500" size="xl" />
          </Center>
        </Box>
      )}
      {/* Svg 1 */}
      <Box
        pos="absolute"
        bgColor="white"
        zIndex={-10}
        width="100vw"
        height={{ base: "60vh", md: "75vh", lg: "100vh" }}
        pointerEvents="none"
        bottom={0}
      >
        <svg
          width="100%"
          height="100%"
          id="svg1"
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="gradient2" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="5%" stop-color="#0693e3"></stop>
              <stop offset="95%" stop-color="#8ED1FC"></stop>
            </linearGradient>
            <linearGradient id="gradient1" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="5%" stop-color="#0693e3"></stop>
              <stop offset="95%" stop-color="#8ED1FC"></stop>
            </linearGradient>
          </defs>
          <MotionPath
            d="M 0,600 L 0,150 C 101.77,100.27 203.54,50.54 302,75 C 400.46,99.46 495.61,198.12 582,224 C 668.39,249.88 746.03,202.97 849,189 C 951.97,175.03 1080.28,194.01 1183,193 C 1285.72,191.99 1362.86,170.99 1440,150 L 1440,600 L 0,600 Z"
            stroke="none"
            strokeWidth="0"
            fill="url(#gradient2)"
            initial={{ opacity: 0.5, y: 10 }}
            animate={{
              opacity: [0.5, 0.7, 0.5],
              y: [5, -5, 5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
          <MotionPath
            d="M 0,600 L 0,350 C 105.78,342.8 211.56,335.61 313,339 C 414.44,342.39 511.54,356.37 587,337 C 662.46,317.63 716.28,264.9 822,283 C 927.72,301.1 1085.35,390.03 1197,413 C 1308.65,435.97 1374.33,392.99 1440,350 L 1440,600 L 0,600 Z"
            stroke="none"
            strokeWidth="0"
            fill="url(#gradient1)"
            initial={{ opacity: 0.8, y: 15 }}
            animate={{
              opacity: [0.8, 0.6, 0.8],
              y: [3, -3, 3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        </svg>
      </Box>
      {/* Svg 2 */}
      <Box
        pos="absolute"
        bg="transparent"
        zIndex={10}
        width="100vw"
        height={{ base: "35vh", md: "40vh", lg: "50vh" }}
        bottom={0}
        pointerEvents="none"
      >
        <svg
          width="100%"
          height="100%"
          id="svg2"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="gradient" x1="44%" y1="0%" x2="56%" y2="100%">
              <stop offset="5%" stop-color="#8ED1FC"></stop>
              <stop offset="95%" stop-color="#0693e3"></stop>
            </linearGradient>
          </defs>
          <path
            d="M 0,400 L 0,150 C 97.71428571428572,136.75 195.42857142857144,123.5 330,143 C 464.57142857142856,162.5 636.0000000000001,214.75 757,201 C 877.9999999999999,187.25 948.5714285714284,107.5 1054,88 C 1159.4285714285716,68.5 1299.7142857142858,109.25 1440,150 L 1440,400 L 0,400 Z"
            stroke="none"
            strokeWidth="0"
            fill="url(#gradient)"
            fillOpacity="0.9"
          ></path>
        </svg>
      </Box>

      <Flex
        width="100vw"
        height="100vh"
        alignItems="center"
        justifyContent="center"
        zIndex={1}
        pointerEvents="auto"
      >
        <Flex
          width={{ base: "85%", lg: "30%", md: "40%", sm: "65%" }}
          direction="column"
          justifyContent="center"
          alignItems="center"
          bgColor="whiteAlpha.800"
          backdropFilter="blur(1px)"
          p={8}
          borderRadius="lg"
          boxShadow="xl"
        >
          <Flex justifyContent="center" alignItems="center" width="100%" mb={6}>
            <Heading
              size="5xl"
              textAlign="center"
              fontWeight="medium"
              color="teal.400"
              letterSpacing="widest"
              mb={8}
            >
              LOGIN
            </Heading>
          </Flex>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="login-form"
          >
            <Stack align="center" width="100%" justify="center" gap={4}>
              <Field.Root width="100%" mb={6}>
                <Box pos="relative" w="full">
                  <Input
                    {...register("emailId", {
                      required: "Email Id is required",
                    })}
                    variant="outline"
                    placeholder=""
                    className="peer"
                    size="lg"
                    value={"kaushal@gmail.com"}
                    color="gray.800"
                    bgColor="gray.200"
                    borderColor="teal.300"
                    _focus={{ outlineColor: "teal.500" }}
                  />
                  <Field.Label css={floatingStyles} color="teal.400">
                    Email
                  </Field.Label>
                </Box>
              </Field.Root>

              <Field.Root width="100%" mb={6}>
                <Box pos="relative" w="full">
                  <Input
                    {...register("password", {
                      required: "Password is required",
                    })}
                    type="password"
                    variant="outline"
                    placeholder=""
                    size="lg"
                    className="peer"
                    value={"Gautam@123"}
                    color="gray.800"
                    bgColor="gray.200"
                    borderColor="teal.300"
                    _focus={{ outlineColor: "teal.500" }}
                  />
                  <Field.Label css={floatingStyles} color="teal.400">
                    Password
                  </Field.Label>
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
                  bgColor: "#3391FF",
                }}
                transition="all 0.3s ease-in-out"
                fontSize="xl"
                borderRadius="full"
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
            _hover={{ color: "teal.700" }}
          >
            Forgot password?
          </Link>
        </Flex>
      </Flex>

      <Toaster />
    </>
  );
};

export default Login;
