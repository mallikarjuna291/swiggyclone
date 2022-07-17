import {gql} from '@apollo/client'
export const RESTAURANT_DETAILS=gql`
query Restaurant_Details {
    Restaurants {
      RestaurantName
      Restaurantid
      Status
      Userid
      Address
      Dishes_Menu {
        Description
        Itemid
        Name
        Price
        Restaurantid
      }
    }
  }
  `