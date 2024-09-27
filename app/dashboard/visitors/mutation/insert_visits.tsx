import { gql } from "@apollo/client";

export const INSERT_VISITS = gql`
mutation MyMutation($host_department: uuid = null, $host_employee: uuid = null, $host_service: uuid = null, $reason: String! , $reg_no: String = null, $vehicle: uuid = null, $visitor: uuid!) {
  insert_visits_one(object: {date: "now()", host_department: $host_department, host_employee: $host_employee, host_service: $host_service, reason: $reason, reg_no: $reg_no, status: PENDING, vehicle: $vehicle, visitor: $visitor}) {
    id
  }
}`


export const INSERT_VISITS_VISITOR = ""