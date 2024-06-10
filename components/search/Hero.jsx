// Libraries
import React from "react";
import { Box, Flex, Text, Center } from "@chakra-ui/react";

// Components
import Search from "./Search";

const Hero = ({}) => {
  return (
    <Box
      position="relative"
      height="400px"
      backgroundImage="/hero.png"
      backgroundSize="cover"
      backgroundPosition="center"
      display="flex"
      alignItems="center"
      justifyContent="center"
      rounded="2xl"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        backgroundColor="rgba(0, 0, 0, 0.5)"
        rounded="2xl"
      />
      <Flex direction="column" align="center" zIndex={1}>
        <Text
          fontSize={{ base: "2xl", lg: "4xl" }}
          fontWeight="bold"
          color="white"
          mb={8}
        >
          Discover a Book
        </Text>
        <Center>
          <Search />
        </Center>
      </Flex>
    </Box>
  );
};

export default Hero;
