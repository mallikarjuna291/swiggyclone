import {gql} from '@apollo/client'

export const UPDATE_STATUS=gql`
  mutation Update_status($Status: String = "", $Restaurantid: uuid = "") {
    update_Restaurants(where: { Restaurantid: {_eq: $Restaurantid}}, _set: {Status: $Status}) {
      returning {
    
        Status
      }
    }
  }
  `