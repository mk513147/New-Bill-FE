import {
  Avatar,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Heading,
  IconButton,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
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
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setActiveTab } from "@/Redux/Slices/dockSlice";

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

  const paginatedCustomers = customers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveTab("customer"));
  }, []);

  return (
    <Flex w="100vw" h="100vh">
      <Flex direction="column" w="100%" gap={10} p={8}>
        {/* Search + User */}
        <Flex justify="space-between" align="center">
          <InputGroup w="50%" bg="white" rounded="full" shadow="md">
            <InputLeftElement>
              <IoIosSearch color="blue" size="20px" />
            </InputLeftElement>
            <Input placeholder="Search Customers" border="none" />
          </InputGroup>

          <HStack gap={4}>
            <Avatar name="Kaushal Raj" bg="#0074E4" size="lg" />
            <Stack spacing={0}>
              <Text fontWeight="medium">Kaushal Raj</Text>
              <Text color="gray.500" fontSize="sm">
                Shop Name
              </Text>
            </Stack>
          </HStack>
        </Flex>

        {/* Title + Buttons */}
        <Flex justify="space-between" align="center">
          <Heading size="xl">Customers</Heading>

          <HStack spacing={4}>
            <Button leftIcon={<FaFilter />} colorScheme="teal">
              Filter
            </Button>

            <Button leftIcon={<FaPrint />} colorScheme="teal">
              Print
            </Button>

            <Button
              leftIcon={<FaPlusCircle />}
              bg="#0074E4"
              color="white"
              _hover={{ bg: "#0062C8" }}
            >
              Add Customer
            </Button>
          </HStack>
        </Flex>

        {/* Table */}
        <Flex direction="column" flex="1">
          <Table variant="simple" bg="white" rounded="lg" shadow="sm">
            <Thead bg="gray.50">
              <Tr>
                <Th>Name</Th>
                <Th>Mobile Number</Th>
                <Th>Address</Th>
                <Th>Amount</Th>
                <Th>Company Name</Th>
                <Th>Type</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>

            <Tbody>
              {paginatedCustomers.map((item) => (
                <Tr key={item.id} borderBottom="1px solid #eee">
                  <Td>{item.name}</Td>
                  <Td>{item.mobileNumber}</Td>
                  <Td>{item.address}</Td>
                  <Td>₹{item.amount}</Td>
                  <Td>{item.companyName}</Td>
                  <Td>{item.type}</Td>

                  <Td>
                    <HStack spacing={2}>
                      <IconButton
                        aria-label="Edit"
                        icon={<FaEdit />}
                        size="sm"
                        colorScheme="yellow"
                      />
                      <IconButton
                        aria-label="Delete"
                        icon={<FaTrash />}
                        size="sm"
                        colorScheme="red"
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          {/* Pagination */}
          <Flex
            mt={4}
            p={3}
            bg="white"
            rounded="lg"
            shadow="sm"
            justify="center"
            align="center"
            gap={4}
          >
            <IconButton
              aria-label="Prev"
              icon={<LuChevronLeft />}
              onClick={handlePrev}
              isDisabled={currentPage === 1}
            />

            <Text>
              Page {currentPage} / {totalPages}
            </Text>

            <IconButton
              aria-label="Next"
              icon={<LuChevronRight />}
              onClick={handleNext}
              isDisabled={currentPage === totalPages}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Customers;
