import { gql } from "@apollo/client";

export const USERS_QUERY=gql`
query Users {
    users {
      Userid
      Type
      Name
      Gender
      Email
      Password
    }
  }
`