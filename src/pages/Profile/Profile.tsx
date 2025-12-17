import {
  Avatar,
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Heading,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react'
import { FaUpload } from 'react-icons/fa'
import '@/styles/products.css'
import { useProfile } from '@/hooks/useProfile.ts'
import { ToasterUtil } from '@/components/common/ToasterUtil.tsx'
import { useProfileActions } from '@/hooks/useProfileActions'
import { setHeader, clearHeader } from '@/redux/slices/headerSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function Profile() {
  const { data, isLoading, isError } = useProfile()
  const toast = ToasterUtil()
  const { updateProfile, deleteProfile } = useProfileActions('253')

  const handleUpdate = () => {
    updateProfile.mutate(
      { name: 'Guddu' },
      {
        onSuccess: () => console.log('Updated profile'),
      },
    )
  }

  const handleDelete = () => {
    deleteProfile.mutate()
  }

  if (isLoading) {
    return (
      <Box maxW="600px" mx="auto" p={6}>
        <Flex align="center" gap={4}>
          <Skeleton height="60px" width="60px" borderRadius="50%" />
          <Box flex="1">
            <Skeleton height="20px" width="150px" mb={2} />
            <Skeleton height="16px" width="200px" />
          </Box>
        </Flex>

        <Box mt={6}>
          <SkeletonText mt="4" noOfLines={4} gap="4" />
        </Box>
      </Box>
    )
  }

  if (isError) {
    toast('Error while fetching data', 'error')
  }

  if (!data) {
    toast('No profile data found', 'error')
  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      setHeader({
        title: 'Profile',
      }),
    )

    return () => {
      dispatch(clearHeader())
    }
  }, [dispatch])

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
        width={{ base: 'full', md: '60%', lg: '45%' }}
      >
        <Stack gap={8} align="center" textAlign="center">
          <Heading size="2xl" color="#0074E4">
            My Profile
          </Heading>

          {/* Larger Profile Image */}
          <Flex direction="column" alignItems="center" gap={4}>
            <Avatar.Root size="2xl" bgColor="gray.200">
              {/* <Avatar.Image src={profile.profileImage || "./image"} />
							<Avatar.Fallback name={data.firstName} /> */}
            </Avatar.Root>

            <Button variant="outline" colorScheme="blue" color={'gray.500'}>
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
            color={'gray.700'}
            lineHeight="1.9"
          >
            <Text>
              <strong>First Name:</strong> {data.firstName}
            </Text>
            <Text>
              <strong>Last Name:</strong> {data.lastName}
            </Text>
            <Text>
              <strong>Email ID:</strong> {data.emailId}
            </Text>
            <Text>
              <strong>Mobile Number:</strong> {data.mobileNumber}
            </Text>
            <Text>
              <strong>Shop Name:</strong> {data.shopName}
            </Text>
            <Text>
              <strong>Archive Day:</strong> {data.archiveDay}
            </Text>
          </Box>
        </Stack>
      </Box>
    </Flex>
  )
}

export default Profile
