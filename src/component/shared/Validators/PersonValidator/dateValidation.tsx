import moment from 'moment';
import MESSAGES from '../../Messages';
import PersonValidation from './PersonValidation';

class validateDate extends PersonValidation{

    validateField(){
    const date = this.person.dateOfBirth;
    const dateToValidate = moment(date,"DD-MM-YYYY");
    
    if(!dateToValidate.isValid()){
        return {mssg:MESSAGES.DATE_INCORRECT, request:false}; 
    }   
    return {mssg:"", request:true};
    }

}
export default validateDate;