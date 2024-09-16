import { gql } from "@apollo/client";

export const INSERT_DEPT = gql`
mutation InsertDept($abrev_code: String! , $agency_id: uuid = null, $parent_department_id: uuid = null, $company_id: uuid!, $content: String! ) {
  insert_departments_one(object: {abrev_code: $abrev_code, agency_id: $agency_id, parent_department_id: $parent_department_id, company_id: $company_id, text_content: {data: {content: $content}}}) {
    id
  }
}`