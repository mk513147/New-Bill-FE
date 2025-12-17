import { Outlet } from 'react-router-dom'
import { Box, Flex } from '@chakra-ui/react'
import { SideBar } from '@/components/common/SideBar'
import { Toaster } from '@/components/common/ToasterUtil'
import { Header } from '@/components/common/Header'

const Layout = () => {
  return (
    <Flex height="100vh" width="100%" overflowX="hidden" overflowY={'auto'} position="relative">
      <Box zIndex="1000">
        <SideBar />
      </Box>
      <Flex flex="1" direction="column" overflow="hidden">
        <Header />

        <Box flex="1" overflowY="auto">
          <Outlet />
        </Box>
      </Flex>

      <Toaster />
    </Flex>
  )
}

export default Layout
