import { gql } from "@apollo/client";

export const INSERT_POS = gql`
mutation MyMutation($level: Int!, $content: String!, $company_id: uuid!) {
  insert_positions_one(object: {level: $level, text_content: {data: {content: $content}}, company_id: $company_id}) {
    id
    level
    text_content {
      content
    }
  }
}`