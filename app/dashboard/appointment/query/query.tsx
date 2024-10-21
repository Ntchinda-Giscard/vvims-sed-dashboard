import { gql } from "@apollo/client";

export const GET_APPOINTMENT = gql`
subscription MyQuery($company_id: uuid!, $date: date, $status: [String!], $limit: Int, $offset: Int) {
  appointments(where: {employee: {company_id: {_eq: $company_id}},
    _or: [
      {date: {_eq: $date}}, 
      {status: {_in: $status}}]
   }, limit: $limit, offset: $offset) {
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
}`

export const GET_APP_AGG = gql`
subscription MyQuery($company_id: uuid, $date: date, $status: appointment_status_enum) {
  appointments_aggregate(where: {employee: {company_id: {_eq: $company_id}},
    _or: [
      {date: {_eq: $date}},
      {status: {_eq: $status}}
    ]
  }) {
    aggregate {
      count
    }
  }
}`

export const GET_COMPLETED_APP = gql`
subscription MyQuery2 {
  appointments_aggregate(where: {status: {_eq: COMPLETED}}) {
    aggregate {
      count
    }
  }
}`;


export const UPCOMING_APPOINMENT =gql`
subscription MyQuery2 {
  appointments_aggregate(where: {date: {_gt: "now()"}}) {
    aggregate {
      count
    }
  }
}`;


export const TODAYS_APP = gql`
subscription MyQuery2 {
  appointments_aggregate(where: {date: {_eq: "now()"}}) {
    aggregate {
      count
    }
  }
}`