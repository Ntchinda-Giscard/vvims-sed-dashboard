import { gql } from "@apollo/client";

export const ACTIVATE_DEPT = gql`
mutation ActivateDept($id: uuid!) {
  update_departments_by_pk(pk_columns: {id: $id}, _set: {status: ACTIVE}) {
    id
  }
}`