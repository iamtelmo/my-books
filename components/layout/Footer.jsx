import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box as="footer" width="100%" padding="4" color="white" textAlign="center">
      <Text color="black">
        By Telmo Beroiz &copy; {new Date().getFullYear()}
      </Text>
    </Box>
  );
};

export default Footer;
