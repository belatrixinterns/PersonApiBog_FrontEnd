import axios from "axios";
import { IPerson } from "../interfaces/IPerson";

class PersonApi {
   public static getPeople(): Promise<IPerson[]> {
        return axios.get('https://personapibogbackend.herokuapp.com/person/')
          .then(response => response.data)
          .catch(err => console.log(err.message))
      }
}

export default PersonApi;