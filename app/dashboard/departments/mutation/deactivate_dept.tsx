import { gql } from "@apollo/client";

export const DEACTIVTE_DEPT = gql`
mutation DeactivateDept($id: uuid!) {
  update_departments_by_pk(pk_columns: {id: $id}, _set: {status: INACTIVE}) {
    id
  }
}`