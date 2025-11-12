import {
	Avatar,
	Box,
	Button,
	Flex,
	Stack,
	Text,
	Heading,
} from "@chakra-ui/react";
import { FaUpload } from "react-icons/fa";
import "@/styles/products.css";
import { API } from "../../apiCall/api";
import { useEffect } from "react";

interface ProfileData {
	firstName: string;
	lastName: string;
	emailId: string;
	mobileNumber: string;
	shopName: string;
	archiveDay: string;
	profileImage?: string;
}

function Profile() {
	const profile: ProfileData = {
		firstName: "Kaushal",
		lastName: "Raj",
		emailId: "kaushal@example.com",
		mobileNumber: "9876543210",
		shopName: "Raj Electronics",
		archiveDay: "30 Days",
		profileImage: "./image",
	};

	const fetchUserProfile = async () => {
		try {
			const response = await API.get("/auth/view");
			console.log("Profile Data:", response.data);
		} catch (error) {
			console.error("Error fetching profile data:", error);
		}
	};

	useEffect(() => {
		fetchUserProfile();
	});

	return (
		<Flex
			bgColor="gray.100"
			width="100vw"
			height="100vh"
			justifyContent="center"
			alignItems="center"
			padding={6}
		>
			<Box
				bg="white"
				p={10}
				rounded="2xl"
				shadow="md"
				width={{ base: "full", md: "60%", lg: "45%" }}
			>
				<Stack gap={8} align="center" textAlign="center">
					<Heading size="2xl" color="#0074E4">
						My Profile
					</Heading>

					{/* Larger Profile Image */}
					<Flex direction="column" alignItems="center" gap={4}>
						<Avatar.Root size="2xl" bgColor="gray.200">
							<Avatar.Image src={profile.profileImage || "./image"} />
							<Avatar.Fallback name={profile.firstName} />
						</Avatar.Root>

						<Button variant="outline" colorScheme="blue" color={"gray.500"}>
							<FaUpload style={{ marginRight: 8 }} />
							Upload Image
						</Button>
					</Flex>

					{/* Profile Details */}
					<Box
						bg="gray.50"
						p={6}
						rounded="lg"
						shadow="inner"
						textAlign="left"
						width="full"
						fontSize="lg"
						color={"gray.700"}
						lineHeight="1.9"
					>
						<Text>
							<strong>First Name:</strong> {profile.firstName}
						</Text>
						<Text>
							<strong>Last Name:</strong> {profile.lastName}
						</Text>
						<Text>
							<strong>Email ID:</strong> {profile.emailId}
						</Text>
						<Text>
							<strong>Mobile Number:</strong> {profile.mobileNumber}
						</Text>
						<Text>
							<strong>Shop Name:</strong> {profile.shopName}
						</Text>
						<Text>
							<strong>Archive Day:</strong> {profile.archiveDay}
						</Text>
					</Box>
				</Stack>
			</Box>
		</Flex>
	);
}

export default Profile;
