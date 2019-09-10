
import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import Messages from '../shared/Messages'
import ReactTooltip from 'react-tooltip';

type goBackButtonsFormProps = {
    goBackButtonHandler: any
}

const GoBackConfirmButton: React.FunctionComponent<goBackButtonsFormProps> = (props) => {

    return (
        <div>
            <Button
                type="button"
                className="go_back_button"
                content="Go back"
                icon="arrow circle left"
                onClick={props.goBackButtonHandler}
                data-tip=""
                data-for="react-toooltip-goback"
            >
            </Button>
            <ReactTooltip id="react-toooltip-goback" type="error" place="right">
                {Messages.TOOLTIP_GO_BACK}
            </ReactTooltip>
            
        </div>
    )
}

export default GoBackConfirmButton;