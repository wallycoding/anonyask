import { Title } from "~/app.layout";
import {
  Button,
  Container,
  Flex,
  Image,
  Menu,
  MenuItem,
  MenuButton,
  IconButton,
  MenuList,
  useColorMode,
  Heading,
  Badge,
} from "@chakra-ui/react";
import { HamburgerIcon, UpDownIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useAuth } from "@/providers/AuthProvider";
import signOut from "@/data/signOut";
import signInGoogle from "@/data/signInGoogle";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = (props: AppLayoutProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  const { user } = useAuth();

  return (
    <Container maxW="container.lg">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        px="5"
        py="0.5"
        mt="1.5"
        bg="gray.700"
        borderRadius="sm"
        dropShadow="dark-lg"
      >
        <Title>
          <Badge>Inbox</Badge>
        </Title>
        <Heading fontSize="sm">{user?.displayName}</Heading>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Settings"
            icon={<HamburgerIcon />}
            variant="unstyle"
          />
          <MenuList>
            <MenuItem>
              {user?.photoURL && (
                <Image
                  boxSize="2rem"
                  borderRadius="full"
                  src={user?.photoURL}
                  mr="12px"
                />
              )}
              <Heading fontSize="sm">{user?.displayName}</Heading>
            </MenuItem>
            <MenuItem
              onClick={toggleColorMode}
              icon={isDarkMode ? <SunIcon /> : <MoonIcon />}
            >
              {isDarkMode ? "Light " : "Dark "}
              Theme
            </MenuItem>
            <MenuItem onClick={signOut} icon={<UpDownIcon />}>
              Log out
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Flex flex="1">{props.children}</Flex>
    </Container>
  );
};

export default AppLayout;
