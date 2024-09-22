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
    subscription GetLateEmployees($company_id: uuid! ) {
        employees_aggregate(where: {company_id: {_eq: $company_id}, attendance: {is_late: {_eq: true}}}) {
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
