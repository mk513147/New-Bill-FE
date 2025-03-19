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
  Text,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { API } from "@/apiCall/api.ts";
import { useNavigate } from "react-router-dom";
import { PasswordInput } from "@/components/ui/password-input";
import "@/styles/loginForm.css";
import { useState } from "react";

import { ToasterUtil, Toaster } from "@/components/ToasterUtil.tsx";

interface FormValues {
  emailId: String;
  password: String;
}

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toastFunc = ToasterUtil();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

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

  if (loading)
    return (
      <Box pos="absolute" inset="0" bg="bg/80" zIndex={10}>
        <Center h="full">
          <Spinner color="teal.500" />
        </Center>
      </Box>
    );

  return (
    <>
      <Flex
        width="100vw"
        height="100vh"
        alignItems="end"
        justifyContent="center"
        bgImage="url('/images/wave2.svg')"
        bgSize="cover"
      >
        <Flex
          direction="column"
          alignItems="end"
          backgroundColor="black"
          borderWidth={"1px"}
          borderColor={"black"}
          height={"75%"}
          width={"35%"}
          borderRadius={"20px 20px 0px 0px"}
          justifyContent={"space-evenly"}
        >
          <Flex
            justifyContent="center"
            alignItems="start"
            mb={12}
            flexDir={"column"}
            gap={2}
            ml={5}
            w={"90%"}
            mt={5}
          >
            <Text fontSize={"30px"} fontWeight={"700"} color={"#1F51FF"}>
              SignIn
            </Text>
            <Text fontSize={"16px"} fontWeight={"500"}>
              Hello, welcome back to your account
            </Text>
          </Flex>
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <Stack align="center" width="80%" justify="center" gap={4}>
              <Field.Root invalid={!!errors.emailId}>
                <Input
                  {...register("emailId", {
                    required: "Email Id is required",
                  })}
                  variant="outline"
                  placeholder="Email"
                  size="lg"
                  borderColor="#1F51FF"
                />
                <Field.ErrorText>{errors.emailId?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.password}>
                <PasswordInput
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type="password"
                  variant="outline"
                  placeholder="Password"
                  size="lg"
                  borderColor="#1F51FF"
                />
                <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
              </Field.Root>
              <Button type="submit" w="full" colorPalette={"blue"}>
                LOGIN
              </Button>
            </Stack>
          </form>
          <Flex
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            w={"full"}
          >
            <Flex justifyContent={"center"} w={"full"} alignItems={"center"}>
              <Button
                background={"transparent"}
                color={"white"}
                width="70%"
                mt={2}
                fontSize="sm"
                textAlign={"center"}
              >
                Forgot password
              </Button>
            </Flex>
            <Flex justifyContent={"center"} w={"full"} alignItems={"center"}>
              <Button
                background={"transparent"}
                color={"white"}
                width="70%"
                fontSize="sm"
                textAlign={"center"}
              >
                New to EBill ? Sign Up Now!
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Toaster />
    </>
  );
};

export default Login;
