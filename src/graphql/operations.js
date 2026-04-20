import { gql } from "@apollo/client";

export const REGISTER_CHURCH = gql`
  mutation RegisterChurch(
    $name: String!
    $adminName: String!
    $email: String!
    $password: String!
    $plan: String
    $memberCount: String
  ) {
    registerChurch(
      name: $name
      adminName: $adminName
      email: $email
      password: $password
      plan: $plan
      memberCount: $memberCount
    ) {
      token
      user {
        id
        name
        email
        role
        churchId
      }
    }
  }
`;
