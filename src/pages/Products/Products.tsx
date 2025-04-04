import {
	Avatar,
	Flex,
	HStack,
	Input,
	InputGroup,
	Stack,
	Text,
	ButtonGroup,
	Heading,
	IconButton,
	Pagination,
	Button,
	Table,
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";
import { FaFilter, FaPrint, FaPlusCircle } from "react-icons/fa";

// interface Product {
// 	id: number;
// 	name: string;
// 	category: string;
// }

const products = [
	{ id: 1, name: "Laptop", category: "Electronics", price: 200 },
	{ id: 2, name: "Smartphone", category: "Electronics", price: 300 },
	{ id: 3, name: "Sofa", category: "Furniture", price: 100 },
	{ id: 4, name: "Table", category: "Furniture", price: 700 },
	{ id: 5, name: "Shoes", category: "Fashion", price: 500 },
	{ id: 6, name: "T-Shirt", category: "Fashion", price: 400 },
];

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
				<Flex>
					<Stack
						width="full"
						gap="5"
						bgColor="white"
						shadow="sm"
						rounded="lg"
						overflow="hidden"
						pb="2"
					>
						<Table.Root size="lg" stickyHeader color="gray.500">
							<Table.Header>
								<Table.Row
									bgColor="white"
									borderBottomColor="gray.200"
									borderBottomWidth="3px"
								>
									<Table.ColumnHeader color="gray.600">
										Product
									</Table.ColumnHeader>
									<Table.ColumnHeader color="gray.600">
										Category
									</Table.ColumnHeader>
									<Table.ColumnHeader color="gray.600" textAlign="end">
										Price
									</Table.ColumnHeader>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{products.map((item) => (
									<Table.Row
										key={item.id}
										bgColor="whiteAlpha.100"
										borderBottomColor="gray.200"
										borderBottomWidth="3px"
									>
										<Table.Cell color="gray.700">{item.name}</Table.Cell>
										<Table.Cell>{item.category}</Table.Cell>
										<Table.Cell textAlign="end">{item.price}</Table.Cell>
									</Table.Row>
								))}
							</Table.Body>
						</Table.Root>

						<Pagination.Root count={products.length * 5} pageSize={5} page={1}>
							<ButtonGroup
								variant="ghost"
								size="sm"
								wrap="wrap"
								color="gray.500"
							>
								<Pagination.PrevTrigger asChild>
									<IconButton>
										<LuChevronLeft color="gray.500" />
									</IconButton>
								</Pagination.PrevTrigger>

								<Pagination.Items
									render={(page) => (
										<IconButton
											variant={{ base: "ghost", _selected: "outline" }}
										>
											{page.value}
										</IconButton>
									)}
								/>

								<Pagination.NextTrigger asChild>
									<IconButton>
										<LuChevronRight color="gray.500" />
									</IconButton>
								</Pagination.NextTrigger>
							</ButtonGroup>
						</Pagination.Root>
					</Stack>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default Products;
