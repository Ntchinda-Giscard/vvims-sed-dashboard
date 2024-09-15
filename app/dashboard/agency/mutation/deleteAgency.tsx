import { gql } from "@apollo/client";

export const DELETE_AGENCY = gql`
    mutation DeleteAgency($id: uuid!) {
        delete_agencies_by_pk(id: $id) {
            address
            city
            company_id
            created_at
            id
            location
            name
            neighborhood
            office
            phone_number
            po_box
            region
        }
    }`