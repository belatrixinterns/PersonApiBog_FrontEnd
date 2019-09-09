import MESSAGES from '../../Messages';
import PersonValidation from './PersonValidation';
import { IPersonToShow } from '../../IPersonToShow';

class contactValidation extends PersonValidation{

    public constructor(person: IPersonToShow){
        super(person);
    }

    validateField(){
        const contact = this.person.contact;
        if(contact.length === 0){
            return {mssg:"", request:true};
        }
        let numericPattern =  new RegExp("[0-9]+");
        let emailPattern = new RegExp("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");
        if((emailPattern.test(contact) && contact.length > 30)){
            return {mssg:MESSAGES.CONTACT_INCORRECT_EMAIL, request:false};
        }
        if((numericPattern.test(contact) && contact.length > 15) ){
            return {mssg:MESSAGES.CONTACT_INCORRECT_NUMBER, request:false};
        }
        
        return {mssg:"", request:true};
    }
    
}

export default contactValidation;