import { Outlet } from "react-router-dom";
import DockNav from "@/Components/DockNav";
import { Flex, useColorModeValue } from "@chakra-ui/react";

const Layout = () => {
  const pageBg = useColorModeValue("light.menu.bg", "dark.menu.bg");
  const textColor = useColorModeValue("light.menu.text", "dark.menu.text");

  return (
    <Flex height="100vh" width="100vw" bg={pageBg} color={textColor}>
      <Outlet />
      <DockNav />
    </Flex>
  );
};

export default Layout;
