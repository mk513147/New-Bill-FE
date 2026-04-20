import {
  Box,
  Button,
  Drawer,
  Portal,
  useMediaQuery,
  CloseButton,
  Text,
  HStack,
} from '@chakra-ui/react'

import { resetProfile } from '@/redux/slices/profileSlice.ts'
import { useDispatch } from 'react-redux'
import { ToasterUtil } from './ToasterUtil'
import { BsLayoutSidebarInset } from '@/components/icons'
import { clearLoading, setLoading } from '@/redux/slices/uiSlice'
import { SidebarNav } from './SidebarNav'
import { logoutService } from '@/utils/utils'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useState } from 'react'

export const SideBar = () => {
  const toastFunc = ToasterUtil()
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const dispatch = useDispatch()

  const handleLogout = async () => {
    dispatch(setLoading({ loading: true, message: 'Logging out...' }))
    try {
      await logoutService()
      dispatch(resetProfile())
      toastFunc('Logged out successfully', 'success')
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Logout error:', error)
      toastFunc('Error logging out. Please try again.', 'error')
    } finally {
      dispatch(clearLoading())
    }
  }

  const [isLarge] = useMediaQuery(['(min-width: 768px)'])

  return (
    <>
      {isLarge ? (
        <Box
          w="280px"
          h="100vh"
          bg="linear-gradient(180deg, #0f172a 0%, #111827 100%)"
          display={{ base: 'none', md: 'flex' }}
          flexDirection="column"
          position="relative"
          boxShadow="inset -1px 0 0 rgba(255,255,255,0.08)"
        >
          <Box position="sticky" top="0" zIndex="1" px={5} pt={5} pb={4}>
            <Box
              p={3}
              borderRadius="14px"
              bg="whiteAlpha.100"
              border="1px solid"
              borderColor="whiteAlpha.200"
            >
              <Text fontSize="lg" fontWeight="800" color="white" letterSpacing="0.02em">
                EBILL
              </Text>
            </Box>
          </Box>
          <Box
            flex="1"
            overflowY="auto"
            px={5}
            pb="24px"
            css={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            <SidebarNav />
          </Box>
          <Box px={5} pb={5}>
            <Button
              aria-label="logout"
              w="full"
              h="40px"
              justifyContent="space-between"
              borderRadius="12px"
              bg="whiteAlpha.200"
              color="white"
              border="1px solid"
              borderColor="whiteAlpha.300"
              _hover={{ bg: 'whiteAlpha.300' }}
              onClick={handleLogout}
            >
              Logout
              <LogOut size={15} />
            </Button>
          </Box>
        </Box>
      ) : (
        <Drawer.Root
          placement="start"
          size="xs"
          open={drawerOpen}
          onOpenChange={(e) => setDrawerOpen(e.open)}
        >
          <Drawer.Trigger asChild position="absolute" top="2" left="2">
            <Button
              variant="solid"
              size="sm"
              bg="gray.950"
              color="white"
              _hover={{ bg: 'gray.800' }}
            >
              <BsLayoutSidebarInset />
            </Button>
          </Drawer.Trigger>

          <Portal>
            <Drawer.Backdrop />

            <Drawer.Positioner>
              <Drawer.Content
                bg="linear-gradient(180deg, #0f172a 0%, #111827 100%)"
                h="100vh"
                display="flex"
                flexDirection="column"
                color="white"
                border="none"
              >
                <Drawer.Header pb={0}>
                  <Drawer.Title w="full">
                    <Box
                      p={3}
                      borderRadius="14px"
                      bg="whiteAlpha.100"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                    >
                      <Text fontSize="lg" fontWeight="800" color="white">
                        EBILL
                      </Text>
                    </Box>
                  </Drawer.Title>
                </Drawer.Header>

                <Drawer.Body
                  flex="1"
                  overflowY="auto"
                  px={4}
                  pt={4}
                  pb={4}
                  css={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    '&::-webkit-scrollbar': {
                      display: 'none',
                    },
                  }}
                >
                  <SidebarNav onNavigate={() => setDrawerOpen(false)} />
                </Drawer.Body>

                <Drawer.Footer bg="transparent">
                  <Button
                    aria-label="logout"
                    w="full"
                    h="40px"
                    justifyContent="space-between"
                    borderRadius="12px"
                    bg="whiteAlpha.200"
                    color="white"
                    border="1px solid"
                    borderColor="whiteAlpha.300"
                    _hover={{ bg: 'whiteAlpha.300' }}
                    onClick={handleLogout}
                  >
                    Logout
                    <LogOut size={15} />
                  </Button>
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
