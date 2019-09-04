import React from 'react';
import { Confirm } from 'semantic-ui-react';

type ConfirmComponentProps = {
    confirmMessageContent: any,
    confirmOpenState: boolean,
    functionToExecuteOnConfirm: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void,
    handleCancelEvent: Function
}

const ConfirmComponent: React.FC<ConfirmComponentProps> =  (props: ConfirmComponentProps) => {

    function executeAction(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>){
        event.preventDefault();
        props.functionToExecuteOnConfirm(event);
    }

    return (<Confirm open={props.confirmOpenState} content={<div>{props.confirmMessageContent}</div>} onCancel={() => props.handleCancelEvent()} onConfirm={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => executeAction(event)}>
    </Confirm>)
 }

 export default ConfirmComponent;