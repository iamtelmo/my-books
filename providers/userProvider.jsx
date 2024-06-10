// libraries
import React, { createContext, useState, useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

// services
import HyGraphService from "services/hygraphService";

// components
import AuthModal from "components/auth/AuthModal";

const UserContext = createContext({
  userExists: null,
  library: [],
  name: "",
  email: "",
  bio: "",
  profilePic: "",
  role: "",
  company: "",
  fetchLibrary: () => {},
  updateLibrary: () => {},
  removeBookFromLibrary: () => {},
  setUserId: () => {},
  updateUserName: () => {},
  updateUserProfilePic: () => {},
  updateUserCompany: () => {},
});

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const router = useRouter();
  const isPublicPath = router.pathname.startsWith("/public/");

  const { data: session, status } = useSession();
  const [userExists, setUserExists] = useState(null);
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [library, setLibrary] = useState([]);

  useEffect(() => {
    if (session) {
      setUserId(session.user.id);
    }
  }, [session]);

  useEffect(() => {
    if (userId) {
      checkUser();
    }
  }, [userId]);

  const checkUser = async () => {
    try {
      console.log("userpro:", userId);
      const exists = await HyGraphService.checkUserExistsService(userId);
      setUserExists(exists);

      if (!exists && session) {
        await HyGraphService.createUserService(
          session.user.id,
          session.user.name,
          session.user.email,
        );
      } else if (exists) {
        fetchLibrary(userId);
        fetchUserDetails(userId);
      }
    } catch (error) {
      console.error("Error checking user existence:", error);
    }
  };

  const fetchLibrary = async (userId) => {
    try {
      const lib = await HyGraphService.getUserLibraryService(userId);
      setLibrary(lib.books);
    } catch (error) {
      console.error("Error fetching user library:", error);
    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      const userDetails = await HyGraphService.getUserDetailsService(userId);

      setName(userDetails.name);
      setEmail(userDetails.email);
      setProfilePic(userDetails.profilePic);
      setBio(userDetails.bio);
      setRole(userDetails.role);
      setCompany(userDetails.company);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const updateUserLibrary = async (userId, bookId) => {
    try {
      await HyGraphService.updateUserLibraryService(userId, bookId);
      fetchLibrary(userId);
    } catch (error) {
      console.error("Error updating library:", error);
    }
  };

  const updateUserName = async (newName) => {
    try {
      await HyGraphService.updateUserNameService(userId, newName);
      setName(newName);
    } catch (error) {
      console.error("Error updating user name:", error);
    }
  };

  const updateUserProfilePic = async (newProfilePic) => {
    try {
      await HyGraphService.updateUserProfilePicService(userId, newProfilePic);
      setProfilePic(newProfilePic);
    } catch (error) {
      console.error("Error updating user profile picture:", error);
    }
  };

  const updateUserBio = async (newBio) => {
    try {
      await HyGraphService.updateUserBioService(userId, newBio);
      setBio(newBio);
    } catch (error) {
      console.error("Error updating user bio:", error);
    }
  };

  const updateUserRole = async (newRole) => {
    try {
      await HyGraphService.updateUserRoleService(userId, newRole);
      setRole(newRole);
    } catch (error) {
      console.error("Error updating user rol:", error);
    }
  };

  const updateUserCompany = async (newCompany) => {
    try {
      await HyGraphService.updateUserCompanyService(userId, newCompany);
      setCompany(newCompany);
    } catch (error) {
      console.error("Error updating user company:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userExists,
        name,
        email,
        profilePic,
        bio,
        company,
        role,
        library,
        updateUserLibrary,
        fetchLibrary,
        setUserId,
        updateUserName,
        updateUserProfilePic,
        updateUserCompany,
        updateUserBio,
        updateUserRole,
        userId,
      }}
    >
      {status === "loading" ? (
        <div>Loading...</div>
      ) : !session && !isPublicPath ? (
        <AuthModal />
      ) : (
        children
      )}
    </UserContext.Provider>
  );
};
