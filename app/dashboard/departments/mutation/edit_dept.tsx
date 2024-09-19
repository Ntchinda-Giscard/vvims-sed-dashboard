import { gql } from "@apollo/client";

export const UPDATE_DEPT_PK = gql`
mutation UpdateDept($abrev_code: String!, $id: uuid!, $agency_id: uuid = null , $chief_department: uuid = null, $parent_department_id: uuid = null , $name: uuid!, $content: String!) {
  update_departments_by_pk(pk_columns: {id: $id}, _set: {abrev_code: $abrev_code, agency_id: $agency_id, chief_department: $chief_department, parent_department_id: $parent_department_id}) {
    id
  }
  update_text_content_by_pk(pk_columns: {id: $name}, _set: {content: $content}) {
    id
  }
}`