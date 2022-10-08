import { Box } from "@chakra-ui/react";
import styled from "styled-components";

export const MessageBox = styled(Box)`
  border-radius: 10px;
  flex-direction: column;
  margin-top: 5px;
  flex: 1;
  min-width: 150px;

  overflow: hidden;

  & div:first-child {
    padding: 10px;
    h1 {
      font-weight: bold;
      text-transform: uppercase;
      font-size: 12px;
    }
  }

  & div:last-child {
    padding: 10px;
    max-height: 80px;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

  }

`;