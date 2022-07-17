import {gql} from '@apollo/client';
export const INSERT_RESTAURANTS=gql`
mutation Insert_restaurants($Userid: Int = 10, $Status: String = "", $RestaurantOwner: String = "", $RestaurantName: String = "", $Address: String = "") {
    insert_Restaurants(objects: {Userid: $Userid, Status: $Status, RestaurantOwner: $RestaurantOwner, RestaurantName: $RestaurantName, Address: $Address}) {
      returning {
        Status
        Userid
        Restaurantid
        RestaurantOwner
        RestaurantName
        Address
      }
    }
  }
  
`