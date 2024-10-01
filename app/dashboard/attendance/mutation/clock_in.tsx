import { gql } from "@apollo/client";

export const CLOCK_IN = gql`
mutation ClockIn($employee_id: uuid!, $location: geometry = null) {
  insert_attendance_one(object: {employee_id: $employee_id, location: $location, clock_in_date: now}) {
    id
  }
}`;


export const CLOCK_OUT = gql`
mutation ClockOut($employee_id: uuid!) {
  update_attendance(where: {clock_in_date: {_eq: now}}, _set: {clock_out_time: now, employee_id: $employee_id}) {
    affected_rows
  }
}`