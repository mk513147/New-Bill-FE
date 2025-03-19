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
				alignItems="center"
				justifyContent="center"
				backgroundGradient="to-b"
				gradientFrom="#2e026d"
				gradientVia="#000000"
				gradientTo="#000000"
			>
				<Flex
					width="30%"
					direction="column"
					justifyContent="center"
					alignItems="center"
					color="white"
				>
					<Flex
						justifyContent="center"
						alignItems="center"
						width="100%"
						mb={12}
					>
						<Heading
							size={{ md: "6xl", sm: "4xl" }}
							textAlign="center"
							fontWeight="normal"
							lineHeight="shorter"
							letterSpacing="wider"
						>
							LOGIN
						</Heading>
					</Flex>
					<form onSubmit={handleSubmit(onSubmit)} className="login-form">
						<Stack align="center" width="70%" justify="center" gap={4}>
							<Field.Root invalid={!!errors.emailId}>
								<Field.Label fontSize="md" fontWeight="normal">
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
								<Field.Label fontSize="md" fontWeight="normal">
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
								backgroundGradient="to-b"
								gradientFrom="#2e026d"
								gradientVia="#000000"
								gradientTo="#2e026d"
								color="white"
								variant="outline"
								mt={4}
								w="full"
								_hover={{
									gradientFrom: "#000000",
									gradientVia: "#2e026d",
									gradientTo: "#000000",
								}}
								transition="backgrounds"
								transitionDuration="slow"
								transitionTimingFunction="ease-in-out"
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
			</Flex>

			<Toaster />
		</>
	);
};

export default Login;
