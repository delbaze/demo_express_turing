import { gql } from "@apollo/client";

export const DELETE_WILDER = gql`
  mutation DeleteWilder($deleteWilderId: String!) {
    deleteWilder(id: $deleteWilderId) {
      message
      success
    }
  }
`;

export const CREATE_WILDER = gql`
  mutation CreateWilder($createInput: CreateInput!) {
    createWilder(createInput: $createInput) {
      avatarUrl
      bio
      city
      id
      name
    }
  }
`;
