import {
  Avatar,
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Heading,
  Divider,
  Icon,
} from "@chakra-ui/react";
import { FaUpload, FaUser, FaEnvelope, FaPhone, FaStore } from "react-icons/fa";
import { MdRestore } from "react-icons/md";
import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector((state: any) => state.profile.profile);

  return (
    <Flex
      bg="linear-gradient(135deg, #0074E4 0%, #00C2FF 100%)"
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      p={6}
    >
      <Box
        bg="whiteAlpha.900"
        p={10}
        rounded="3xl"
        shadow="2xl"
        width={{ base: "full", md: "70%", lg: "50%" }}
        backdropFilter="blur(12px)"
      >
        <Stack gap={8} align="center" textAlign="center">
          {/* Title */}
          <Heading size="2xl" color="#0074E4" letterSpacing="wide">
            My Profile
          </Heading>

          {/* Profile Image + Upload Button */}
          <Flex direction="column" alignItems="center" gap={4}>
            <Avatar
              size="2xl"
              name={`${user?.firstName} ${user?.lastName}`}
              src={user?.profileImage || ""}
              bg="gray.300"
              shadow="lg"
            />

            <Button
              variant="outline"
              borderColor="#0074E4"
              color="#0074E4"
              _hover={{ bg: "#E5F3FF" }}
              leftIcon={<FaUpload />}
            >
              Upload Image
            </Button>
          </Flex>

          <Divider borderColor="gray.300" />

          {/* Profile Details Card */}
          <Box
            w="full"
            bg="white"
            p={8}
            rounded="2xl"
            shadow="lg"
            textAlign="left"
            border="1px solid rgba(0,0,0,0.05)"
          >
            <Stack gap={5} fontSize="lg" color="gray.700">
              {/* First Name */}
              <Flex align="center" gap={4}>
                <Icon as={FaUser} color="#0074E4" boxSize={6} />
                <Text>
                  <strong>First Name:</strong> {user?.firstName}
                </Text>
              </Flex>

              {/* Last Name */}
              <Flex align="center" gap={4}>
                <Icon as={FaUser} color="#0074E4" boxSize={6} />
                <Text>
                  <strong>Last Name:</strong> {user?.lastName}
                </Text>
              </Flex>

              {/* Email */}
              <Flex align="center" gap={4}>
                <Icon as={FaEnvelope} color="#0074E4" boxSize={6} />
                <Text>
                  <strong>Email:</strong> {user?.emailId}
                </Text>
              </Flex>

              {/* Mobile Number */}
              <Flex align="center" gap={4}>
                <Icon as={FaPhone} color="#0074E4" boxSize={6} />
                <Text>
                  <strong>Mobile:</strong> {user?.mobileNumber}
                </Text>
              </Flex>

              {/* Shop Name */}
              <Flex align="center" gap={4}>
                <Icon as={FaStore} color="#0074E4" boxSize={6} />
                <Text>
                  <strong>Shop Name:</strong> {user?.shopName}
                </Text>
              </Flex>

              {/* Archive Day */}
              <Flex align="center" gap={4}>
                <Icon as={MdRestore} color="#0074E4" boxSize={6} />
                <Text>
                  <strong>Archive Day:</strong> {user?.archiveDay}
                </Text>
              </Flex>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
}

export default Profile;
