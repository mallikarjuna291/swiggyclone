import {gql} from '@apollo/client'


export const INSERT_ORDERS=gql`
mutation Insert_orders($Price: Int = 6,$Itemid: Int = 6, $Restaurantid: uuid = "", $Userid: uuid = "", $Name: String = "") {
    insert_Orders(objects: {Itemid: $Itemid,Price: $Price, Restaurantid: $Restaurantid, Userid: $Userid, Name: $Name}) {
      returning {
        Itemid
        Orderid
        Restaurantid
        Userid
        Price
      }
    }
  }
  
`
