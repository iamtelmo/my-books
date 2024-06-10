// Libraries
import { Box, Image, Text, Wrap, WrapItem } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";

// Components
import AddToLibrary from "./AddToLibraryButton";

const BookItem = ({ id, imageUrl, title, author, isGallery = false }) => {
  const [showIcon, setShowIcon] = useState(false);

  return (
    <Link href={`/books/${id}`} passHref>
      <Box
        overflow="hidden"
        position="relative"
        onMouseEnter={() => setShowIcon(true)}
        onMouseLeave={() => setShowIcon(false)}
      >
        <Box>
          <Image
            objectFit="cover"
            src={imageUrl}
            alt={`${title} cover`}
            rounded="lg"
          ></Image>
          {showIcon && !isGallery && (
            <Box position="absolute" top="10px" right="10px">
              <AddToLibrary bookId={id} />
            </Box>
          )}
        </Box>
        <Wrap pt={4}>
          <WrapItem>
            <Text fontWeight="bold" as="h4" lineHeight="tight" isTruncated>
              {title}
            </Text>
          </WrapItem>
          <WrapItem>
            <Text color="gray.500">{author}</Text>
          </WrapItem>
        </Wrap>
      </Box>
    </Link>
  );
};

export default BookItem;
