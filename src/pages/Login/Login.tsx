import {
	Box,
	Spinner,
	Center,
	Button,
	Input,
	Stack,
	Image,
	Link,
	Field,
	Heading,
	Flex,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { API } from "@/apiCall/api.ts";
import { useNavigate } from "react-router-dom";
import { PasswordInput } from "@/components/ui/password-input";
import "@/styles/loginForm.css";
import { useState } from "react";

import { ToasterUtil, Toaster } from "@/components/ToasterUtil.tsx";
import loginImage from "@/assets/login_illustration.jpeg";

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

	return (
		<>
			{loading && (
				<Box pos="absolute" inset="0" bg="bg/80" zIndex={10}>
					<Center h="full">
						<Spinner color="teal.500" />
					</Center>
				</Box>
			)}
			<Flex
				width="100vw"
				height="100vh"
				// backgroundColor="black"
				backgroundGradient="to-b"
				gradientFrom="#2e026d"
				gradientVia="#000000"
				gradientTo="black"
				alignItems="center"
				justifyContent="center"
			>
				<Flex width="full" height="full" overflow="hidden">
					{/* Left Section - Form */}
					<Flex
						width="50%"
						direction="column"
						justifyContent="center"
						alignItems="center"
						color="white"
					>
						<Flex justifyContent="center" alignItems="center" width="100%">
							<Heading
								size={{ md: "6xl", lg: "6xl", sm: "4xl" }}
								textAlign="left"
								width="70%"
								fontWeight="normal"
								lineHeight="shorter"
								letterSpacing="wider"
							>
								NEW BILL
							</Heading>
						</Flex>
						<form onSubmit={handleSubmit(onSubmit)} className="login-form">
							<Stack
								align="center"
								width="70%"
								height="sm"
								justify="center"
								gap={10}
								borderBottomWidth="1px"
								borderBottomColor="gray.500"
								mt={10}
							>
								<Field.Root invalid={!!errors.emailId}>
									<Field.Label fontSize="lg" fontWeight="normal">
										Email :
									</Field.Label>
									<Input
										{...register("emailId", {
											required: "Email Id is required",
										})}
										variant="outline"
										placeholder="Email"
										size="lg"
										borderColor="gray.600"
									/>
									<Field.ErrorText>{errors.emailId?.message}</Field.ErrorText>
								</Field.Root>

								<Field.Root invalid={!!errors.password}>
									<Field.Label fontSize="lg" fontWeight="normal">
										Password :
									</Field.Label>
									<PasswordInput
										{...register("password", {
											required: "Password is required",
										})}
										type="password"
										variant="outline"
										placeholder="Password"
										size="lg"
										borderColor="gray.600"
									/>
									<Field.ErrorText>{errors.password?.message}</Field.ErrorText>
								</Field.Root>
								<Button
									type="submit"
									bgColor="#65D68F"
									color="white"
									mt={8}
									w="full"
									_hover={{ bgColor: "#4FBC77" }}
									letterSpacing="widest"
									fontSize="xl"
								>
									LOGIN
								</Button>
							</Stack>
						</form>
						<Link
							mt={2}
							color="gray.400"
							fontSize="sm"
							textAlign="left"
							textDecoration="underline"
							position="relative"
						>
							Forgot password
						</Link>
					</Flex>

					{/* Right Section - Image */}
					<Box
						width="50%"
						backgroundColor="#black"
						display="flex"
						alignItems="center"
						justifyContent="center"
						p={15}
					>
						<Image
							src={loginImage}
							alt="Login Illustration"
							objectFit="cover"
							width="90%"
							height="90%"
							borderRadius="lg"
						/>
					</Box>
				</Flex>
			</Flex>

			<Toaster />
		</>
	);
};

export default Login;
