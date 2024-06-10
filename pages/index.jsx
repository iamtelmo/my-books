// Libraries
import { SlideFade, Center, Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";

// Services
import GoogleService from "services/googleService";

// Components
import Hero from "../components/search/Hero";
import BookGrid from "../components/library/BookGrid";

// Custom hook for fetching books
const useFetchBooks = () => {
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const cachedBookList = localStorage.getItem("books_list");

      // If books list exists in local storage, use it
      if (cachedBookList) {
        const localLib = JSON.parse(cachedBookList);
        setLibrary(localLib);
        setLoading(false);
      } else {
        try {
          const list = await GoogleService.fetchPopularBooks();
          if (list.length > 0) {
            localStorage.setItem("books_list", JSON.stringify(list));
            setLibrary(list);
          } else {
            console.log(
              "Redirecting to maintenance page or handling empty list",
            );
          }
        } catch (error) {
          console.error("Error fetching books:", error);
          setError("Failed to fetch books. Please try again later.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBooks();
  }, []);

  return { library, loading, error };
};

const IndexPage = () => {
  const { library, loading, error } = useFetchBooks();

  if (loading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center height="100vh">
        <p>{error}</p>
      </Center>
    );
  }

  return (
    <>
      <Hero />
      <SlideFade in={true} delay={0.3} offsetY="50px">
        <BookGrid library={library} title="Popular Books" />
      </SlideFade>
    </>
  );
};

export default IndexPage;
