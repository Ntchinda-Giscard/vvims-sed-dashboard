import { gql } from "@apollo/client";

export const DELETE_SERVICE = gql`
mutation DeleteService($id: uuid!) {
  delete_services_by_pk(id: $id) {
    id
  }
}
`