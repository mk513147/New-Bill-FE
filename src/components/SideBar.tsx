import {
  Box,
  Flex,
  VStack,
  Avatar,
  Stack,
  Text,
  HStack,
  IconButton,
  Button,
  CloseButton,
  Drawer,
  Portal,
} from '@chakra-ui/react'

import { useNavigate } from 'react-router-dom'
import { FaSignOutAlt } from 'react-icons/fa'
import { API } from '@/Api/api'
import API_ENDPOINTS from '@/Api/apiEndpoints'
import { resetProfile } from '@/Redux/Slices/profileSlice'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { ToasterUtil } from './ToasterUtil'
import Loading from './Loading'

const SideBar = () => {
  const toastFunc = ToasterUtil()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    setLoading(true)

    try {
      const res = await API.post(API_ENDPOINTS.AUTH.LOGOUT)

      if (res.status !== 200) {
        throw new Error('Logout failed')
      }
    } catch (error) {
      console.error('Logout error:', error)
      toastFunc('Error logging out. Please try again.', 'error')
    }

    localStorage.clear()
    dispatch(resetProfile())
    navigate('/login', { replace: true })

    setLoading(false)
  }

  return (
    <>
      {loading && <Loading />}
      <Drawer.Root placement={'start'}>
        <Drawer.Trigger asChild>
          <Button variant="outline" size="sm">
            Open Drawer
          </Button>
        </Drawer.Trigger>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content rounded="md">
              <Drawer.Header>
                <Drawer.Title>Drawer Title</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </p>
              </Drawer.Body>
              <Drawer.Footer>
                <Button variant="outline">Cancel</Button>
                <IconButton
                  onClick={() => handleLogout()}
                  disabled={loading}
                  bg="teal.500"
                  color="white"
                  _hover={{ bg: 'teal.600' }}
                  size="md"
                  borderRadius="full"
                >
                  <FaSignOutAlt />
                </IconButton>
              </Drawer.Footer>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  )
}

export default SideBar
