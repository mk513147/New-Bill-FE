import { Outlet, useNavigate } from 'react-router-dom'
import DockNav from '@/components/common/DockNav'
import { Box, Flex } from '@chakra-ui/react'
import { useColorModeValue } from '@/components/ui/color-mode'
import SideBar from '@/components/common/SideBar'
import { Toaster } from '@/components/common/ToasterUtil'
import { useEffect } from 'react'

const Layout = () => {
  const navigate = useNavigate()

  const pageBg = useColorModeValue('light.menu.bg', 'dark.menu.bg')
  const textColor = useColorModeValue('light.menu.text', 'dark.menu.text')

  useEffect(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem('eb_logged_in') || 'false')
    if (!isLoggedIn) {
      navigate('/login', { replace: true })
    }
  }, [])

  return (
    <Flex
      height="100vh"
      width="100vw"
      bg={pageBg}
      color={textColor}
      overflowX="hidden"
      overflowY="auto"
      position="relative"
    >
      <Box position="absolute" top="3" left="3" zIndex="1000">
        <SideBar />
      </Box>

      <Box flex="1" pt="10">
        <Outlet />
      </Box>

      <DockNav />
      <Toaster />
    </Flex>
  )
}

export default Layout
