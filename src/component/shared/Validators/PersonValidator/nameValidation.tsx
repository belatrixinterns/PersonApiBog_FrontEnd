import MESSAGES from '../../Messages';
import PersonValidation from './PersonValidation';
import { IPersonToShow } from '../../IPersonToShow';

class nameValidation extends PersonValidation {

    validateField(){
        const name = this.person.name;
        const lastName = this.person.lastName;

        let numericPattern =  new RegExp("^\\S+[a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ ]+$");
        if((!numericPattern.test(name) || !numericPattern.test(lastName)) || (name.length < 3 || lastName.length < 3)){
            console.log(numericPattern.test(name))
            return {mssg:MESSAGES.NAME_INVALID_FORMAT, request:false};              
        }
        
        return {mssg:"", request:true};
    }
}

export default nameValidation;