import { gql } from "@apollo/client";

export const GET_ALL_VISITS = gql`
subscription AllVisits($company_id: uuid!) {
  visits_aggregate(where: {visitorByVisitor: {company_id: {_eq: $company_id}}}) {
    aggregate {
      count
    }
  }
}`