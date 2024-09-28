import { gql } from "@apollo/client";

export const GET_VISITS = gql`
subscription GetVisits($search: String = "%%", $date: timestamptz = "2100-01-01", $limit: Int!, $offset: Int!) {
  visits(limit: $limit, offset: $offset, where: {_or: [{created_at: {_lte: $date}}, {visitorByVisitor: {firstname: {_ilike: $search}, lastname: {_ilike: $search}, phone_number: {_ilike: $search}}}]}, order_by: {created_at: desc}) {
    check_in_at
    check_out_at
    date
    reason
    id
    department {
      text_content {
        content
      }
    }
    employee {
      firstname
      lastname
    }
    service {
      text_content {
        content
      }
    }
    visitorByVisitor {
      lastname
      phone_number
      id_number
      file {
        file_url
        visitorsByBackId {
          file {
            file_url
          }
        }
        visitorsByFrontId {
          file {
            file_url
          }
        }
      }
      firstname
    }
    visit_status {
      status
    }
  }
}
`


export const GET_VISITS_AGG = gql`
subscription MyQuery($search: String = "%%", $date: date = "2100-01-01") {
    visits_aggregate(where: {_or: [{date: {_lte: $date}}, {visitorByVisitor: {firstname: {_ilike: $search}, lastname: {_ilike: $search}, phone_number: {_ilike: $search}}}]}) {
      aggregate {
        count
      }
    }
  }`