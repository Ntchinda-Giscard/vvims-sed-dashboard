import { gql } from "@apollo/client";

export const GET_SERV_BY_DEPT_ID = gql`
query GetServicesByDeptID($department_id: uuid!, $company_id: uuid! ) {
  services(where: {department_id: {_eq: $department_id}, company_id: {_eq: $company_id}}) {
    id
    text_content {
      content
    }
  }
}`