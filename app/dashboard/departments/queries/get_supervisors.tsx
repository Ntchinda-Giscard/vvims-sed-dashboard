import { gql } from "@apollo/client";

export const GET_SUPERVISORS = gql`
subscription Employees($company_id: uuid! ) {
  employees(where: {company_id: {_eq: $company_id}}) {
    id
    firstname
    lastname
  }
}`