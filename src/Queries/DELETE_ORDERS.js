import {gql} from '@apollo/client'

export const DELETE_ORDERS=gql`
mutation Delete_Orders( $Orderid: uuid = "") {
    delete_Orders(where: { Orderid: {_eq: $Orderid}}) {
      returning {
        Name
        Itemid
        Orderid
      }
    }
  }
  
`