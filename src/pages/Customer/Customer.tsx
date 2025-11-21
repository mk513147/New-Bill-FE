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
	Button,
	Table,
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";
import {
	FaFilter,
	FaPrint,
	FaPlusCircle,
	FaEdit,
	FaTrash,
} from "react-icons/fa";
import "@/styles/products.css";
import { useState } from "react";
import { useCustomer } from "@/hooks/useCustomer";

interface Customer {
	id: number;
	name: string;
	mobileNumber: string;
	address: string;
	amount: number;
	companyName: string;
	type: string;
}

const customers: Customer[] = [
	{
		id: 1,
		name: "Aman Gupta",
		mobileNumber: "9876543210",
		address: "New Delhi, India",
		amount: 15000,
		companyName: "Boat India Pvt. Ltd.",
		type: "Premium",
	},
	{
		id: 2,
		name: "Riya Sharma",
		mobileNumber: "9998887776",
		address: "Mumbai, India",
		amount: 8000,
		companyName: "Reliance Retail",
		type: "Regular",
	},
	{
		id: 3,
		name: "Arjun Patel",
		mobileNumber: "8889990001",
		address: "Ahmedabad, India",
		amount: 23000,
		companyName: "Tata Electronics",
		type: "Wholesale",
	},
	{
		id: 4,
		name: "Priya Das",
		mobileNumber: "9012345678",
		address: "Kolkata, India",
		amount: 12000,
		companyName: "Zara India",
		type: "Premium",
	},
	{
		id: 5,
		name: "Mohit Yadav",
		mobileNumber: "9123456789",
		address: "Lucknow, India",
		amount: 7000,
		companyName: "Local Market",
		type: "Regular",
	},
	...Array.from({ length: 10 }, (_, i) => ({
		id: i + 6,
		name: `Customer ${i + 6}`,
		mobileNumber: `98${Math.floor(10000000 + Math.random() * 9000000)}`,
		address: "India",
		amount: Math.floor(5000 + Math.random() * 20000),
		companyName: "Generic Traders",
		type: i % 2 === 0 ? "Wholesale" : "Regular",
	})),
];

function Customers() {
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;
	const totalPages = Math.ceil(customers.length / itemsPerPage);
	const { data } = useCustomer();
	console.log("Customer Data:", data);

	const paginatedCustomers = customers.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const handlePrev = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1);
	};

	const handleNext = () => {
		if (currentPage < totalPages) setCurrentPage(currentPage + 1);
	};

	return (
		<Flex
			bgColor="gray.100"
			width="100vw"
			height="100vh"
			flexDirection={{ base: "column", md: "row", sm: "column" }}
		>
			<Flex
				width={{ base: "full", md: "80%", sm: "full" }}
				height={{ base: "90%", md: "full", sm: "90%" }}
				flexDirection="column"
				gap={10}
				padding={8}
			>
				{/* Header Section */}
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
							placeholder="Search Customers"
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

				{/* Title + Buttons */}
				<Flex
					justifyContent="space-between"
					width="full"
					alignItems="center"
					color="gray.800"
				>
					<Heading size="3xl">Customers</Heading>
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
							Add customer
							<FaPlusCircle />
						</Button>
					</HStack>
				</Flex>

				{/* Table Section */}
				<Flex flexDirection="column" flex="1" justifyContent="space-between">
					<Stack
						width="full"
						gap="5"
						bgColor="white"
						shadow="sm"
						rounded="lg"
						overflow="hidden"
						pb="2"
						flex="1"
					>
						<Table.Root size="lg" stickyHeader color="gray.500">
							<Table.Header>
								<Table.Row
									bgColor="white"
									borderBottomColor="gray.200"
									borderBottomWidth="3px"
								>
									<Table.ColumnHeader color="gray.600">Name</Table.ColumnHeader>
									<Table.ColumnHeader color="gray.600">
										Mobile Number
									</Table.ColumnHeader>
									<Table.ColumnHeader color="gray.600">
										Address
									</Table.ColumnHeader>
									<Table.ColumnHeader color="gray.600">
										Amount
									</Table.ColumnHeader>
									<Table.ColumnHeader color="gray.600">
										Company Name
									</Table.ColumnHeader>
									<Table.ColumnHeader color="gray.600">Type</Table.ColumnHeader>
									<Table.ColumnHeader color="gray.600">
										Actions
									</Table.ColumnHeader>
								</Table.Row>
							</Table.Header>

							<Table.Body>
								{paginatedCustomers.map((item) => (
									<Table.Row
										key={item.id}
										bgColor="whiteAlpha.100"
										borderBottomColor="gray.200"
										borderBottomWidth="3px"
									>
										<Table.Cell color="gray.700">{item.name}</Table.Cell>
										<Table.Cell>{item.mobileNumber}</Table.Cell>
										<Table.Cell>{item.address}</Table.Cell>
										<Table.Cell>₹{item.amount}</Table.Cell>
										<Table.Cell>{item.companyName}</Table.Cell>
										<Table.Cell>{item.type}</Table.Cell>
										<Table.Cell>
											<HStack gap="2" justifyContent="center">
												<IconButton
													aria-label="Edit"
													size="sm"
													colorScheme="yellow"
												>
													<FaEdit />
												</IconButton>
												<IconButton
													aria-label="Delete"
													size="sm"
													colorScheme="red"
												>
													<FaTrash />
												</IconButton>
											</HStack>
										</Table.Cell>
									</Table.Row>
								))}
							</Table.Body>
						</Table.Root>
					</Stack>

					{/* Pagination */}
					<Flex
						justifyContent="center"
						alignItems="center"
						mt={4}
						gap={3}
						bg="white"
						p={3}
						rounded="lg"
						shadow="sm"
					>
						<IconButton
							aria-label="Previous"
							disabled={currentPage === 1}
							onClick={handlePrev}
						>
							<LuChevronLeft />
						</IconButton>
						<Text>
							Page {currentPage} of {totalPages}
						</Text>
						<IconButton
							aria-label="Next"
							disabled={currentPage === totalPages}
							onClick={handleNext}
						>
							<LuChevronRight />
						</IconButton>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default Customers;
