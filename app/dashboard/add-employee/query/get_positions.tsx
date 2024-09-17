import { gql } from "@apollo/client";

export const GET_POSIOIONS = gql`
query GetPosition($company_id: uuid!) {
  positions(where: {company_id: {_eq: $company_id}}) {
    id
    text_content {
      content
    }
  }
}`