import { Outlet } from "react-router-dom";
import DockNav from "@/Components/DockNav";
import SideBar from "@/Components/SideBar";
import { Flex } from "@chakra-ui/react";

const Layout = () => {
  return (
    <>
      <Flex flexDir="row" height="100vh" width="100vw">
        <SideBar />
        <DockNav />
        <Outlet />
      </Flex>
    </>
  );
};

export default Layout;
