import { Flex, Box, Heading, Button, Input, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { PasswordInput } from "@/components/ui/password-input";
import { Field } from "@/components/ui/field";

interface FormValues {
	username: String;
	password: String;
}

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>();

	const onSubmit = handleSubmit((data) => console.log(data));

	return (
		<Flex minH="100vh" align="center" justify={"center"} bg={"gray.900"}>
			<Box p={8} bg={"gray.800"} rounded={"md"} boxShadow={"md"}>
				<Heading fontSize={"2xl"} textAlign={"center"} color={"white"}>
					Login
				</Heading>
				<form onSubmit={onSubmit}>
					<Stack gap="4" align="flex-start" maxW="sm">
						<Field
							label="Username"
							invalid={!!errors.username}
							errorText={errors.username?.message}
						>
							<Input
								{...register("username", { required: "Username is required" })}
							/>
						</Field>

						<Field
							label="Password"
							invalid={!!errors.password}
							errorText={errors.password?.message}
						>
							<PasswordInput
								{...register("password", { required: "Password is required" })}
							/>
						</Field>

						<Button
							type="submit"
							bgColor={"teal.400"}
							mt={4}
							w={"full"}
							_hover={{ bgColor: "teal.300" }}
							transition="backgrounds"
							transitionDuration={"slowest"}
						>
							Submit
						</Button>
					</Stack>
				</form>
			</Box>
		</Flex>
	);
};

export default Login;
