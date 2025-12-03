import { Outlet, useNavigate } from 'react-router-dom'
import { Box, Flex } from '@chakra-ui/react'
import { SideBar } from '@/components/common/SideBar'
import { Toaster } from '@/components/common/ToasterUtil'
import { useEffect } from 'react'

const Layout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem('eb_logged_in') || 'false')
    if (!isLoggedIn) {
      navigate('/login', { replace: true })
    }
  }, [])

  return (
    <Flex height="100vh" width="100%" overflowX="hidden" overflowY={'auto'} position="relative">
      <Box zIndex="1000">
        <SideBar />
      </Box>

      <Box flex="1" minH="100vh" overflowX="auto">
        <Outlet />
      </Box>

      <Toaster />
    </Flex>
  )
}

export default Layout
