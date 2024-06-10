// Libraries
import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";

// Icons
import { IconButton } from "@chakra-ui/react";
import { CiBookmark, CiBookmarkMinus } from "react-icons/ci";

// Providers
import { useUser } from "providers/userProvider";

const AddToLibraryButton = ({ bookId }) => {
  const { userId, library, fetchLibrary, updateUserLibrary } = useUser();
  const [isActive, setIsActive] = useState(false);
  const toast = useToast();

  const handleAddToLibrary = async (e) => {
    e.preventDefault();
    try {
      await updateUserLibrary(userId, bookId);
      fetchLibrary(userId);
      setIsActive(!isActive);

      toast({
        title: "",
        description: "Your library has been updated",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating library:", error);
    }
  };

  useEffect(() => {
    const result = library.indexOf(bookId) !== -1;
    setIsActive(result);
  }, [library, bookId]);

  return (
    <IconButton
      icon={isActive ? <CiBookmarkMinus /> : <CiBookmark />}
      color={isActive ? "red" : "gray"}
      onClick={handleAddToLibrary}
      aria-label="Add to library"
    />
  );
};
export default AddToLibraryButton;
