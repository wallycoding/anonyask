import {
  Badge,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  DrawerOverlay,
  Flex,
  Heading,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { BigHead } from "@bigheads/core";

import getUserDBByCode from "@/data/getUserDBByCode";
import sendMessageByCode from "@/data/sendMessageByCode";
import UserDatabaseEntity from "@/domain/entities/UserDatabaseEntity";
import Closet from "@/components/Closet";
import { defaultAvatarProps } from "@/constants/avatar";
import LoadScreen from "./LoadScreen";

const MessageForm = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [userFromCode, setUserFromCode] = useState<UserDatabaseEntity | null>(
    null
  );
  const [message, setMessage] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [waitingSend, setWaitingSend] = useState(false);

  const [skin, setSkin] = useState(defaultAvatarProps);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setWaitingSend(true);
    await sendMessageByCode(code!, message, skin);
    setWaitingSend(false);
    setMessage("");
  };

  useEffect(() => {
    if (!code) return;
    getUserDBByCode(code).then(setUserFromCode).catch(console.error);
  }, [code]);

  return userFromCode ? (
    <Flex
      h="100vh"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        cursor="pointer"
        mb="10px"
        width={150}
        onClick={() => setIsOpen(true)}
      >
        <BigHead {...skin} />
      </Flex>
      <Drawer
        placement="bottom"
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <DrawerCloseButton />
            <Flex flexDirection="column" alignItems="center">
              <Flex width={150}>
                <BigHead {...skin} />
              </Flex>
              <Heading>You</Heading>
            </Flex>
          </DrawerHeader>
          <DrawerBody display="flex" justifyContent="center">
            <Closet skin={skin} onChange={setSkin} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Flex
        w="90%"
        maxW="600px"
        flexDirection="column"
        bg="gray.700"
        borderRadius="2xl"
      >
        <Flex p="3" flexDirection="column">
          <Heading fontSize={15}>
            <Badge px="5px" py="2px">
              @{userFromCode?.displayName}
            </Badge>
          </Heading>
          <Heading fontSize={15} mt="5px">
            Send anonymous message!
          </Heading>
        </Flex>
        <Textarea
          value={message}
          onChange={({ target }) => setMessage(target.value)}
          maxLength={111}
          placeholder="Send a anonymous message..."
        />
      </Flex>
      <Button
        isLoading={waitingSend}
        loadingText="Send a message..."
        onClick={sendMessage}
        w="90%"
        maxW="600px"
        mt="10px"
        py="15px"
        colorScheme="green"
        h="50px"
        borderRadius="base"
      >
        Send!
      </Button>
      <Button
        onClick={() => navigate("/auth")}
        w="90%"
        maxW="600px"
        mt="10px"
        py="15px"
        colorScheme="pink"
        h="50px"
        borderRadius="base"
      >
        My Profile!
      </Button>
    </Flex>
  ) : (
    <LoadScreen />
  );
};

export default MessageForm;
