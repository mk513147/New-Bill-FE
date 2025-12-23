import {
  Box,
  IconButton,
  Button,
  Drawer,
  Portal,
  useMediaQuery,
  CloseButton,
  Text,
  Separator,
} from '@chakra-ui/react'

import { FaSignOutAlt } from 'react-icons/fa'
import { API } from '@/api/api.ts'
import API_ENDPOINTS from '@/api/apiEndpoints.ts'
import { resetProfile } from '@/redux/slices/profileSlice.ts'
import { useDispatch } from 'react-redux'
import { ToasterUtil } from './ToasterUtil'
import { BsLayoutSidebarInset } from '@/components/icons'
import { clearLoading, setLoading } from '@/redux/slices/uiSlice'
import { SidebarNav } from './SidebarNav'

export const SideBar = () => {
  const toastFunc = ToasterUtil()

  const dispatch = useDispatch()

  const handleLogout = async () => {
    dispatch(setLoading({ loading: true, message: 'Logging out...' }))
    try {
      const res = await API.post(API_ENDPOINTS.AUTH.LOGOUT)

      if (res.status !== 200) {
        throw new Error('Logout failed')
      }
    } catch (error) {
      console.error('Logout error:', error)
      toastFunc('Error logging out. Please try again.', 'error')
    } finally {
      dispatch(clearLoading())
    }

    localStorage.clear()
    dispatch(resetProfile())

    toastFunc('Logged out Successfully', 'success')
  }

  const [isLarge] = useMediaQuery(['(min-width: 768px)'])

  return (
    <>
      {isLarge ? (
        <Box
          w="280px"
          h="100vh"
          bg="linear-gradient(180deg, #0F172A 0%, #1E293B 100%)"
          display={{ base: 'none', md: 'flex' }}
          flexDirection="column"
          position="relative"
          shadow={'none'}
        >
          <Box position="sticky" top="0" zIndex="1" p={3}>
            <Text fontSize="2xl" fontWeight="bold" color="white" mb={3}>
              EBILL
            </Text>
            <Separator borderColor="whiteAlpha.300" />
          </Box>
          <Box
            flex="1"
            overflowY="auto"
            p={5}
            pb="120px"
            css={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            <SidebarNav />
            <Box position="absolute" bottom="20px" left="0" w="100%" px={5}>
              <IconButton
                aria-label="logout"
                size="md"
                rounded="full"
                position={'absolute'}
                bottom={0}
                right={2}
                bg="whiteAlpha.200"
                color="white"
                _hover={{ bg: 'whiteAlpha.300' }}
                shadow="sm"
                onClick={handleLogout}
              >
                <FaSignOutAlt />
              </IconButton>
            </Box>
          </Box>
        </Box>
      ) : (
        <Drawer.Root placement="start" size="xs">
          <Drawer.Trigger asChild position="absolute" top="2" left="2">
            <Button variant="solid" size="sm">
              <BsLayoutSidebarInset />
            </Button>
          </Drawer.Trigger>

          <Portal>
            <Drawer.Backdrop />

            <Drawer.Positioner>
              <Drawer.Content
                bg="linear-gradient(180deg, #0F172A 0%, #1E293B 100%)"
                h="100vh"
                display="flex"
                flexDirection="column"
                color="white"
                border="none"
              >
                <Drawer.Header pb={0}>
                  <Drawer.Title>
                    <Text fontSize="2xl" fontWeight="bold" color="white">
                      EBILL
                    </Text>
                  </Drawer.Title>
                </Drawer.Header>
                <Separator borderColor="whiteAlpha.300" mt={2} />

                <Drawer.Body
                  flex="1"
                  overflowY="auto"
                  px={4}
                  pt={2}
                  pb="120px"
                  css={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    '&::-webkit-scrollbar': {
                      display: 'none',
                    },
                  }}
                >
                  <SidebarNav />
                </Drawer.Body>

                <Drawer.Footer bg="transparent" borderTop="1px solid" borderColor="whiteAlpha.300">
                  <IconButton
                    aria-label="logout"
                    size="md"
                    rounded="full"
                    bg="whiteAlpha.200"
                    color="white"
                    _hover={{ bg: 'whiteAlpha.300' }}
                    shadow="sm"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt />
                  </IconButton>
                </Drawer.Footer>

                <Drawer.CloseTrigger asChild>
                  <CloseButton size="sm" position="absolute" top="4" right="4" />
                </Drawer.CloseTrigger>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
      )}
    </>
  )
}
