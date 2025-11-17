import { color, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const theme = extendTheme({
  styles: {
    global: {
      "html, body, button, input, textarea, select, a, div": {
        WebkitTapHighlightColor: "transparent",
      },
    },
  },
  fonts: {
    heading: "Poppins, sans-serif",
    body: "Poppins, sans-serif",
    zilloutbusines: "zuume-rough, sans-serif",
  },
  colors: {
    subtle: "#9D9D9D",
    brand: "#8155FE",
    light: {
      menu: {
        bg: "#FFFFFF",
        text: "#0E1207",
        primary: "#09090B",
        secondary: "#F0F0F0",
        card_bg: "#FFFFFF",
        card_border: "#E7E7E7",
        icon_color: "black",
      },
    },
    dark: {
      menu: {
        bg: "#111111",
        text: "#FFFFFF",
        primary: "#8155FE",
        secondary: "#1E1E1E",
        card_bg: "#1E1E1E",
        card_border: "#323232",
        icon_color: "white",
      },
    },
  },
  components: {
    Link: {
      baseStyle: {
        textDecoration: "none",
        _hover: {
          textDecoration: "none",
        },
      },
    },
    Switch: {
      baseStyle: {
        outline: "none",
        track: {
          bg: "#2f2f2f",
          _checked: {
            bg: "#013401",
          },
        },
        thumb: {
          bg: "#AAAAAA",
          _checked: {
            bg: "#01B401",
          },
        },
      },
    },
  },
});
