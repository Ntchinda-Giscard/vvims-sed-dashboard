import { gql } from "@apollo/client";

export const DELELTE_POS = gql`
mutation DeletePosition($company_id: uuid!, $id: uuid!) {
  delete_positions(where: {company_id: {_eq: $company_id}, id: {_eq: $id}}) {
    returning {
      id
      text_content {
        content
      }
    }
  }
}`