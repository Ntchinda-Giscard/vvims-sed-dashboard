import { gql } from "@apollo/client";

export const GET_ALL_VISITORS = gql`
subscription GetVisitors($company_id: uuid! ) {
  visitors(where: {company_id: {_eq: $company_id}}) {
    firstname
    lastname
    id
    phone_number
    id_number
  }
}`