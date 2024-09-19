import { gql } from "@apollo/client";

export const GET_EMPLOYEE_AGG = gql`
subscription GetEmployeeAgg($company_id: uuid!, $search: String = "%%") {
  employees_aggregate(where: {
    _or:[ {firstname:{_ilike: $search}}, {lastname:{_ilike: $search}}, {phone_number: {_ilike: $search}}, {function: {_ilike: $search}} ]
    company_id: {_eq: $company_id},
    
  }) {
    aggregate {
      count
    }
  }
}`