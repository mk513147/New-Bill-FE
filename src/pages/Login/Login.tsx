import {
	Flex,
	Heading,
	Box,
	Spinner,
	Center,
	Button,
	Input,
	Stack,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { API } from "@/apiCall/api";
import { useNavigate } from "react-router-dom";
import { PasswordInput } from "@/components/ui/password-input";
import { Field } from "@/components/ui/field";
import { useState } from "react";
// import { Toaster, toaster } from "@/components/ui/toaster";
import { ToasterUtil, Toaster } from "@/components/ToasterUtil";

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

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		setLoading(true);
		console.log(data);

		try {
			const response = await API.post("auth/login", data);
			const json = response.data;
			if (json.statusCode === 200) {
				localStorage.setItem("isLoggedIn", "true");
				navigate("/dashboard");
				toastFunc(`Logged In Successfully!!.`, `success`);
			}
		} catch (error: any) {
			console.error("Login error:", error.response.data);
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
				minH="100vh"
				align="center"
				justify={"center"}
				bg={"gray.900"}
				gap={"4"}
				zIndex={5}
			>
				<Flex
					p={2}
					bg={"gray.800"}
					rounded={"md"}
					boxShadow={"md"}
					w={"350px"}
					h={"400px"}
					gap={4}
					direction={"column"}
					align={"center"}
					justify={"space-evenly"}
				>
					<Heading fontSize={"3xl"} textAlign={"center"} color={"white"}>
						Login
					</Heading>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Stack gap={"4"} align={"flex-start"} maxW={"sm"}>
							<Field
								invalid={!!errors.emailId}
								errorText={errors.emailId?.message}
							>
								<Input
									{...register("emailId", {
										required: "emailId is required",
									})}
									variant="outline"
									placeholder="emailId"
									size="lg"
									borderColor="gray.300"
								/>
							</Field>

							<Field
								invalid={!!errors.password}
								errorText={errors.password?.message}
							>
								<PasswordInput
									{...register("password", {
										required: "Password is required",
									})}
									variant="outline"
									placeholder="Password"
									size="lg"
									borderColor="gray.300"
								/>
							</Field>

							<Button
								type="submit"
								bgColor="teal.400"
								mt={4}
								w="full"
								_hover={{ bgColor: "teal.300" }}
								transition="backgrounds"
								transitionDuration="slowest"
							>
								Submit
							</Button>
						</Stack>
					</form>
				</Flex>
			</Flex>
			<Toaster />
		</>
	);
};

export default Login;
