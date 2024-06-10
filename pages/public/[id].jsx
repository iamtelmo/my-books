// Libraries
import { HStack, Heading, Wrap, Center, Box, Spinner } from "@chakra-ui/react";

// Providers
import { useSession } from "next-auth/react";

// Services
import HyGraphService from "services/hygraphService";

// Components
import BookGrid from "components/library/BookGrid";
import UserProfile from "components/profile/UserProfile";

const PublicProfile = ({ userDetails, library }) => {
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
      <UserProfile userDetails={userDetails} isPublic={true} />
      <HStack p={4}>
        <Wrap justify="space-between" w="100%">
          <Box width="100%">
            <Heading bg="gray.100" display="block"></Heading>
            <BookGrid
              library={library.books}
              title="Public Library"
              isGallery={true}
            />
          </Box>
        </Wrap>
      </HStack>
    </>
  );
};

export default PublicProfile;

export async function getStaticPaths() {
  // Pre-generate paths for popular book IDs (replace with actual popular book IDs or logic)
  const paths = [{ params: { id: "103346694496266430204" } }];

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  let userDetails = null;
  let library = null;
  try {
    let { id } = params;
    userDetails = await HyGraphService.getUserDetailsService(id);

    library = await HyGraphService.getUserLibraryService(id);
  } catch (error) {
    console.error("Error fetching book:", error);
  }

  return {
    props: {
      userDetails,
      library,
    },
    revalidate: 60,
  };
}
