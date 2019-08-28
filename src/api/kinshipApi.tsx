import axios from "axios";
import { IKinship } from "../interfaces/IKinship";
import Api from "./Api";

class KinshipApi extends Api
{
  public static getKinships(): Promise<IKinship[]> {
    return this.handlePromiseResponse(axios.get('https://personapibogbackend.herokuapp.com/relationship/'))
  }

  public static getKinship(id: String): Promise<IKinship>{
    return this.handlePromiseResponse(axios.get(`https://personapibogbackend.herokuapp.com/relationship/${id}`));
  }

  public static updateKinship(kinship: IKinship){
    return this.handlePromiseResponse(axios.put(`https://personapibogbackend.herokuapp.com/relationship/${kinship.id}`, kinship));
  }

  public static createKinship(kinship: IKinship){
    return this.handlePromiseResponse(axios.post(`https://personapibogbackend.herokuapp.com/relationship/`, kinship));
  }

  public static deleteKinship(id: Number): Promise<IKinship>{
    return this.handlePromiseResponse(axios.delete(`https://personapibogbackend.herokuapp.com/relationship/${id}`));
  }
}

export default KinshipApi;