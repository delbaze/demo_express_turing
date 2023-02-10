import { gql } from "@apollo/client";

export const LOGIN = gql(`
query Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      success
      token
    }
  }`);

export const CHECK_TOKEN = gql(`
query CheckToken {
    checkToken {
      valid
    }
  }`);
