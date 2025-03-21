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
				<Box pos="absolute" inset="0" bg="whiteAlpha.700" zIndex={1000}>
					<Center h="full">
						<Spinner color="teal.500" size="xl" />
					</Center>
				</Box>
			)}
			{/* Svg 1 */}
			<Box
				pos="absolute"
				bg="transparent"
				zIndex={-10}
				width="100vw"
				height="100vh"
			>
				<svg
					width="100%"
					height="100%"
					id="svg1"
					viewBox="0 0 1440 600"
					preserveAspectRatio="none"
					xmlns="http://www.w3.org/2000/svg"
					className="transition duration-300 ease-in-out delay-150"
				>
					<defs>
						<linearGradient id="gradient2" x1="0%" y1="50%" x2="100%" y2="50%">
							<stop offset="5%" stop-color="#0693e3"></stop>
							<stop offset="95%" stop-color="#8ED1FC"></stop>
						</linearGradient>
					</defs>
					<path
						d="M 0,600 L 0,150 C 101.77033492822966,100.26794258373205 203.54066985645932,50.5358851674641 302,75 C 400.4593301435407,99.4641148325359 495.6076555023925,198.12440191387563 582,224 C 668.3923444976075,249.87559808612437 746.0287081339712,202.96650717703352 849,189 C 951.9712918660288,175.03349282296648 1080.2775119617227,194.0095693779904 1183,193 C 1285.7224880382773,191.9904306220096 1362.8612440191387,170.9952153110048 1440,150 L 1440,600 L 0,600 Z"
						stroke="none"
						stroke-width="0"
						fill="url(#gradient2)"
						fill-opacity="0.53"
					></path>
					<defs>
						<linearGradient id="gradient1" x1="0%" y1="50%" x2="100%" y2="50%">
							<stop offset="5%" stop-color="#0693e3"></stop>
							<stop offset="95%" stop-color="#8ED1FC"></stop>
						</linearGradient>
					</defs>
					<path
						d="M 0,600 L 0,350 C 105.77990430622009,342.8038277511962 211.55980861244018,335.60765550239233 313,339 C 414.4401913875598,342.39234449760767 511.5406698564593,356.3732057416268 587,337 C 662.4593301435407,317.6267942583732 716.2775119617226,264.89952153110045 822,283 C 927.7224880382774,301.10047846889955 1085.3492822966507,390.0287081339713 1197,413 C 1308.6507177033493,435.9712918660287 1374.3253588516745,392.9856459330143 1440,350 L 1440,600 L 0,600 Z"
						stroke="none"
						stroke-width="0"
						fill="url(#gradient1)"
						fill-opacity="1"
						className="transition-all duration-300 ease-in-out delay-150 path-1"
					></path>
				</svg>
			</Box>
			{/* Svg 2 */}
			<Box
				pos="absolute"
				bg="transparent"
				zIndex={10}
				width="100vw"
				height="50vh"
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
						stroke-width="0"
						fill="url(#gradient)"
						fill-opacity="0.8"
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
					width={{ base: "90%", md: "30%" }}
					direction="column"
					justifyContent="center"
					alignItems="center"
					bg="white"
					p={8}
					borderRadius="lg"
					boxShadow="xl"
				>
					<Flex justifyContent="center" alignItems="center" width="100%" mb={6}>
						<Heading
							size={{ md: "5xl", sm: "3xl" }}
							textAlign="center"
							fontWeight="medium"
							color="teal.500"
						>
							LOGIN
						</Heading>
					</Flex>
					<form onSubmit={handleSubmit(onSubmit)} className="login-form">
						<Stack align="center" width="100%" justify="center" gap={4}>
							<Field.Root invalid={!!errors.emailId} width="100%">
								<Field.Label fontSize="md" fontWeight="medium" color="gray.600">
									Email :
								</Field.Label>
								<Input
									{...register("emailId", { required: "Email Id is required" })}
									variant="outline"
									placeholder="Email"
									size="lg"
									color="gray.800"
									borderColor="teal.300"
									_focus={{ outlineColor: "teal.500" }}
								/>
								<Field.ErrorText>{errors.emailId?.message}</Field.ErrorText>
							</Field.Root>

							<Field.Root invalid={!!errors.password} width="100%">
								<Field.Label fontSize="md" fontWeight="medium" color="gray.600">
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
									color="gray.800"
									borderColor="teal.300"
									_focus={{ outlineColor: "teal.500" }}
								/>
								<Field.ErrorText>{errors.password?.message}</Field.ErrorText>
							</Field.Root>

							<Button
								type="submit"
								bgGradient="to-r"
								gradientFrom="teal.500"
								gradientTo="teal.400"
								color="white"
								variant="solid"
								mt={4}
								w="full"
								_hover={{
									bgGradient: "to-l",
									gradientFrom: "teal.600",
									gradientTo: "teal.500",
								}}
								transition="background 0.3s ease-in-out"
								fontSize="xl"
								borderRadius="full"
							>
								LOGIN
							</Button>
						</Stack>
					</form>
					<Link
						mt={4}
						color="teal.600"
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
