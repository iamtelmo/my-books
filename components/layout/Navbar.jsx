// Libraries
import {
  Flex,
  Text,
  Image,
  Badge,
  Box,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Link as ChakraLink,
} from "@chakra-ui/react";
import NextLink from "next/link";

// Providers
import { useUser } from "providers/userProvider";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      width="100vw"
      padding="1.5rem"
      bg="white"
      boxShadow="sm"
    >
      <Flex align="center" justify="space-between" mr={5} width="100%">
        <ChakraLink as={NextLink} href="/">
          <Image src="/logo.png" alt="Logo" boxSize="20px" mr={1} />
        </ChakraLink>
        <Text fontSize="xl" fontWeight="bold">
          <ChakraLink as={NextLink} href="/">
            My Books
          </ChakraLink>
          <Badge ml={2}>Demo</Badge>
        </Text>
        {/* the box is used as a trick to align elements */}
        <Box visibility="hidden" flexGrow={1} />
        <UserMenu />
      </Flex>
    </Flex>
  );
};

const UserMenu = () => {
  const { name, profilePic } = useUser();
  const { data: session } = useSession();
  return (
    <>
      <Menu>
        <MenuButton as="button">
          <Avatar name={name ?? "User Name"} src={profilePic?.url || null} />
        </MenuButton>
        <MenuList>
          <MenuItem disabled>Welcome, {session?.user.name ?? ""}</MenuItem>
          <ChakraLink as={NextLink} href="/library">
            <MenuItem>Library</MenuItem>
          </ChakraLink>
          <MenuItem onClick={() => (session ? signOut() : signIn())}>
            {session ? "Log out" : "Sign in"}
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default Navbar;
