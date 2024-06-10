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
const HYGRAPH_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MTc2MjYzNTksImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vdjIvY2x3dzlhczRoMDZhZTA3dzg2c3F5emRwcy9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vIiwic3ViIjoiZGQwYjkyMGItOGI1Yi00YmJhLWFkMDYtYzFiYTQ0Yzg4ZDVjIiwianRpIjoiY2x4MmVkeDZhMDR4aDA2dXRkZDdjZmZ1aSJ9.onvoslXdIAq-8eystv87PMNCXNOl9GU4QAhB2x7UBLatYe_AlSSXm4KU9tUrHbkI9JDyyazdRDYw3uEAIvW0l9Op-6oahOOHkYXGV2-8uW-IVrCDxaPFWUHc1MgL94kYY56s1VAAUl021OQqwuLRaYWtC49r2QtHH8dFxN-dgC6aj8gMO-O7wE7S-BkjSPQlCT7jE4nLjReeL3Jll-nLzHI31FpavO-UdUryYbe_SJ2bVPk665fyXRhYodGcY9SM8m2kqpd7BFxjHVvzFBayHGG2RV1eD4jT_5bwBMgv6iAa1E-QMeaAg4v66E0fXwjH9frL-VWksWAjhdBXTrkdSDYHFzzNwO_J2SKhYxV2q2sWDIr7WP4SBHURDnQW8Cvv6STJF-N_GETirW7aMV8nKiOAQ8ZektNGz86sFC6PhiReF4ZbKfpIeq-nC-d3yg9XovE3dLrCGdkrQi21dIWRngvTVYE_wmpfOJfICbrUKg42cY7v4CV5msTiyAlJEIwDfgwNraEkOipQxqqnZRaxyUQrdTNT1dah1yK-UZdJEPzL8-t_1l5wSUXQSY0WL6Q8j4oS1Hglky8ttaS1n9Or2mXl9sKHpUs-jHyD4pKB7MaDCCaSg7a6dgM3wMDBexuHNJJvjNsFWnQ3OLpy04RqAWLY-rvqbJy0B6f4rqRfsoM";

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
