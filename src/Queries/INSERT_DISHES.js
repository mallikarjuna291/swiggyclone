import {gql} from '@apollo/client'

export const INSERT_DISHES=gql`

  mutation Insert_Dishes($Description: String = "", $Name: String = "", $Price: Int = 10, $Restaurantid: uuid = "") {
    insert_Dishes(objects: {Description: $Description, Name: $Name, Price: $Price, Restaurantid: $Restaurantid}) {
      returning {
        Description
        Name
        Price
      }
    }
  }
  
   
  
`