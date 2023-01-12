import { gql } from "@apollo/client";

export const GET_ALL_WILDERS = gql`
  query ReadWilders {
    readWilders {
      name
      id
      city
      bio
      avatarUrl
    }
  }
`;
