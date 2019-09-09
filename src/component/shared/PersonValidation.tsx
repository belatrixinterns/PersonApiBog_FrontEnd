import { IPersonToShow } from "./IPersonToShow";

abstract class PersonValidation{
    person: IPersonToShow;

    public constructor(pPerson: IPersonToShow){
        this.person = pPerson;
    }

    abstract validateField(): {mssg:string, request:boolean};

}

export default PersonValidation;