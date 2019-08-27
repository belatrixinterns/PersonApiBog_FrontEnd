import MESSAGES from './Messages';

function nameValidation(name:string, lastName:string){
    let numericPattern =  new RegExp("[0-9]+");
    if(numericPattern.test(name) || numericPattern.test(lastName)){
        return {mssg:MESSAGES.NAME_INVALID_FORMAT, request:false};              
    }
    
    return {mssg:"", request:true};
}

export default nameValidation;