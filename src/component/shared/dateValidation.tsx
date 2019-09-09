import moment from 'moment';
import MESSAGES from './Messages';

function validateDate(date: Date){
    const dateToValidate = moment(date);
    if(!dateToValidate.isValid()){
        return {mssg:MESSAGES.DATE_INCORRECT, request:false}; 
    }   
    return {mssg:"", request:true};
}
export default validateDate;