import { gql } from "@apollo/client";

export const GET_DEPT = gql`
subscription GetDeparment($company_id: uuid = "56d71e10-61af-4843-bfc5-6ccaeec073f0", $limit: Int = 10, $offset: Int = 0) {
  departments(where: {company_id: {_eq: $company_id}}, limit: $limit, offset: $offset) {
    abrev_code
    agency_id
    chief_department
    company_id
    created_at
    id
    name
    parent_department_id
    department {
      id
      text_content {
        content
      }
    }
    text_content {
      content
    }
    services_aggregate {
      aggregate {
        count
      }
    }
    employees_aggregate {
      aggregate {
        count
      }
    }
  }
}`


export const GET_DEPT_AGG = gql`
subscription MyQuery($company_id: uuid! ) {
  departments_aggregate(where: {company_id: {_eq: $company_id}}) {
    aggregate {
      count
    }
  }
}`