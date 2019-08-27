import axios from "axios";
import { IPerson } from "../interfaces/IPerson";
import Api from "./Api";

class PersonApi extends Api
{
  public static getPeople(): Promise<IPerson[]> {
    return this.handlePromiseResponse(axios.get('https://personapibogbackend.herokuapp.com/person/'))
  }

  public static getPerson(id: String): Promise<IPerson>{
    return this.handlePromiseResponse(axios.get(`https://personapibogbackend.herokuapp.com/person/${id}`));
  }

  public static updatePerson(person: IPerson){
    return this.handlePromiseResponse(axios.put(`https://personapibogbackend.herokuapp.com/person/${person.id}`, person));
  }

  public static createPerson(person: IPerson){
    return this.handlePromiseResponse(axios.post(`https://personapibogbackend.herokuapp.com/person/`, person));
  }

  public static deletePerson(id: Number): Promise<IPerson>{
    return this.handlePromiseResponse(axios.delete(`https://personapibogbackend.herokuapp.com/person/${id}`));
  }
}

export default PersonApi;