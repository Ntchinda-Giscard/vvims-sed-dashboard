import { gql } from "@apollo/client";

export const INSERT_EMPLOYEE = gql`
mutation CreateEmployee($address: String!, $companyId: UUID!, $departmentId: UUID!, $firstname: String!, $function: String!, $lastname: String!, $license: String!, $password: String!, $phoneNumber: String!, $positionId: UUID!, $region: String!, $roles: CreateEmployeeRole! , $serviceId: UUID!, $email: String!, $supervisorId: UUID = null) {
  createEmployee(
    employee: {firstname: $firstname, lastname: $lastname, password: $password, phoneNumber: $phoneNumber, companyId: $companyId, positionId: $positionId, departmentId: $departmentId, serviceId: $serviceId, function: $function, region: $region, license: $license, address: $address, roles: $roles, email: $email, supervisorId: $supervisorId}
  ) {
    id
  }
}`