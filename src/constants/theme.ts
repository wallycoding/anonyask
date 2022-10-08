import { extendTheme } from "@chakra-ui/react";

const theme = {
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles: {
    body: {
      margin: '0',
      padding: '0',
      'background-color': 'red'
    }
  }
};

export default extendTheme(theme);
