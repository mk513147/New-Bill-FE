import { Flex, IconButton } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaTableList, FaShop, FaUsers, FaUser } from "react-icons/fa6";

const navItems = [
  { label: "Home", icon: <FaShop />, path: "/dashboard" },
  { label: "Products", icon: <FaTableList />, path: "/products" },
  { label: "Customer", icon: <FaUsers />, path: "/customer" },
  { label: "Profile", icon: <FaUser />, path: "/profile" },
];

const DockNav = () => {
  const navigate = useNavigate();

  return (
    <>
      <Flex
        position="fixed"
        bottom={4}
        left="50%"
        transform="translateX(-50%)"
        bg="white"
        py={3}
        px={4}
        justifyContent="space-around"
        alignItems="center"
        boxShadow="xl"
        zIndex={100}
        borderRadius="full"
        width="70%"
        maxW="420px"
        border="1px solid"
        borderColor="gray.200"
      >
        {navItems.map(({ label, icon, path }) => (
          <NavLink key={path} to={path} style={{ textDecoration: "none" }}>
            {({ isActive }) => (
              <IconButton
                aria-label={label}
                onClick={() => navigate(path)}
                color={isActive ? "white" : "teal.500"}
                bg={isActive ? "teal.500" : "transparent"}
                variant="ghost"
                _hover={{ bg: "teal.400", color: "white" }}
                size="xl"
                borderRadius="full"
              >
                {icon}
              </IconButton>
            )}
          </NavLink>
        ))}
      </Flex>
    </>
  );
};

export default DockNav;
