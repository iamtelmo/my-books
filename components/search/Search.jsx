// Libraries
import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  Flex,
  Stack,
  Text,
  Image,
  FormControl,
  Wrap,
} from "@chakra-ui/react";
import Link from "next/link";

// Services
import GoogleService from "services/googleService";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (query && query !== "") {
      try {
        const books = await GoogleService.fetchUserSearch(query);
        setSearchResults(books);
      } catch (error) {
        console.error("An error occurred while fetching the books", error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Flex align="center">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for books..."
              size="lg"
              width="300px"
              bg="white"
              borderRadius="md"
            />
            <Button type="submit" ml={2} size="lg" borderRadius="md">
              Search
            </Button>
          </Flex>
        </FormControl>
      </form>
      {searchResults.length > 0 && (
        <Box
          mt={2}
          width="300px"
          bg="white"
          borderRadius="md"
          boxShadow="md"
          zIndex={2}
          maxHeight="200px"
          overflowY="auto"
        >
          <Stack spacing={2}>
            {searchResults.map((book) => (
              <Link href={`/books/${book.id}`} passHref key={book.id}>
                <Flex p={2} align="center" _hover={{ bg: "gray.100" }}>
                  <Image
                    src={book.imageUrl}
                    alt={book.title}
                    boxSize="50px"
                    objectFit="cover"
                    mr={3}
                  />
                  <Box flexGrow={1}>
                    <Text fontWeight="bold">{book.title}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {book.author}
                    </Text>
                  </Box>
                </Flex>
              </Link>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
