// Libraries
import React from "react";
import {
  Popover,
  Box,
  PopoverTrigger,
  PopoverContent,
  FocusLock,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";

// Icons
import { EditIcon } from "@chakra-ui/icons";

// Components
import UserProfileForm from "./UserProfileForm";

const UserProfileFormPopover = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);

  const handleSave = () => {
    onClose();
  };

  return (
    <>
      <Box display="inline-block">Edit Profile</Box>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement="right"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <IconButton size="sm" icon={<EditIcon />} />
        </PopoverTrigger>
        <PopoverContent p={5}>
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <UserProfileForm
              firstFieldRef={firstFieldRef}
              onCancel={onClose}
              onSave={handleSave}
            />
          </FocusLock>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default UserProfileFormPopover;
