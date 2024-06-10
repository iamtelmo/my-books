// Libraries
import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Avatar,
  Heading,
  Text,
  HStack,
  VStack,
  Stack,
  Button,
  useToast,
} from "@chakra-ui/react";

// Icons
import { FaRegBuilding } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

// Components
import PopOver from "./UserProfileFormPopover";

// Providers
import { useUser } from "providers/userProvider";

const UserProfile = ({ userDetails = undefined, isPublic = false }) => {
  const { name, email, bio, profilePic, role, company } = useUser();
  const [user, setUser] = useState({
    name: "",
    email: "",
    bio: "",
    profilePic: "",
    role: "",
    company: "",
  });

  useEffect(() => {
    if (isPublic && userDetails) {
      setUser({
        name: userDetails.name || "",
        email: userDetails.email || "",
        bio: userDetails.bio || "",
        profilePic: userDetails.profilePic || "",
        role: userDetails.role || "",
        company: userDetails.company || "",
      });
    }
  }, [userDetails, isPublic]);

  useEffect(() => {
    if (!isPublic) {
      setUser({
        name,
        email,
        bio,
        profilePic,
        role,
        company,
      });
    }
  }, [isPublic, name, email, bio, profilePic, role, company]);

  return (
    <Box>
      <Stack direction="column" spacing={6}>
        <Stack direction={{ base: "column", xl: "row" }} spacing={4}>
          <Avatar
            size="2xl"
            name={user?.name}
            src={user?.profilePic?.url || null}
          />
          <VStack align="start" spacing={1}>
            <Heading as="h2" size="xl">
              {user?.name}
            </Heading>
            <HStack align="center">
              <CiMail />
              <Text fontSize="lg">{user?.email}</Text>
            </HStack>
            <HStack align="center">
              <FaRegBuilding />
              <Text fontSize="lg" wordBreak={false}>
                {user?.role} at @{user?.company}
              </Text>
            </HStack>
            <Text fontSize="md" color="gray.600">
              {user?.bio}
            </Text>
          </VStack>
        </Stack>
        {!isPublic && (
          <HStack spacing={4} justify="flex-end">
            <PopOver />
            <ShareButton />
          </HStack>
        )}
      </Stack>
    </Box>
  );
};

const ShareButton = () => {
  const { userId } = useUser();
  const DOMAIN_URL = "https://my-books-mu.vercel.app";
  const toast = useToast();

  const handleShareClick = useCallback(() => {
    const shareUrl = `${DOMAIN_URL}/public/${userId}`;

    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        toast({
          title: "Link copied!",
          description: "The shareable link has been copied to your clipboard.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        toast({
          title: "Failed to copy",
          description: "Could not copy the link to the clipboard.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  }, [DOMAIN_URL, userId, toast]);

  return (
    <Button colorScheme="blue" onClick={handleShareClick}>
      Share Library
    </Button>
  );
};

export default UserProfile;
