// Libraries
import React, { useState, useEffect } from "react";
import {
  Stack,
  ButtonGroup,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@chakra-ui/react";

// Providers
import { useUser } from "providers/userProvider";

const UserProfileForm = ({ firstFieldRef, onCancel, onSave }) => {
  const {
    name,
    company,
    role,
    profilePic,
    bio,
    updateUserName,
    updateUserProfilePic,
    updateUserBio,
    updateUserCompany,
    updateUserRole,
  } = useUser();

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    role: "",
    profileUrl: "",
    bio: "",
  });

  useEffect(() => {
    setFormData({
      name: name || "",
      company: company || "",
      role: role || "",
      profileUrl: profilePic?.url || "",
      bio: bio || "",
    });
  }, [name, company, role, profilePic, bio]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (formData.name !== name) {
        await updateUserName(formData.name);
      }
      if (formData.profileUrl !== profilePic?.url) {
        await updateUserProfilePic(formData.profileUrl);
      }
      if (formData.bio !== bio) {
        await updateUserBio(formData.bio);
      }
      if (formData.company !== company) {
        await updateUserCompany(formData.company);
      }
      if (formData.role !== role) {
        await updateUserRole(formData.role);
      }

      onSave && onSave();
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  return (
    <Stack spacing={4}>
      <TextInput
        label="Name"
        id="name"
        ref={firstFieldRef}
        value={formData.name}
        onChange={handleChange}
      />
      <TextInput
        label="Company"
        id="company"
        value={formData.company}
        onChange={handleChange}
      />
      <TextInput
        label="Role"
        id="role"
        value={formData.role}
        onChange={handleChange}
      />
      <FormControl>
        <FormLabel htmlFor="profileUrl">Profile Picture URL</FormLabel>
        <Input
          id="profileUrl"
          value={formData.profileUrl}
          onChange={handleChange}
          isDisabled
        />
        <FormHelperText>Profile URL is disabled for now.</FormHelperText>
      </FormControl>
      <TextInput
        label="Bio"
        id="bio"
        value={formData.bio}
        onChange={handleChange}
      />
      <ButtonGroup display="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button colorScheme="teal" onClick={handleSubmit}>
          Save
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

const TextInput = React.forwardRef((props, ref) => (
  <FormControl>
    <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
    <Input ref={ref} id={props.id} {...props} />
  </FormControl>
));

export default UserProfileForm;
