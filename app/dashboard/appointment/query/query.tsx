import { gql } from "@apollo/client";

export const GET_APPOINTMENT = gql`
subscription MyQuery($company_id: uuid!) {
  appointments(where: {employee: {company_id: {_eq: $company_id}}}) {
    date
    employee {
      firstname
      id
      lastname
    }
    id
    end_time
    status
    start_time
    visitor {
      id
      lastname
      id_number
      phone_number
      firstname
    }
  }
}
`