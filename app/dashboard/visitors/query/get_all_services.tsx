import { gql } from "@apollo/client";

export const GET_ALL_SERVICES  = gql`
query MyQuery($company_id: uuid!) {
  services(where: {company_id: {_eq: $company_id}}) {
    id
    text_content {
      content
    }
  }
}`