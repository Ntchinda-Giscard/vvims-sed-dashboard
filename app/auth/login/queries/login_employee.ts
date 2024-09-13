import { gql } from "@apollo/client";

export const LOGIN_EPLOYEE = gql`
query MyQuery($password: String!, $phoneNumber: String!) {
  loginEmployee(password: $password, phoneNumber: $phoneNumber) {
    employee {
      id
      createdAt
      departmentId
      email
      firstname
      function
      lastname
      password
      phoneNumber
      positionId
      profilePicture
      serviceId
      supervisorId
      updatedAt
      position {
        id
        level
      }
      roles {
        createdAt
        employeeId
        id
        roleId
        updatedAt
        role {
          createdAt
          id
          roleName
          updatedAt
        }
      }
    }
    token
  }
}`