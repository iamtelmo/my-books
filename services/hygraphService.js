import { request, GraphQLClient } from "graphql-request";
import {
  checkUserExistsQuery,
  createUserMutation,
  getUserDetailsQuery,
  getUserLibraryQuery,
  updateUserBioMutation,
  updateUserLibraryMutation,
  uploadUserPicMutation,
  updateUserRoleMutation,
  publishUserMutation,
  updateUserNameMutation,
  updateUserCompanyMutation,
} from "./queries";

const HYGRAPH_ENDPOINT =
  "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clww9as4h06ae07w86sqyzdps/master";
const HYGRAPH_TOKEN = process.env.HYGRAPH_TOKEN;

const client = new GraphQLClient(HYGRAPH_ENDPOINT, {
  headers: {
    authorization: `Bearer ${HYGRAPH_TOKEN}`,
  },
});

class HyGraphService {
  static updateUserBioService = async (userId, bio) => {
    try {
      const data = await client.request(updateUserBioMutation, {
        userId,
        bio,
      });

      await client.request(publishUserMutation, { userId });
      return data.nextusers;
    } catch (error) {
      console.error("Error updating user bio:", error);
      throw error;
    }
  };

  static updateUserCompanyService = async (userId, company) => {
    try {
      const data = await client.request(updateUserCompanyMutation, {
        userId,
        company,
      });

      await client.request(publishUserMutation, { userId });
      return data.nextusers;
    } catch (error) {
      console.error("Error updating user company:", error);
      throw error;
    }
  };

  static updateUserRoleService = async (userId, role) => {
    try {
      const data = await client.request(updateUserRoleMutation, {
        userId,
        role,
      });

      await client.request(publishUserMutation, { userId });
      return data.nextusers;
    } catch (error) {
      console.error("Error updating user company:", error);
      throw error;
    }
  };

  static updateUserNameService = async (userId, name) => {
    try {
      const data = await client.request(updateUserNameMutation, {
        userId,
        name,
      });
      return data.nextusers;
    } catch (error) {
      console.error("Error updating user name:", error);
      throw error;
    }
  };

  static updateUserProfilePicService = async (userId, url) => {
    try {
      // Upload the user picture
      const assetData = await client.request(uploadUserPicMutation, {
        url,
        userId,
      });
      const id = assetData.createAsset.id;

      if (!id) {
        throw new Error("Uploaded asset is incomplete or invalid");
      }

      return data.updateNextuser.id;
    } catch (error) {
      console.error("Error updating user profile picture:", error);
      throw error;
    }
  };

  static getUserDetailsService = async (userId) => {
    try {
      const data = await client.request(getUserDetailsQuery, {
        userId,
      });
      return data.nextusers[0];
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error;
    }
  };

  static checkUserExistsService = async (userId) => {
    try {
      console.log("function called:", userId, HYGRAPH_ENDPOINT);
      const data = await client.request(checkUserExistsQuery, {
        userId,
      });
      return data.nextusers.length > 0;
    } catch (error) {
      console.error("Error checking if user exists:", error);
      throw error;
    }
  };

  static createUserService = async (userId, name, email) => {
    const library = {
      books: [],
    };

    try {
      const user = await client.request(createUserMutation, {
        userId,
        name,
        email,
        library,
      });
      return user.createNextuser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };

  static getUserLibraryService = async (userId) => {
    try {
      const result = await client.request(getUserLibraryQuery, {
        userId,
      });
      return result.nextuser.library;
    } catch (error) {
      console.error("Error getting user library:", error);
      throw error;
    }
  };

  static updateUserLibraryService = async (userId, bookId) => {
    try {
      const library = await HyGraphService.getUserLibraryService(userId);
      const index = library.books.indexOf(bookId);

      if (index === -1) {
        library.books.push(bookId);
      } else {
        library.books = library.books.filter((itemId) => itemId !== bookId);
      }

      const result = await client.request(updateUserLibraryMutation, {
        userId,
        library,
      });
      return result.updateNextuser;
    } catch (error) {
      console.error("Error updating user library:", error);
      throw error;
    }
  };
}

export default HyGraphService;
