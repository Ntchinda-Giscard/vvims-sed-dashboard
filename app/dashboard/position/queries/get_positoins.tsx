import { gql } from "@apollo/client";


export const GET_POSITIONS = gql`
query GetPositions($company_id: uuid! ) {
  positions(where: {company_id: {_eq: $company_id}}) {
    id
    text_content {
      content
    }
    employees_aggregate {
      aggregate {
        count
      }
    }
    level
  }
}`