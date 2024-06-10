import { gql } from "graphql-request";

const getProfilePicIdQuery = gql`
  query GetUserDetails($userId: String!) {
    nextusers(where: { userId: $userId }) {
      profilePic {
        id
      }
    }
  }
`;

const getUserDetailsQuery = gql`
  query GetUserDetails($userId: String!) {
    nextusers(where: { userId: $userId }) {
      id
      name
      email
      bio
      profilePic {
        url
      }
      role
      company
      library
    }
  }
`;

const updateUserBioMutation = gql`
  mutation UpdateUserBio($userId: String!, $bio: String!) {
    updateNextuser(where: { userId: $userId }, data: { bio: $bio }) {
      id
    }
  }
`;

const updateUserNameMutation = gql`
  mutation UpdateUserBio($userId: String!, $name: String!) {
    updateNextuser(where: { userId: $userId }, data: { name: $name }) {
      id
    }
  }
`;

const updateUserCompanyMutation = gql`
  mutation UpdateUserCompany($userId: String!, $company: String!) {
    updateNextuser(where: { userId: $userId }, data: { company: $company }) {
      id
    }
  }
`;

const updateUserRoleMutation = gql`
  mutation UpdateUserRole($userId: String!, $role: String!) {
    updateNextuser(where: { userId: $userId }, data: { role: $role }) {
      id
    }
  }
`;

const checkUserExistsQuery = gql`
  query CheckUserExists($userId: String!) {
    nextusers(where: { userId: $userId }) {
      id
    }
  }
`;

const getUserLibraryQuery = gql`
  query GetUserLibrary($userId: String!) {
    nextuser(where: { userId: $userId }) {
      library
    }
  }
`;

const updateUserLibraryMutation = gql`
  mutation UpdateUserBooks($userId: String!, $library: Json!) {
    updateNextuser(where: { userId: $userId }, data: { library: $library }) {
      id
      library
    }
    publishNextuser(where: { userId: $userId }, to: PUBLISHED) {
      id
    }
  }
`;

const createUserMutation = gql`
  mutation CreateUserQuery(
    $userId: String!
    $name: String!
    $email: String!
    $library: Json!
  ) {
    createNextuser(
      data: {
        userId: $userId
        name: $name
        email: $email
        library: $library
        company: "Your Company"
        role: "Your role"
        bio: "You bio info..."
      }
    ) {
      id
    }
    publishNextuser(where: { userId: $userId }, to: PUBLISHED) {
      id
    }
  }
`;
const uploadUserPicMutation = gql`
  mutation UploadUserPic($url: String!, $userId: String!) {
    createAsset(
      data: {
        uploadUrl: $url
        profilePicNextuser: { connect: { userId: $userId } }
      }
    ) {
      id
    }
  }
`;

const publishUserPicMutation = gql`
  mutation PublishUserPic($id: ID!) {
    publishAsset(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`;

const updateUserPicMutation = gql`
  mutation UpdateUserProfilePic($userId: ID!, $id: ID!) {
    updateNextuser(
      where: { id: $userId }
      data: { profilePicture: { connect: { id: $id } } }
    ) {
      id
    }
  }
`;

const publishUserMutation = gql`
  mutation UpdateUserProfilePic($userId: String!) {
    publishNextuser(where: { userId: $userId }) {
      id
    }
  }
`;

export {
  getUserDetailsQuery,
  updateUserBioMutation,
  checkUserExistsQuery,
  getUserLibraryQuery,
  createUserMutation,
  updateUserLibraryMutation,
  updateUserNameMutation,
  updateUserCompanyMutation,
  updateUserRoleMutation,
  updateUserPicMutation,
  getProfilePicIdQuery,
  uploadUserPicMutation,
  publishUserPicMutation,
  publishUserMutation,
};
