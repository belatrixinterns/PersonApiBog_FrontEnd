import React from 'react';
import { Popup } from 'semantic-ui-react';

type PopupWhenButtonIsDisabledProps = {
    component: any
}

const PopupWhenButtonIsDisabled: React.FC<PopupWhenButtonIsDisabledProps> = (props: PopupWhenButtonIsDisabledProps) => {
    return( <Popup
                trigger={
                <div style={{float: "right"}}>
                    {props.component}
                </div>
                }
                content="You cannot click this button until you fill all the required inputs."
            />)
}

export default PopupWhenButtonIsDisabled;