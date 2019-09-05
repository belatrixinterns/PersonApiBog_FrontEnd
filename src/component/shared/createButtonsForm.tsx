import React, { FunctionComponent } from "react";
import { Button } from "semantic-ui-react";
import GoBackButton from "./GoBackButton";
import Messages from '../shared/Messages';
import ReactTooltip from 'react-tooltip';

type updateButtonsFormProps = {
    handleSubmit: any,
    isPersonForm: boolean,
    disabled? :boolean
}

const CreateButtonsForm: FunctionComponent<updateButtonsFormProps> = (props: updateButtonsFormProps) => {

    return (
        <div>
            {props.isPersonForm ?
                <Button className="submit_button"
                    disabled={props.disabled? props.disabled: false}
                    type="button"
                    floated='right'
                    onClick={props.handleSubmit}
                    data-tip=""
                    data-for="react-toooltip-create-person">
                    <i className="icon settings"

                    /> Add
            </Button> :
                <Button className="submit_button"
                    disabled={props.disabled? props.disabled: false}
                    type="button"
                    floated='right'
                    onClick={props.handleSubmit}
                    data-tip=""
                    data-for="react-toooltip-create-kinship">
                    <i className="icon settings"

                    /> Add
            </Button>
            }
            <ReactTooltip id="react-toooltip-create-kinship" type="success" place="right">
                {Messages.TOOLTIP_ADD_KINSHIP}
            </ReactTooltip>
            <ReactTooltip id="react-toooltip-create-person" type="success" place="right">
                {Messages.TOOLTIP_ADD_PERSON}
            </ReactTooltip>
            <GoBackButton />
        </div>
    );
}

export default CreateButtonsForm;