import { Flex } from "@chakra-ui/react";

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
			flexDirection={{ base: "row", md: "row", sm: "column" }}
		>
			<Flex flex="2" bgColor="white" shadow="xl"></Flex>
			<Flex flex="8">
				<Flex></Flex>
				<Flex></Flex>
				<Flex></Flex>
			</Flex>
		</Flex>
	);
}

export default Products;
