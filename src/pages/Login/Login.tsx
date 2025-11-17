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
} from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";

import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import "@/styles/loginForm.css";
import { useEffect } from "react";
import { ToasterUtil, Toaster } from "@/components/ToasterUtil.tsx";
import logo from "@/assets/logo.png";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { loginUser } from "@/features/auth/authSlice";

interface FormValues {
  emailId: String;
  password: String;
}

const Login = () => {
	const toastFunc = ToasterUtil();

	const { register, handleSubmit } = useForm<FormValues>();
	const dispatch = useAppDispatch();
	const { loading, error } = useAppSelector((state) => state.auth);

	const onSubmit: SubmitHandler<FormValues> = async (creds: any) => {
		dispatch(loginUser(creds));
	};

  const onError = (errors: FieldErrors<FormValues>) => {
    Object.values(errors).forEach((error) => {
      toastFunc(error?.message || "Fill the required fields", "error");
    });
  };

	useEffect(() => {
		if (error) {
			toastFunc(error, "error");
		}
	}, [error]);

	return (
		<>
			{loading && (
				<Box pos="absolute" inset="0" bg="whiteAlpha.600" zIndex={1000}>
					<Center h="full">
						<Spinner color="teal.500" size="xl" />
					</Center>
				</Box>
			)}
			<Flex width={"100vw"} height={"100vh"} bgColor="white">
				<Flex
					width={"45%"}
					height={"100%"}
					bgColor="#0074E4"
					alignItems={"center"}
					justifyContent={"center"}
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
						width={{ base: "85%", md: "60%" }}
						direction="column"
						justifyContent="center"
						alignItems="center"
						bgColor="whiteAlpha.800"
						backdropFilter="blur(1px)"
						p={8}
					>
						<Flex
							direction="column"
							justifyContent="flex-start"
							width="100%"
							mb={8}
						>
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
						<form
							onSubmit={handleSubmit(onSubmit, onError)}
							className="login-form"
						>
							<Stack align="center" width="100%" justify="center" gap={3}>
								<Field.Root width="100%" mb={6}>
									<Box pos="relative" w="full">
										<Field.Label color="gray.500" fontSize="lg" mb={1}>
											Email
										</Field.Label>
										<Input
											{...register("emailId", {
												required: "Email Id is required",
											})}
											variant="outline"
											placeholder=""
											className="peer"
											size="lg"
											color="gray.800"
											bgColor="gray.200"
											borderColor="teal.300"
											_focus={{ outlineColor: "teal.500" }}
										/>
									</Box>
								</Field.Root>

								<Field.Root width="100%" mb={6}>
									<Box pos="relative" w="full">
										<Field.Label color="gray.500" fontSize="lg" mb={1}>
											Password
										</Field.Label>
										<PasswordInput
											{...register("password", {
												required: "Password is required",
											})}
											variant="outline"
											placeholder=""
											size="lg"
											className="peer"
											color="gray.800"
											bgColor="gray.200"
											borderColor="teal.300"
											_focus={{ outlineColor: "teal.500" }}
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
										bgColor: "#3391FF",
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
							_hover={{ color: "teal.700" }}
						>
							Forgot password?
						</Link>
					</Flex>
				</Flex>
			</Flex>

      <Toaster />
    </>
  );
};

export default Login;
