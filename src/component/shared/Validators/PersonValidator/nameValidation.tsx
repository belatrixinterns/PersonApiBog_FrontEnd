import MESSAGES from '../../Messages';
import PersonValidation from './PersonValidation';
import { IPersonToShow } from '../../IPersonToShow';

class nameValidation extends PersonValidation {

    validateField(){
        const name = this.person.name;
        const lastName = this.person.lastName;

        let numericPattern =  new RegExp("[0-9]+");
        if(numericPattern.test(name) || numericPattern.test(lastName)){
            return {mssg:MESSAGES.NAME_INVALID_FORMAT, request:false};              
        }
        
        return {mssg:"", request:true};
    }
}

export default nameValidation;