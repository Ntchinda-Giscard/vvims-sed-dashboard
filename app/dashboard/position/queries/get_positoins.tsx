import { gql } from "@apollo/client";


export const GET_POSITIONS = gql`
query GetPositions($company_id: uuid!, $limit: Int!, $offset: Int!) {
  positions(where: {company_id: {_eq: $company_id}}, limit: $limit, offset: $offset, order_by: {level: asc}) {
    id
    text_content {
      id
      content
    }
    employees_aggregate {
      aggregate {
        count
      }
    }
    level
  }
}`

export const GET_POS_AGG = gql`
query GetPosAgg($company_id: uuid!) {
  positions_aggregate(where: {company_id: {_eq: $company_id}}) {
    aggregate {
      count
    }
  }
}`