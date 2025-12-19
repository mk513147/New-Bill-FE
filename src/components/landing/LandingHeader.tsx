import { Box, Container, Flex, Heading, HStack, Button, IconButton, Text } from '@chakra-ui/react'
import { Menu } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { Menu as MenuIcon } from 'lucide-react'

export function LandingHeader() {
  return (
    <Box position="sticky" top={0} zIndex={1000} bg="white" borderBottomWidth="1px">
      <Container maxW="6xl">
        <Flex h="64px" align="center" justify="space-between">
          <Heading size="md">
            <RouterLink to="/">EBill</RouterLink>
          </Heading>

          <HStack gap={6} hideBelow="md">
            <NavLink to="#features">Features</NavLink>
            <NavLink to="#pricing">Pricing</NavLink>
            <NavLink to="#help">Help</NavLink>

            <Button colorPalette="blue" asChild>
              <RouterLink to="/login">Login</RouterLink>
            </Button>

            <Button colorPalette="cyan" asChild>
              <RouterLink to="/login">Get Started</RouterLink>
            </Button>
          </HStack>

          <Box hideFrom="md">
            <Menu.Root>
              <Menu.Trigger asChild>
                <IconButton aria-label="Open menu" variant="ghost">
                  <MenuIcon size={20} />
                </IconButton>
              </Menu.Trigger>

              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="features" asChild>
                    <RouterLink to="#features">Features</RouterLink>
                  </Menu.Item>
                  <Menu.Item value="pricing" asChild>
                    <RouterLink to="#pricing">Pricing</RouterLink>
                  </Menu.Item>
                  <Menu.Item value="help" asChild>
                    <RouterLink to="#help">Help</RouterLink>
                  </Menu.Item>
                  <Menu.Item value="login" asChild>
                    <RouterLink to="/login">Login</RouterLink>
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Menu.Root>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Text fontWeight="medium" color="gray.600" _hover={{ color: 'gray.900' }} asChild>
      <RouterLink to={to}>{children}</RouterLink>
    </Text>
  )
}
