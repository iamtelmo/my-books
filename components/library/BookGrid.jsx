// Libraries
import {
  Box,
  Heading,
  SimpleGrid,
  Flex,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";

// Components
import BookItem from "./BookItem";
import GoogleService from "services/googleService";

// Hooks
import { useArrayState } from "hooks/useArrayState";

const BookGrid = ({ library, title, isGallery = false }) => {
  const [books, setBooks] = useArrayState([]);
  const [loading, setLoading] = useState(false);

  const clear = useCallback(() => {
    setBooks(() => []);
  }, [setBooks]);

  useEffect(() => {
    const fetchBooks = async () => {
      clear();
      setLoading(true);
      try {
        const fetchedBooks = await GoogleService.fetchBooksByID(library);
        setBooks((newArray) => {
          fetchedBooks
            .filter((book) => book !== null)
            .forEach((book) => {
              newArray.push(book);
            });
        });
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    };

    if (library.length > 0) {
      fetchBooks();
    }
  }, [library, clear, setBooks]);

  return (
    <Box>
      <Flex align="center" justify="space-between">
        <Heading size={{ base: "lg", sm: "md", lg: "xl" }} mt={8} mb={8}>
          {title}
        </Heading>
      </Flex>
      {loading ? (
        <Center>
          <Spinner size="xl" />
        </Center>
      ) : (
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={10}>
          {books.map((book) => (
            <BookItem key={book.id} {...book} isGallery={isGallery} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default BookGrid;
