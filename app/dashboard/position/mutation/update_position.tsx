import { gql } from "@apollo/client"

export const UPDATE_POS =gql`
mutation UpdatePositions($company_id: uuid!, $id: uuid!, $level: Int! , $text_id: uuid!, $content: String! ) {
  update_positions(where: {company_id: {_eq: $company_id}, id: {_eq: $id}}, _set: {level: $level}) {
    returning {
      company_id
      text_content {
        content
      }
    }
  }
  update_text_content_by_pk(pk_columns: {id: $text_id}, _set: {content: $content}) {
    content
    id
  }
}`