import { gql } from "@apollo/client";



export const GET_AGENCY =gql`
    query GetAgecy($company_id: uuid!) {
    agencies(where: {company_id: {_eq: $company_id}}) {
        address
        city
        company_id
        id
        office
        phone_number
        po_box
        region
        text_content {
            content
        }
    }
    }`