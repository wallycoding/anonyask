import {
  Badge,
  Button,
  Flex,
  Heading,
  Skeleton,
  Stack,
  Tooltip,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { MessageBox } from "@/customs/inbox";
import { useAuth } from "@/providers/AuthProvider";
import useMessages from "@/hooks/useMessages";
import getCodeInfo from "@/data/getCodeInfo";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  AttachmentIcon,
  ChatIcon,
  ChevronUpIcon,
} from "@chakra-ui/icons";
import { useSearchParams } from "react-router-dom";
import MessageModal from "@/components/Inbox/MessageModal";
import MessageEntity from "@/domain/entities/MessageEntity";

const Inbox = () => {
  const [queries, setQueries] = useSearchParams();
  const { user, userDB } = useAuth();
  const { code } = userDB!;

  const itemsPerPage = 20;
  const [totalSize, setTotalSize] = useState(0);
  const [page, setPage] = useState(() => {
    const page = Number(queries.get("page"));
    return page && page >= 1 ? page : 1;
  });
  const [messages, setMessages, loadingMessages] = useMessages(
    code,
    page,
    itemsPerPage
  );
  const [selectedMessage, setSelectedMessage] = useState<null | MessageEntity>(
    null
  );
  const [isCopied, setIsCopied] = useState(false);

  const linkCopy = `${window.location.host}/ask/${code}`;
  const totalPages = Math.ceil(totalSize / itemsPerPage);
  const sizeSkeletonItems =
    page === totalPages ? totalSize % itemsPerPage : itemsPerPage;

  useEffect(() => {
    if (!code) return;
    getCodeInfo(code).then((info) => {
      if (info) setTotalSize(info.count);
    });
  }, [code]);

  useEffect(() => {
    if (!user) {
      setMessages([]);
      setTotalSize(0);
    }
  }, [user]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(1);
      setQueries({ page: "1" });
    }
  }, [totalPages, page]);

  const changePage = (newPage: number) => () => {
    if (newPage <= totalPages && newPage > 0) {
      setPage(newPage);
      setQueries({ page: newPage.toString() });
    }
  };

  const movePage = (pageOperator: number) => changePage(page + pageOperator);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(linkCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  return (
    <Flex flexDirection="column" flex="1">
      <MessageModal
        isOpen={!!selectedMessage}
        data={selectedMessage}
        onClose={() => setSelectedMessage(null)}
      />
      <Flex mb="10px" mt="20px" alignItems="center">
        <ChatIcon mx="10px" />
        <Heading color="gray.100" fontSize="lg">
          Received Messages
        </Heading>
      </Flex>
      <Flex
        width="100%"
        flex="1"
        gap={2}
        justifyContent="space-between"
        flexWrap="wrap"
      >
        {!loadingMessages ? (
          messages.length ? (
            messages.map((ask) => {
              const { message, id } = ask;
              return (
                <MessageBox key={id} bg="gray.700">
                  <Flex
                    bg="blackAlpha.300"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <h1>Anonymous</h1>
                    <Button
                      size="smaller"
                      p="1px"
                      colorScheme="whiteAlpha"
                      onClick={() => setSelectedMessage(ask)}
                    >
                      <ChevronUpIcon fontSize={15} />
                    </Button>
                  </Flex>
                  <Flex>
                    <Heading fontSize={15} fontWeight="normal" noOfLines={2}>
                      {message}
                    </Heading>
                  </Flex>
                </MessageBox>
              );
            })
          ) : (
            <Flex w="full" bg="blackAlpha.100" py="10" justifyContent="center">
              <Heading fontSize={20}>
                <Badge py="3px" px="5px">
                  No have messages.
                </Badge>
              </Heading>
            </Flex>
          )
        ) : (
          Array(sizeSkeletonItems)
            .fill(null)
            .map((_, i) => {
              return (
                <Skeleton
                  key={i}
                  display="flex"
                  flex="1"
                  minWidth="156.25px"
                  height="82px"
                  borderRadius="10px"
                  mt="5px"
                />
              );
            })
        )}
      </Flex>
      <Flex mb="10px" mt="20px" alignItems="center">
        <AttachmentIcon mx="10px" />
        <Heading color="gray.100" fontSize="lg">
          Share - <Badge textTransform="lowercase">{linkCopy}</Badge>
        </Heading>
      </Flex>
      <Tooltip isOpen={isCopied} label="Copied To Clipboard">
        <Button onClick={copyToClipboard} colorScheme="gray">
          Copy Link
        </Button>
      </Tooltip>
      {!!totalSize && (
        <Flex
          width="100%"
          gap={2}
          my="20px"
          paddingTop="10px"
          borderTopWidth="1px"
        >
          <Button onClick={movePage(-1)}>
            <ArrowLeftIcon />
          </Button>
          {Array(totalPages)
            .fill(null)
            .map((_, i) => {
              return (
                <Button
                  colorScheme={i + 1 === page ? "twitter" : "gray"}
                  key={i}
                  onClick={changePage(i + 1)}
                >
                  {i + 1}
                </Button>
              );
            })}
          <Button onClick={movePage(1)}>
            <ArrowRightIcon />
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Inbox;
