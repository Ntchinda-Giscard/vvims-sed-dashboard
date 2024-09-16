import { gql } from "@apollo/client";

export const INSERT_SERVICE = gql`
mutation InsertService($company_id: uuid! , $content: String!, $department_id: uuid! ) {
  insert_services_one(object: {company_id: $company_id, text_content: {data: {content: $content}}, department_id: $department_id}) {
    id
  }
}`