import { gql } from "@apollo/client";

export const GET_AGENCY_WOUT_DEPT = gql`
query GetAgencyWithNoDepartment($company_id: uuid!, $_lt: Int = 1) {
  agencies(where: {company_id: {_eq: $company_id}, departments_aggregate: {count: {predicate: {_lt: $_lt}}}}) {
    id
    text_content {
      content
    }
  }
}`