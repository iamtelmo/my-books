// Libraries
import { HStack, Heading, Wrap, Center, Box, Spinner } from "@chakra-ui/react";

// Providers
import { useUser } from "providers/userProvider";
import { useSession } from "next-auth/react";

// Components
import UserProfile from "components/profile/UserProfile";
import BookGrid from "components/library/BookGrid";

const Library = () => {
  const { library } = useUser();
  const { status } = useSession();

  if (status === "loading") {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <>
      <UserProfile />
      <HStack p={4}>
        <Wrap justify="space-between" w="100%">
          <Box width="100%">
            <Heading bg="gray.100" display="block"></Heading>
            <BookGrid isGallery={true} library={library} title="Your Library" />
          </Box>
        </Wrap>
      </HStack>
    </>
  );
};

export default Library;
