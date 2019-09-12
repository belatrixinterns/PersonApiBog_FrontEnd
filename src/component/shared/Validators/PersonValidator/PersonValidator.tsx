import { IPersonToShow } from "../../IPersonToShow";
import nameValidation from "./nameValidation";
import PersonValidation from "./PersonValidation";
import contactValidation from "./contactValidation";
import dateValidation from "./dateValidation";
import documentValidation from "./documentValidation";
import { toast } from "react-toastify";

function validatePersonFields(person: IPersonToShow){

    let createPerson = true;
    const validationOfName: PersonValidation = new nameValidation(person)
    const validationOfContact: PersonValidation  = new contactValidation(person);
    const validationOfDate: PersonValidation = new dateValidation(person);
    const validationOfDocument: documentValidation = new documentValidation(person);

    const personValidators: PersonValidation[] = [ validationOfName, validationOfDocument, validationOfDate, validationOfContact];
    personValidators.forEach((personValidator: PersonValidation) => {
        const fieldValidation = personValidator.validateField();
        if(!fieldValidation.request && fieldValidation.mssg){
            createPerson = false;
            toast.error(fieldValidation.mssg);
            return;
        }
    })

    return createPerson;
}

export default validatePersonFields;