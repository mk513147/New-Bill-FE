import {
  Box,
  Flex,
  VStack,
  Avatar,
  Stack,
  Text,
  HStack,
  IconButton,
  Center,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useEffect } from "react";
import { API } from "@/Api/api";
import API_ENDPOINTS from "@/Api/apiEndpoints";
import { resetProfile } from "@/Redux/Slices/profileSlice";
import { useDispatch } from "react-redux";

const SideBar = () => {
  //   const toastFunc = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await API.post(API_ENDPOINTS.AUTH.LOGOUT);

      if (res.status === 200) {
        localStorage.clear();

        dispatch(resetProfile());

        navigate("/login", { replace: true });
      }
    } catch (error) {
      localStorage.clear();
      dispatch(resetProfile());
      navigate("/login", { replace: true });
    }
  };

  return (
    <>
      <Flex
        flexDir="column"
        height="100%"
        bgColor="#ffffffff"
        p={5}
        align="center"
        justify="space-between"
        color="gray.600"
        maxW="25%"
        minW="18%"
        shadow="lg"
      >
        <Box w="250px" p={5}>
          <VStack align="start" gap={4}>
            <Text cursor="pointer">Home</Text>
            <Text cursor="pointer">Analytics</Text>
            <Text cursor="pointer">Reports</Text>
            <Text cursor="pointer">Settings</Text>
          </VStack>
        </Box>
        <HStack>
          <Avatar
            name="Demo User"
            src="https://bit.ly/broken-link"
            size="sm"
            bg="#00F2F2"
          />

          <Stack gap="0">
            <Text fontWeight="medium">Demo User</Text>
            <Text color="gray.500" fontSize="sm">
              demo.user@example.com
            </Text>
          </Stack>

          <IconButton
            bg="teal.500"
            color="white"
            _hover={{ bg: "teal.600" }}
            size="md"
            borderRadius="full"
            aria-label="Logout"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
          </IconButton>
        </HStack>
      </Flex>
      {/* <Toaster /> */}
    </>
  );
};

export default SideBar;
