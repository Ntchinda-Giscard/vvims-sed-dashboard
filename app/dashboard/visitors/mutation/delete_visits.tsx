import { gql } from "@apollo/client";


export const DELETE_VISITS = gql`
    mutation DeleteVisits($id: uuid! ) {
        delete_visits_by_pk(id: $id) {
            id
        }
    }`