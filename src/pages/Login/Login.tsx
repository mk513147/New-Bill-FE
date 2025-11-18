import {
	Box,
	Spinner,
	Center,
	Button,
	Input,
	Stack,
	Link,
	Heading,
	Flex,
	Text,
	IconButton,
	InputGroup,
	InputRightElement,
} from "@chakra-ui/react";

import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import "@/styles/loginForm.css";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import { motion } from "framer-motion";
import { useCustomToast } from "@/components/useCustomToast";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import { API } from "@/Api/api";
import { useNavigate } from "react-router-dom";
import { setProfile } from "@/Redux/Slices/profileSlice";
import { useDispatch } from "react-redux";
import API_ENDPOINTS from "@/Api/apiEndpoints";

interface FormValues {
	emailId: string;
	password: string;
}

const Login = () => {
	const showToast = useCustomToast();
	const [show, setShow] = useState(false);
	const navigate = useNavigate();
	const MotionFlex = motion.create(Flex);
	const MotionButton = motion.create(Button);
	const dispatch = useDispatch();
	const { register, handleSubmit } = useForm<FormValues>();

	const onSubmit: SubmitHandler<FormValues> = async (creds) => {
		try {
			const res = await API.post(API_ENDPOINTS.AUTH.SIGNIN, creds);

			if (res.status === 200) {
				localStorage.setItem("token", res.data.token);
				localStorage.setItem("eb_logged_in", "true");
				console.log("Login response data:", res);

				dispatch(setProfile(res.data.data.data));

				showToast({
					status: "success",
					title: "Login Successful",
				});

				navigate("/dashboard");
				return;
			}

			showToast({
				status: "error",
				title: "Login Failed",
				description: res.data?.message || "Invalid credentials",
			});
		} catch (err: any) {
			showToast({
				status: "error",
				title: "Login Failed",
				description: err.response?.data?.message || "Something went wrong",
			});
		}
	};

	const onError = (errors: FieldErrors<FormValues>) => {
		Object.values(errors).forEach((err) => {
			showToast({
				status: "error",
				title: "Validation Error",
				description: err?.message || "Fill the required fields",
			});
		});
	};

	return (
		<>
			<MotionFlex
				width="100vw"
				height="100vh"
				background="linear-gradient(135deg, #0074E4 0%, #00C2FF 100%)"
				align="center"
				justify="center"
				p={4}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.6 }}
			>
				<Flex
					width={{ base: "95%", md: "80%", lg: "70%" }}
					height={{ base: "auto", md: "80%" }}
					rounded="2xl"
					overflow="hidden"
					boxShadow="2xl"
					bg="whiteAlpha.200"
					backdropFilter="blur(18px)"
					border="1px solid rgba(255,255,255,0.2)"
					direction={{ base: "column", md: "row" }}
				>
					<Flex
						flex={1}
						bg="rgba(255,255,255,0.1)"
						align="center"
						justify="center"
						p={6}
					>
						<img
							src={logo}
							alt="Logo"
							style={{ width: "65%", maxWidth: "350px" }}
						/>
					</Flex>

					{/* RIGHT SIDE (FORM) */}
					<Flex flex={1} align="center" justify="center" p={10}>
						<Flex width="100%" maxW="420px" direction="column">
							<Heading
								size="2xl"
								color="white"
								fontWeight="semibold"
								mb={2}
								letterSpacing="wide"
							>
								Welcome Back 👋
							</Heading>

							<Text color="whiteAlpha.800" fontSize="lg" mb={10}>
								Please enter your login credentials
							</Text>

							{/* FORM */}
							<form
								onSubmit={handleSubmit(onSubmit, onError)}
								style={{ width: "100%" }}
							>
								<Stack spacing={6}>
									{/* Email */}
									<Box>
										<Text color="whiteAlpha.800" mb={2} fontWeight="medium">
											Email
										</Text>
										<Input
											{...register("emailId", {
												required: "Email is required",
												pattern: {
													value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
													message: "Enter a valid email",
												},
											})}
											size="lg"
											bg="white"
											borderRadius="lg"
											value={"kaushal@gmail.com"}
										/>
									</Box>

									{/* Password */}
									<Box>
										<Text color="whiteAlpha.800" mb={2} fontWeight="medium">
											Password
										</Text>

										<InputGroup>
											<Input
												type={show ? "text" : "password"}
												{...register("password", {
													required: "Password is required",
												})}
												size="lg"
												bg="white"
												borderRadius="lg"
												value={"Gautam@123"}
											/>

											<InputRightElement>
												<IconButton
													aria-label={show ? "Hide password" : "Show password"}
													icon={show ? <ViewOffIcon /> : <ViewIcon />}
													size="sm"
													variant="ghost"
													onClick={() => setShow(!show)}
												/>
											</InputRightElement>
										</InputGroup>
									</Box>

									{/* Submit */}
									<MotionButton
										type="submit"
										size="lg"
										bg="#0074E4"
										color="white"
										rounded="lg"
										fontSize="xl"
										py={7}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.97 }}
										transition={{ duration: 0.2 }}
										_hover={{ bg: "#0066c5" }}
									>
										LOGIN
									</MotionButton>
								</Stack>
							</form>

							{/* Forgot Password */}
							<Link
								mt={6}
								color="whiteAlpha.900"
								fontSize="md"
								textAlign="center"
								textDecoration="underline"
								_hover={{ color: "white" }}
							>
								Forgot password?
							</Link>
						</Flex>
					</Flex>
				</Flex>
			</MotionFlex>
		</>
	);
};

export default Login;
