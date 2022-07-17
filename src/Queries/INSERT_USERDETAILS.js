import {gql} from '@apollo/client'
export const USER_DETAILS=gql`
mutation USER_DETAILS($Type: String = "", $Password: String = "", $Name: String = "", $Gender: String = "", $Email: String = "", $Address: String = "", $RestaurantName: String = "", $Status: String = "") {
  insert_users(objects: {Type: $Type, Password: $Password, Name: $Name, Gender: $Gender, Email: $Email, Restaurants: {data: {Address: $Address, RestaurantName: $RestaurantName, Status: $Status}}}) {
    returning {
      Email
      Gender
      Password
      Name
      Restaurants {
        Address
        RestaurantName
        Status
        Restaurantid
      }
      Type
      Userid
      Restaurantid
    }
  }
}

  `