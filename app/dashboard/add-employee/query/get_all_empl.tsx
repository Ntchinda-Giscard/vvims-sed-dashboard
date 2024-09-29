import { gql } from "@apollo/client";

export const GET_EMPLY = gql`
subscription GetAllEmployee($company_id: uuid! ) {
  employees(where: {company_id: {_eq: $company_id}}) {
    id
    firstname
    lastname
    department{
      id
      text_content{
        content
      }
    }
    service{
      id
      text_content{
        content
      }
    }
  }
}`