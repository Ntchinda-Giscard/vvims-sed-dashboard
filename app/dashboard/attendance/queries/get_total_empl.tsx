import { gql } from "@apollo/client";

export const GET_TOTAL_EMPLOYEE = gql`
    subscription GetTotalEmployees($company_id: uuid!) {
        employees_aggregate(where: {company_id: {_eq: $company_id}}) {
            aggregate {
                count
            }
        }
    }`

export const GET_PRESENT_EMPLOYEES =    gql`
    subscription GetPresentEmployees($company_id: uuid!) {
        employees_aggregate(where: {attendance: {clock_in_date: {_eq: "now()"}}, company_id: {_eq: $company_id}}) {
            aggregate {
                count
            }
        }
    }`
    

export const GET_ONTIME_EMPLOYEES = gql`
    subscription GetOnTimeEployees($company_id: uuid! ) {
        employees_aggregate(where: {company_id: {_eq: $company_id}, attendance: {clock_in_date: {_eq: "now()"}, attendance_state: {is_late: {_eq: false}}}}) {
        aggregate {
            count
        }
        }
    }`

export const GET_LATE_EMPLOYEES = gql`
subscription GetOnTimeEployees($company_id: uuid! ) {
    employees_aggregate(where: {company_id: {_eq: $company_id}, attendance: {clock_in_date: {_eq: "now()"}, attendance_state: {is_late: {_eq: true}}}}) {
    aggregate {
        count
    }
    }
}`

export const GET_ABSENT_EMPLOYEE = gql`
    subscription GetAbsentEmployee($company_id: uuid!) {
        employees_aggregate(where: {company_id: {_eq: $company_id}, attendance: {clock_in_date: {_is_null: true}}}) {
            aggregate {
                count
            }
        }
    }`

export const GET_ATTENDANCES = gql`
subscription GetAttendances($limit: Int!, $offset: Int!, $company_id: uuid! ) {
    attendance(order_by: {clock_in_date: desc}, limit: $limit, offset: $offset, 
    where: {
    clock_in_date: {_eq: "now()"}, 
    employee: {company_id: {_eq: $company_id}}}) {
      attendance_state {
        is_late
        id
      }
      employee {
        firstname
        lastname
        service {
          text_content {
            content
          }
          id
        }
        department {
          text_content {
            content
          }
          id
        }
        agency {
          text_content {
            content
          }
          id
          office
        }
      }
      clock_in_date
      clock_in_time
      clock_out_time
    }
  }`;

export const GET_ATT_AGG = gql`
subscription MyQuery($company_id: uuid! ) {
  attendance_aggregate(where: {employee: {company_id: {_eq: $company_id}}, clock_in_date: {_eq: "now()"}}) {
    aggregate {
      count
    }
  }
}`


export const GET_ATT_MONTH = gql`
subscription MyQuery3 {
  get_attenance_monthly {
    clock_in_count
    day
  }
}`

export const GET_ATT_WEEK = gql`
subscription MyQuery4 {
  get_attendance_weekly {
    on_time_count
    total_attendance
    weekday
  }
}`