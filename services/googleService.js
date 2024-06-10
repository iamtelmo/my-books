import axios from "axios";
import rateLimit from "axios-rate-limit";

const http = rateLimit(axios.create(), {
  maxRequests: 5,
  perMilliseconds: 1000,
  maxRPS: 5,
});

http.getMaxRPS();

const GOOGLE_API_KEY = "AIzaSyDHgoJEAp_yivVdF0WcPOUausUdaBvGD6I";
const LANGUAGE = "langRestrict=en";

class GoogleService {
  static fetchBook = async (bookId) => {
    const GOOGLE_API_URL = `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${GOOGLE_API_KEY}&${LANGUAGE}`;

    try {
      const response = await http.get(GOOGLE_API_URL);
      const volumeInfo = response.data.volumeInfo;

      const book = {
        id: response.data.id,
        title: volumeInfo.title,
        author: volumeInfo.authors ? volumeInfo.authors[0] : "Unknown",
        description: volumeInfo.description || "No description available",
        imageUrl: volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : "",
      };

      return book;
    } catch (error) {
      console.error(`Error fetching book with ID ${bookId}:`, error);
      return null;
    }
  };

  static fetchBooksByID = async (bookIds) => {
    try {
      const books = await Promise.all(
        bookIds.map(async (id) => {
          return await GoogleService.fetchBook(id);
        }),
      );
      return books;
    } catch (error) {
      console.log("Failed to fetch books");
      return [];
    }
  };

  static fetchPopularBooks = async () => {
    try {
      const GENRE = "biography";
      const API_URL = `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(GENRE)}&orderBy=newest&maxResults=20&${LANGUAGE}&key=${GOOGLE_API_KEY}`;

      const response = await http.get(API_URL);
      const books = response.data.items;

      return books.map((book) => book.id);
    } catch (error) {
      console.error("Error fetching popular books:", error);
      return [];
    }
  };

  static async fetchUserSearch(query) {
    try {
      const API_URL = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        query,
      )}&${LANGUAGE}&key=${GOOGLE_API_KEY}`;

      const response = await http.get(API_URL);

      if (response.data && response.data.items) {
        const books = response.data.items.map((item) => {
          const volumeInfo = item.volumeInfo || {};
          return {
            id: item.id,
            title: volumeInfo.title || "No title available",
            author: volumeInfo.authors ? volumeInfo.authors[0] : "Unknown",
            description: volumeInfo.description || "No description available",
            imageUrl: volumeInfo.imageLinks
              ? volumeInfo.imageLinks.thumbnail
              : "",
          };
        });
        return books;
      } else {
        console.log("No items found in the response");
        return [];
      }
    } catch (error) {
      console.error("Error fetching user search:", error.message);
      return [];
    }
  }
}

export default GoogleService;
