import { gql } from "@apollo/client";

export const AGENCY_AGG =gql`
subscription GetAgencyAgg($company_id: uuid!) {
  agencies_aggregate(where: {company_id: {_eq: $company_id}}) {
    aggregate {
      count
    }
  }
}`