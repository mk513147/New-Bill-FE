// import {
// 	Box,
// 	Heading,
// 	Select,
// 	SimpleGrid,
// 	Text,
// 	VStack,
// } from "@chakra-ui/react";
// import { useState } from "react";

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

// const Products: React.FC = () => {
// 	const [selectedCategory, setSelectedCategory] = useState<string>("All");

// 	const filteredProducts =
// 		selectedCategory === "All"
// 			? products
// 			: products.filter((product) => product.category === selectedCategory);

// 	return (
// 		<Box bg="white" minH="100vh" p={6} color="teal.300">
// 			<VStack gap={4}>
// 				<Heading as="h1" size="5xl">
// 					Products
// 				</Heading>
// 				{/* <Select.Root collection={categories}>
// 					<Select.HiddenSelect />
// 					<Select.Label>Select category</Select.Label>
// 					<Select.Control>
// 						<Select.Trigger>
// 							<Select.ValueText placeholder="Select category" />
// 						</Select.Trigger>
// 						<Select.IndicatorGroup>
// 							<Select.Indicator />
// 						</Select.IndicatorGroup>
// 					</Select.Control>
// 					<Portal>
// 						<Select.Positioner>
// 							<Select.Content>
// 								{categories.map((category) => (
// 									<option key={category} value={category}>
// 										{category}
// 									</option>
// 								))}
// 							</Select.Content>
// 						</Select.Positioner>
// 					</Portal>
// 				</Select.Root> */}
// 				<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} w="full">
// 					{filteredProducts.map((product) => (
// 						<Box
// 							key={product.id}
// 							p={4}
// 							borderWidth={1}
// 							borderRadius="lg"
// 							boxShadow="sm"
// 							bg="white"
// 							_hover={{ shadow: "md", transform: "scale(1.02)" }}
// 							transition="0.3s"
// 						>
// 							<Text fontSize="lg" fontWeight="bold">
// 								{product.name}
// 							</Text>
// 							<Text fontSize="sm" color="gray.500">
// 								{product.category}
// 							</Text>
// 						</Box>
// 					))}
// 				</SimpleGrid>
// 			</VStack>
// 		</Box>
// 	);
// };

// export default Products;
function Products() {
	return (
		<>
			<h1>Products page</h1>
			<h2>Products page</h2>
		</>
	);
}

export default Products;
