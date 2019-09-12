import MESSAGES from '../../Messages';
import PersonValidation from './PersonValidation';
import { IPersonToShow } from '../../IPersonToShow';

class documentValidation extends PersonValidation{

    constructor(person: IPersonToShow){
        super(person);
    }

    validateField(){
        const document = this.person.document;
        const type = this.person.documentType;

        let lettersPattern =  new RegExp("[a-zA-Z]");
        if((document.length > 10 && type !== "CE") || (document.length > 20 && type === "CE")){
            return {mssg:MESSAGES.DOCUMENT_INVALID_LENGHT, request:false};  
        }
    
        if(type !== "CE" && lettersPattern.test(document)){
            return {mssg:MESSAGES.DOCUMENT_INVALID_FORMAT, request:false};              
        }
        
        return {mssg:"", request:true};   
    }
}

export default documentValidation;