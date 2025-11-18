import { API } from "@/Api/api";
import API_ENDPOINTS from "@/Api/apiEndpoints";
import { resetProfile } from "@/Redux/Slices/profileSlice";
import {
  Avatar,
  Box,
  Flex,
  Text,
  Heading,
  Icon,
  Badge,
  Stack,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaStore,
  FaCalendar,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdRestore } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

function Profile() {
  const user = useSelector((state: any) => state.profile.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { colorMode, toggleColorMode } = useColorMode();

  const cardBg = useColorModeValue("#1E1F24", "#1E1F24");
  const textColor = "whiteAlpha.900";
  const accentColor = "#4ADE80"; // Pleasant green
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
    <Flex
      w="100vw"
      h="100vh"
      p={10}
      overflow="hidden"
      justify="center"
      align="center"
    >
      <Flex
        w="100%"
        maxW="1400px"
        h="85vh"
        rounded="2xl"
        p={10}
        gap={10}
        border="1px solid rgba(255,255,255,0.1)"
      >
        {/* LEFT SIDE */}
        <Flex
          w="35%"
          direction="column"
          align="center"
          justify="center"
          gap={6}
          borderRight="1px solid rgba(255,255,255,0.08)"
          pr={10}
        >
          <Avatar
            size="2xl"
            name={`${user?.firstName} ${user?.lastName}`}
            src={user?.profileImage}
            border="6px solid rgba(255,255,255,0.08)"
          />

          <Heading color={textColor} size="lg">
            {user?.firstName} {user?.lastName}
          </Heading>

          <Badge
            px={4}
            py={1}
            rounded="full"
            fontSize="sm"
            bg={accentColor}
            color="black"
          >
            Active User
          </Badge>
        </Flex>

        {/* RIGHT SIDE DETAILS */}
        <Flex w="65%" direction="column" gap={8}>
          <Heading size="md" color={textColor}>
            Bio & Profile Details
          </Heading>

          <Flex direction="column" gap={6} fontSize="lg" color="gray.300">
            <DetailRow
              icon={<FaUser />}
              label="Full Name"
              value={`${user?.firstName} ${user?.lastName}`}
            />
            <DetailRow
              icon={<FaEnvelope />}
              label="Email"
              value={user?.emailId}
            />
            <DetailRow
              icon={<FaPhone />}
              label="Mobile"
              value={user?.mobileNumber}
            />
            <DetailRow
              icon={<FaStore />}
              label="Shop Name"
              value={user?.shopName}
            />
            <DetailRow
              icon={<MdRestore />}
              label="Archive Day"
              value={user?.archiveDay}
            />
            <DetailRow
              icon={<FaCalendar />}
              label="Profile Created"
              value={user?.createdDate || "N/A"}
            />
          </Flex>
          <IconButton
            icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
            position="absolute"
            top="20px"
            left="20px"
            onClick={toggleColorMode}
            bg="blackAlpha.600"
            color="white"
            rounded="full"
            aria-label={""}
          />
        </Flex>
      </Flex>
      <IconButton
        icon={<FaSignOutAlt />}
        position="absolute"
        top="20px"
        right="20px"
        bg="red.500"
        color="white"
        rounded="full"
        size="lg"
        shadow="md"
        onClick={handleLogout}
        _hover={{ bg: "red.600" }}
        aria-label={""}
      />
    </Flex>
  );
}

// Reusable component for rows
const DetailRow = ({ icon, label, value }: any) => {
  return (
    <Flex align="center" justify="space-between" w="100%">
      <Flex align="center" gap={3}>
        <Icon as={() => icon} color="#4ADE80" boxSize={5} />
        <Text fontWeight="600">{label}</Text>
      </Flex>

      <Text color="whiteAlpha.700">{value}</Text>
    </Flex>
  );
};

export default Profile;
