import { gql } from "@apollo/client";

export const GET_ALL_VISITS = gql`
subscription AllVisits($company_id: uuid!) {
  visits_aggregate(where: {visitorByVisitor: {company_id: {_eq: $company_id}}}) {
    aggregate {
      count
    }
  }
}`

export const GET_PERCENTAGE_DIFF = gql`
subscription MyQuery {
  get_visit_percentage_difference {
    percentage_change
    today_visits
    yesterday_visits
  }
}`

export const GET_VISITS_STAT = gql`
subscription MyQuery2 {
  get_visits_stat {
    day
    visits_per_day
  }
}`