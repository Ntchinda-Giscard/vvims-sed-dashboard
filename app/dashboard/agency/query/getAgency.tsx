import { gql } from "@apollo/client";



export const GET_AGENCY =gql`
  subscription GetAgecy($company_id: uuid!, $offset: Int!, $limit: Int! ) {
  agencies(where: {company_id: {_eq: $company_id}}, offset: $offset, limit: $limit) {
    address
    city
    company_id
    id
    office
    phone_number
    po_box
    region
    text_content {
      content
    }
    location
    name
    neighborhood
    created_at
    services_aggregate {
      aggregate {
        count
      }
    }
  }
}`