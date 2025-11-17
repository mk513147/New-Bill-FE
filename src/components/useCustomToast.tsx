import {
  Box,
  Flex,
  Text,
  Icon,
  CloseButton,
  UseToastOptions,
  useToast,
} from "@chakra-ui/react";

import {
  CheckCircleIcon,
  InfoIcon,
  CloseIcon,
  WarningTwoIcon,
} from "@chakra-ui/icons";

import { MdError } from "react-icons/md";
import { motion } from "framer-motion";

type CustomToastVariant = "success" | "error" | "info" | "warning" | "dark";

interface CustomToastProps extends UseToastOptions {
  variant?: CustomToastVariant;
  title?: string;
  description?: string;
}

const TOAST_CONFIG: any = {
  duration: 4000,
  position: "top",
  isClosable: true,
};

const VARIANT_STYLES: any = {
  success: {
    bgGradient: "linear(90deg, #073E00 0%, #082600 100%)",
    icon: CheckCircleIcon,
    color: "green.200",
  },
  error: {
    bgGradient: "linear(90deg, #520000 0%, #310000 100%)",
    icon: MdError,
    color: "red.200",
  },
  info: {
    bgGradient: "linear(90deg, #150061 0%, #18014F 100%)",
    icon: InfoIcon,
    color: "blue.200",
  },
  warning: {
    bgGradient: "linear(90deg, #423601 0%, #3D3200 100%)",
    icon: WarningTwoIcon,
    color: "yellow.200",
  },
  dark: {
    bgGradient: "linear(to-r, #232526, #414345)",
    icon: CloseIcon,
    color: "gray.300",
  },
};

export const useCustomToast = () => {
  const toast = useToast();

  const MotionBox = motion(Box);

  const showToast = ({
    status = "info",
    title,
    description,
    ...rest
  }: CustomToastProps) => {
    const { bgGradient, icon, color } = VARIANT_STYLES[status];

    const id = toast({
      ...TOAST_CONFIG,
      ...rest,
      render: () => (
        <MotionBox
          bgGradient={bgGradient}
          color="white"
          w={["100%", "450px", "500px"]}
          px={[3, 5, 6]}
          py={[2, 3, 4]}
          rounded={["md", "xl", "2xl"]}
          shadow={["md", "lg", "2xl"]}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <Flex align="center" justify="space-between">
            <Flex align="flex-start" gap={[2, 3, 4]} flex="1">
              <Icon as={icon} boxSize={[5, 6, 7]} color={color} />
              <Box>
                <Text fontSize={["13px", "15px", "16px"]} fontWeight={600}>
                  {title}
                </Text>
                <Text
                  fontSize={["11px", "13px", "14px"]}
                  fontWeight={400}
                  color="gray.200"
                >
                  {description}
                </Text>
              </Box>
            </Flex>

            {TOAST_CONFIG.isClosable && (
              <CloseButton
                alignSelf="flex-start"
                onClick={() => toast.close(id)}
                color="white"
                fontSize={["12px", "13px", "14px"]}
              />
            )}
          </Flex>
        </MotionBox>
      ),
    });
  };

  return showToast;
};
