import {gql} from '@apollo/client'
 export const INSERT_USERS=gql`
 mutation Insert_users($Email: String = "", $Gender: String = "", $Name: String = "", $Password: String = "", $Type: String = "", $Address: String = "", $RestaurantName: String = "", $Status: String = "") {
  insert_users(objects: {Email: $Email, Gender: $Gender, Name: $Name, Password: $Password, Type: $Type, Restaurants: {data: {Address: $Address, RestaurantName: $RestaurantName, Status: $Status}}}) {
    returning {
      Email
      Gender
      Name
      Password
      RestaurantName
      Type
      Userid
      Restaurants {
        Address
        RestaurantName
        Restaurantid
        Status
        Userid
      }
    }
  }
}
 `

