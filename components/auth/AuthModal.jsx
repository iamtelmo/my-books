// Libraries
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  HStack,
  Image,
  Text,
  Center,
  VStack,
} from "@chakra-ui/react";

// Providers
import { signIn } from "next-auth/react";

const AuthModal = () => {
  return (
    <Modal size="2xl" isOpen={true} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Center>
            <HStack>
              <Image src="/logo.png" alt="Logo" boxSize="20px" mr={1} />
              <Text fontSize="xl" fontWeight="bold">
                MyBooks
              </Text>
            </HStack>
          </Center>
        </ModalHeader>
        <ModalBody>
          <Center>
            <VStack spacing={8}>
              <Text fontSize="lg" fontStyle="italic" align="center">
                Welcome to MyBooks! Start creating your own professional book
                portfolio by logging in with Google.
              </Text>
              <Button onClick={() => signIn("google")}>
                Login with Google
              </Button>
            </VStack>
          </Center>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
