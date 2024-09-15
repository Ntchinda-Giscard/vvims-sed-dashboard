import { gql } from "@apollo/client";

export const INSERT_AGENCY = gql`
mutation InsertCompany($address: String!, $city: String!, $company_id: uuid!, $neighborhood: String!, $office: String!, $phone_number: String!, $po_box: String!, $region: String!, $name: String!) {
  insert_agencies_one(object: {address: $address, city: $city, company_id: $company_id, neighborhood: $neighborhood, office: $office, phone_number: $phone_number, po_box: $po_box, region: $region, text_content: {data: {content: $name}}}) {
    company_id
    id
    company {
      text_content {
        id
        content
      }
      id
    }
  }
}`