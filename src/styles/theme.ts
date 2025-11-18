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
        bg: "#F7F7F7", // soft premium light bg
        text: "#0E0E0E",
        primary: "#09090B",
        secondary: "#ECECEC",
        card_bg: "#FFFFFF",
        card_border: "#D9D9D9",
        icon_color: "#0E0E0E",
      },
    },

    dark: {
      menu: {
        bg: "#0D0D0F", // premium matte dark
        text: "#FFFFFF",
        primary: "#8155FE",
        secondary: "#171717",
        card_bg: "#1A1A1D",
        card_border: "#2A2A2D",
        icon_color: "#FFFFFF",
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
