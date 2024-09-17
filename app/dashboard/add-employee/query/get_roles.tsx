import { gql } from "@apollo/client";

export const GET_ROLES = gql`
query GetRoles {
  roles {
    role_name
    id
  }
}`