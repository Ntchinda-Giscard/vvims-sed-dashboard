import { gql } from "@apollo/client";

export const GET_ALL_VEHICLES = gql`
query MyQuery2 {
  vehicles {
    make
    license
    color
    id
  }
}`