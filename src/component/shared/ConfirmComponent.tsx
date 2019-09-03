import React from 'react';
import { Confirm } from 'semantic-ui-react';

type ConfirmComponentProps = {
    confirmMessageContent: String,
    confirmOpenState: boolean,
    functionToExecuteOnConfirm: Function,
    handleCancelEvent: Function

}
const ConfirmComponent: React.FC<ConfirmComponentProps> =  (props: ConfirmComponentProps) => {

    function executeAction(event: any){
        event.preventDefault();
        props.functionToExecuteOnConfirm(event);
    }

    return (<Confirm open={props.confirmOpenState} content={props.confirmMessageContent} onCancel={() => props.handleCancelEvent()} onConfirm={(event:any) => executeAction(event)}></Confirm>)
 }

 export default ConfirmComponent;