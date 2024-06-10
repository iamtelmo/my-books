import {
  Button,
  Box,
  Flex,
  Image,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import DOMPurify from "dompurify";
import { useRouter } from "next/router";
import GoogleService from "../../services/googleService";
import { ArrowBackIcon } from "@chakra-ui/icons";
import AddToLibrary from "../../components/library/AddToLibraryButton";
import { useEffect, useState } from "react";

const BookPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState(null);
  const [sanitizedDescription, setSanitizedDescription] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        try {
          const fetchedBook = await GoogleService.fetchBook(id);
          setBook(fetchedBook);
          const description = DOMPurify.sanitize(fetchedBook?.description);
          setSanitizedDescription(description);
        } catch (error) {
          console.error("Error fetching book:", error);
          setError(error);
        }
      };

      fetchBook();
    }
  }, [id]);

  if (error) {
    return (
      <>
        <Button onClick={() => router.back()} leftIcon={<ArrowBackIcon />}>
          Back
        </Button>
        <Text mt={4}> There was an issue loading this book</Text>
      </>
    );
  }

  if (!book) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <Button onClick={() => router.back()} leftIcon={<ArrowBackIcon />}>
        Back
      </Button>
      <Box p={5}>
        <Flex direction={{ base: "column", md: "row" }} mb={8}>
          <Image
            src={book?.imageUrl}
            alt={book?.title || "book cover"}
            boxSize="300px"
            objectFit="contain"
            mr={8}
          />
          <Box>
            <HStack width="100%" justify="space-between">
              <Heading as="h1" size={{ base: "lg" }}>
                {book?.title || "Could not load the title"}
              </Heading>
              <AddToLibrary bookId={book?.id} />
            </HStack>
            <Text fontSize="lg" color="gray.500">
              {book?.author || "Unknown"}
            </Text>
          </Box>
        </Flex>
        <Box dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
      </Box>
    </>
  );
};

export default BookPage;
