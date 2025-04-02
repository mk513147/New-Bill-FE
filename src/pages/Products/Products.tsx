import {
	Avatar,
	Flex,
	HStack,
	Input,
	InputGroup,
	Stack,
	Text,
	Heading,
	Button,
} from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";
import { FaFilter, FaPrint, FaPlusCircle } from "react-icons/fa";

// interface Product {
// 	id: number;
// 	name: string;
// 	category: string;
// }

// const products: Product[] = [
// 	{ id: 1, name: "Laptop", category: "Electronics" },
// 	{ id: 2, name: "Smartphone", category: "Electronics" },
// 	{ id: 3, name: "Sofa", category: "Furniture" },
// 	{ id: 4, name: "Table", category: "Furniture" },
// 	{ id: 5, name: "Shoes", category: "Fashion" },
// 	{ id: 6, name: "T-Shirt", category: "Fashion" },
// ];

// const categories: string[] = ["All", "Electronics", "Furniture", "Fashion"];

function Products() {
	return (
		<Flex
			bgColor="gray.100"
			width="100vw"
			height="100vh"
			flexDirection={{ base: "column", md: "row", sm: "column" }}
		>
			<Flex
				width={{ base: "full", md: "20%", sm: "full" }}
				height={{ base: "10%", md: "full", sm: "10%" }}
				bgColor="white"
				shadow="xl"
			></Flex>
			<Flex
				width={{ base: "full", md: "80%", sm: "full" }}
				height={{ base: "90%", md: "full", sm: "90%" }}
				flexDirection="column"
				gap={10}
				padding={8}
			>
				<Flex
					justifyContent="space-between"
					width="full"
					alignItems="center"
					color="gray.800"
					gap={6}
				>
					<InputGroup
						startElement={<IoIosSearch color="blue" size="20px" />}
						bgColor="white"
						shadow="md"
						width="50%"
						rounded="full"
					>
						<Input
							placeholder="Search Products"
							outline="none"
							border="none"
							_placeholder={{ color: "gray.500" }}
							size="lg"
						/>
					</InputGroup>
					<HStack gap="4">
						<Avatar.Root bgColor="#0074E4" size="xl">
							<Avatar.Fallback name="Kaushal Raj" />
							<Avatar.Image src="./image" />
						</Avatar.Root>
						<Stack gap="0">
							<Text fontWeight="medium">Kaushal Raj</Text>
							<Text color="fg.muted" textStyle="sm">
								Shop Name
							</Text>
						</Stack>
					</HStack>
				</Flex>
				<Flex
					justifyContent="space-between"
					width="full"
					alignItems="center"
					color="gray.800"
				>
					<Heading size="3xl">Products</Heading>
					<HStack gap={15}>
						<Button bgColor="teal.400" color="white" variant="solid">
							<FaFilter />
							Filter
						</Button>
						<Button bgColor="teal.400" color="white" variant="solid">
							<FaPrint />
							Print
						</Button>
						<Button bgColor="#0074E4" color="white" variant="solid" size="lg">
							Add product
							<FaPlusCircle />
						</Button>
					</HStack>
				</Flex>
				<Flex></Flex>
			</Flex>
		</Flex>
	);
}

export default Products;
