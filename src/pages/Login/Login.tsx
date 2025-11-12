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
			<Flex width={"100vw"} height={"100vh"} bgColor="white">
				<Flex
					width={"45%"}
					height={"100%"}
					bgColor="blue.500"
					roundedRight="xl"
				></Flex>
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
						borderRadius="lg"
						boxShadow="xl"
					>
						<Flex
							justifyContent="center"
							alignItems="center"
							width="100%"
							mb={6}
						>
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
			</Flex>

			<Toaster />
		</>
	);
};

export default Login;
