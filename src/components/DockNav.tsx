import { Flex, IconButton } from "@chakra-ui/react";
import {
  FaTableList,
  FaShop,
  FaUsers,
  FaUser,
  FaChevronLeft,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab, setDockHidden } from "@/Redux/Slices/dockSlice";

const navItems = [
  { key: "home", label: "Home", icon: FaShop, path: "/dashboard" },
  { key: "products", label: "Products", icon: FaTableList, path: "/products" },
  { key: "customer", label: "Customer", icon: FaUsers, path: "/customer" },
  { key: "profile", label: "Profile", icon: FaUser, path: "/profile" },
];

const DockNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentTab = useSelector((state: any) => state.dock.activeTab);
  const isHidden = useSelector((state: any) => state.dock.isHidden);

  // Active tab icon for left mini bubble
  const activeItem = navItems.find((x) => x.key === currentTab);
  const ActiveIcon = activeItem?.icon;

  return (
    <>
      {/* ⭐ LEFT ACTIVE ICON WHEN HIDDEN */}
      {isHidden && ActiveIcon && (
        <IconButton
          aria-label="Show Dock"
          icon={<ActiveIcon size={26} />}
          onClick={() => dispatch(setDockHidden(false))}
          position="fixed"
          bottom="55px"
          left="20px"
          bg="black"
          color="white"
          rounded="full"
          size="lg"
          zIndex={5000}
          /* 🔥 Glow Effect */
          boxShadow="0 0 15px rgba(0,255,255,0.6), 0 0 25px rgba(0,255,255,0.3)"
        />
      )}

      {/* ⭐ FULL DOCKNAV */}
      <Flex
        position="fixed"
        bottom="45px"
        left="50%"
        transform={isHidden ? "translate(-150%, 0)" : "translate(-50%, 0)"}
        transition="transform 0.35s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s"
        opacity={isHidden ? 0 : 1}
        pointerEvents={isHidden ? "none" : "auto"}
        w="92%"
        maxW="540px"
        h="58px"
        bg="#000"
        rounded="full"
        align="center"
        justify="space-evenly"
        zIndex={3000}
        overflow="hidden"
        boxShadow="0 0 20px rgba(0,0,0,0.4)"
        /* 🔥 Neon rotating line around dock */
        _before={{
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "40px",
          padding: "2px",
          background: "conic-gradient(cyan, magenta, purple, blue, cyan)",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          animation: isHidden ? "none" : "rotateNeon 4s linear infinite",
        }}
        sx={{
          "@keyframes rotateNeon": {
            "0%": { transform: "rotate(0deg)" },
            "100%": { transform: "rotate(360deg)" },
          },
        }}
      >
        {/* ⭐ MENU ITEMS */}
        {navItems.map(({ key, label, icon: IconComp, path }) => {
          const active = currentTab === key;

          return (
            <IconButton
              key={key}
              aria-label={label}
              icon={<IconComp size={22} />}
              onClick={() => {
                dispatch(setActiveTab(key));
                navigate(path);
              }}
              bg="transparent"
              color={active ? "cyan.300" : "whiteAlpha.700"}
              rounded="full"
              transform={active ? "scale(1.25)" : "scale(1)"}
              transition="0.25s"
              _hover={{ color: "cyan.200" }}
            />
          );
        })}

        {/* ⭐ HIDE BUTTON */}
        <IconButton
          aria-label="Hide Dock"
          icon={<FaChevronLeft size={20} />}
          onClick={() => dispatch(setDockHidden(true))}
          bg="transparent"
          color="whiteAlpha.700"
          rounded="full"
          _hover={{ color: "cyan.300" }}
        />
      </Flex>
    </>
  );
};

export default DockNav;
