import { Flex } from "@chakra-ui/react";
import styled from "styled-components";

export const Button = styled(Flex)`
  background-color: #00000020;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
  & svg {
    transition: linear 0.1s;
    margin-top: -20px;
    &:hover {
      transform: scale(1.1);
    }
  }
`;