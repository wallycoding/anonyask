import { MessageBox } from "@/customs/inbox";
import html2canvas from "html2canvas";
import MessageEntity from "@/domain/entities/MessageEntity";
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  ModalProps,
  Heading,
} from "@chakra-ui/react";
import { useRef } from "react";
import { BigHead } from "@bigheads/core";

interface MessageModalProps extends Omit<ModalProps, "children"> {
  data: MessageEntity | null;
}

const MessageModal = (props: MessageModalProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const downloadImage = async () => {
    const target = ref.current;
    if (!target) return;

    const data = await html2canvas(target, {
      backgroundColor: null,
    });

    const link = document.createElement("a");
    link.download = `image-ask-${props.data!.nid}.png`;
    link.href = data.toDataURL("png", "high");
    link.click();
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          #{((props.data?.nid || 0) + 1).toString().padStart(2, "0")} - Ask
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex ref={ref} alignItems="center">
            <Flex w={100}>
              <BigHead {...props.data?.avatar} />
            </Flex>
            <MessageBox mt="0" w="100%" bg="gray.700" borderWidth="1px">
              <Flex
                bg="blackAlpha.300"
                alignItems="center"
                justifyContent="space-between"
              >
                <h1>Anonymous</h1>
              </Flex>
              <Flex h={115}>
                <Heading
                  fontSize={15}
                  fontWeight="normal"
                  noOfLines={3}
                >
                  {props.data?.message}
                </Heading>
              </Flex>
            </MessageBox>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={downloadImage}>
            Download
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MessageModal;
