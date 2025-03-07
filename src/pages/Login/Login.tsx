import { Flex, Box, Heading, Button } from "@chakra-ui/react";

const Login = () => {
	return (
		<Flex minH="100vh" align="center" justify={"center"} bg={"gray.900"}>
			<Box p={8} bg={"gray.800"} rounded={"md"} boxShadow={"md"}>
				<Heading fontSize={"2xl"} textAlign={"center"} color={"white"}>
					Login
				</Heading>
				<Button
					type="submit"
					bgColor={"teal.400"}
					mt={4}
					w={"full"}
					_hover={{ bgColor: "teal.300" }}
					transition="backgrounds"
					transitionDuration={"slowest"}
				>
					Login
				</Button>
			</Box>
		</Flex>
	);
};

export default Login;
