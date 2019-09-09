import React, { FunctionComponent } from "react";
import { Button } from "semantic-ui-react";
import GoBackButton from "./GoBackButton";
import Messages from '../shared/Messages'
import ReactTooltip from 'react-tooltip';
import PopupWhenButtonIsDisabled from "./PopupWhenButtonIsDisabled";

type updateButtonsFormProps = {
    updateButtonHandler: any,
    isPersonForm: boolean,
    disabled :boolean
}


const UpdateButtonsForm: FunctionComponent<updateButtonsFormProps> = (props) => {
    return (
        <div>
            {props.isPersonForm ?
                <PopupWhenButtonIsDisabled 
                    component={
                        <div>
                        <Button
                            className="submit_button"
                            disabled={props.disabled? props.disabled: false}
                            floated='right'
                            onClick={props.updateButtonHandler}
                            type="button"
                            data-tip=""
                            data-for="react-toooltip-update-person"
                        >
                            <i className="icon settings" /> Save
                        </Button>
                        <ReactTooltip id="react-toooltip-update-person" type="dark" place="right">
                            {Messages.TOOLTIP_GO_UPDATE_PERSON}
                        </ReactTooltip>
                        </div>
                    }
                    disabled={ !props.disabled } 
                ></PopupWhenButtonIsDisabled>
                 :
                <PopupWhenButtonIsDisabled 
                    component={
                        <div>
                        <Button
                            className="submit_button"
                            disabled={!props.disabled}
                            floated='right'
                            onClick={props.updateButtonHandler}
                            type="button"
                            data-tip=""
                            data-for="react-toooltip-update-kinship"
                        >
                            <i className="icon settings" /> Save
                        </Button>
                        <ReactTooltip id="react-toooltip-update-kinship" type="dark" place="right">
                            {Messages.TOOLTIP_GO_TO_UPDATE_kINSHIP}
                        </ReactTooltip>
                        </div>
                    }
                    disabled={ props.disabled }
                ></PopupWhenButtonIsDisabled>
            }
            <GoBackButton />
        </div>
    );
}

export default UpdateButtonsForm;