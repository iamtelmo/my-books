// Libraries
import {
  Button,
  Box,
  Flex,
  Image,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import DOMPurify from "dompurify"; // Correct import statement

// Providers
import { useRouter } from "next/router";

// Services
import GoogleService from "../../services/googleService";

// Components
import { ArrowBackIcon } from "@chakra-ui/icons";
import AddToLibrary from "../../components/library/AddToLibraryButton";
import { useEffect } from "react";
import { useState } from "react";

const BookPage = ({ book }) => {
  const router = useRouter();
  const [sanitizedDescription, setSanitizedDescription] = useState("");
  useEffect(() => {
    const description = DOMPurify.sanitize(book.description);
    setSanitizedDescription(description);
  }, [book]);

  return (
    <>
      <Button onClick={() => router.back()} leftIcon={<ArrowBackIcon />}>
        Back
      </Button>
      <Box p={5}>
        <Flex direction={{ base: "column", md: "row" }} mb={8}>
          <Image
            src={book.imageUrl}
            alt={book.title}
            boxSize="300px"
            objectFit="contain"
            mr={8}
          />
          <Box>
            <HStack width="100%" justify="space-between">
              <Heading as="h1" size={{ base: "lg" }}>
                {book.title}
              </Heading>
              <AddToLibrary bookId={book.id} />
            </HStack>
            <Text fontSize="lg" color="gray.500">
              {book.author}
            </Text>
          </Box>
        </Flex>
        <Box dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
      </Box>
    </>
  );
};

export default BookPage;

export async function getStaticPaths() {
  const paths = [{ params: { id: "PGR2AwAAQBAJ" } }];

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  let book = null;

  try {
    const { id } = params;
    book = await GoogleService.fetchBook(id);
  } catch (error) {
    console.error("Error fetching book:", error);
  }

  return {
    props: {
      book,
    },
    revalidate: 60,
  };
}
