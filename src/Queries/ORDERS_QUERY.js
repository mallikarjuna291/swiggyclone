import {gql} from '@apollo/client'

export const ORDERS_QUERY=gql`
query Orders {
    Orders {
      Itemid
      Name
      Orderid
      Restaurantid
      Userid
      Price
    }
  }
  
`