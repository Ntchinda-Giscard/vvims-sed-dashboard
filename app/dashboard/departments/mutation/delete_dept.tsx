import { gql } from "@apollo/client";

export const DELETE_DEPT = gql`
mutation MyMutation3($id: uuid!) {
  delete_departments_by_pk(id: $id) {
    id
  }
}`