import MESSAGES from './Messages';

function documentValidation(document:string, type:string){
    let lettersPattern =  new RegExp("[a-zA-Z]");
    if((document.length > 10 && type !== "CE") || (document.length > 20 && type === "CE")){
        return {mssg:MESSAGES.DOCUMENT_INVALID_LENGHT, request:false};  
    }

    if(type !== "CE" && lettersPattern.test(document)){
        return {mssg:MESSAGES.DOCUMENT_INVALID_FORMAT, request:false};              
    }
    
    return {mssg:"", request:true};
}

export default documentValidation;