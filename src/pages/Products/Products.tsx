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
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";
import {
  FaFilter,
  FaPrint,
  FaPlusCircle,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { setActiveTab } from "@/Redux/Slices/dockSlice";
import { useEffect } from "react";

const products = [
  {
    id: 1,
    name: "Laptop",
    productQuantity: 10,
    purchasePrice: 200,
    sellingPrice: 250,
    maxDiscount: 15,
    minDiscount: 5,
    category: "Electronics",
    supplierInfo: "Tech World",
    dateOfPurchase: "2025-11-01",
    paymentStatus: "Paid",
    discountOnBulk: "10% on 5+",
    damagedItems: 0,
    stock: 50,
  },
];

function Products() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveTab("products"));
  }, []);

  return (
    <Flex w="100vw" h="100vh" direction="column" p={6}>
      {/* Header Search + Profile */}
      <Flex justify="space-between" align="center" mb={8}>
        <InputGroup w="40%">
          <InputLeftElement>
            <IoIosSearch color="gray" />
          </InputLeftElement>
          <Input placeholder="Search Products" bg="white" rounded="full" />
        </InputGroup>

        <HStack spacing={4}>
          <Avatar name="Kaushal Raj" src="./image" />
          <Stack spacing={0}>
            <Text fontWeight="medium">Kaushal Raj</Text>
            <Text fontSize="sm" color="gray.500">
              Shop Name
            </Text>
          </Stack>
        </HStack>
      </Flex>

      {/* Title + Buttons */}
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="xl">Products</Heading>

        <HStack spacing={4}>
          <Button leftIcon={<FaFilter />} bg="teal.400" color="white">
            Filter
          </Button>

          <Button leftIcon={<FaPrint />} bg="teal.400" color="white">
            Print
          </Button>

          <Button leftIcon={<FaPlusCircle />} bg="#0074E4" color="white">
            Add Product
          </Button>
        </HStack>
      </Flex>

      {/* Table */}
      <Box bg="white" shadow="md" rounded="md" p={4} overflow="auto">
        <Table variant="simple">
          <Thead bg="gray.100">
            <Tr>
              <Th>Name</Th>
              <Th>Quantity</Th>
              <Th>Purchase Price</Th>
              <Th>Selling Price</Th>
              <Th>Max Discount</Th>
              <Th>Min Discount</Th>
              <Th>Category</Th>
              <Th>Supplier Info</Th>
              <Th>Date of Purchase</Th>
              <Th>Payment Status</Th>
              <Th>Discount on Bulk</Th>
              <Th>Damaged Items</Th>
              <Th>Stock</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>

          <Tbody>
            {products.map((item) => (
              <Tr key={item.id}>
                <Td>{item.name}</Td>
                <Td>{item.productQuantity}</Td>
                <Td>₹{item.purchasePrice}</Td>
                <Td>₹{item.sellingPrice}</Td>
                <Td>{item.maxDiscount}%</Td>
                <Td>{item.minDiscount}%</Td>
                <Td>{item.category}</Td>
                <Td>{item.supplierInfo}</Td>
                <Td>{item.dateOfPurchase}</Td>
                <Td>{item.paymentStatus}</Td>
                <Td>{item.discountOnBulk}</Td>
                <Td>{item.damagedItems}</Td>
                <Td>{item.stock}</Td>

                <Td>
                  <HStack>
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
      </Box>

      {/* Simple Pagination */}
      <Flex justify="center" mt={4} align="center" gap={4}>
        <IconButton aria-label="Prev" icon={<LuChevronLeft />} />
        <Button variant="outline">1</Button>
        <IconButton aria-label="Next" icon={<LuChevronRight />} />
      </Flex>
    </Flex>
  );
}

export default Products;
