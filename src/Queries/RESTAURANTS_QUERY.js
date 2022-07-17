import {gql} from '@apollo/client'

export const RESTAURANTS_QUERY=gql`
query Restaurants {
    Restaurants {
      Restaurantid
      RestaurantName
    
      Address
      Status
      Userid
    }
  }
  `