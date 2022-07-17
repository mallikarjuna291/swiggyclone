import {gql} from '@apollo/client'

export const DISHES_QUERY=gql`
query Dishes {
    Dishes {
      Description
      Name
      Price
      Itemid
      Restaurantid
    }
  }
  
`