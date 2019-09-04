import React, { FunctionComponent } from "react";
import { Button } from "semantic-ui-react";
import GoBackButton from "./GoBackButton";
import Messages from '../shared/Messages'
import ReactTooltip from 'react-tooltip';

type updateButtonsFormProps = {
    updateButtonHandler: any
}

const UpdateButtonsForm: FunctionComponent<updateButtonsFormProps> = (props) => {
    return (
        <div>
            <Button
                className="submit_button"
                floated='right'
                onClick={props.updateButtonHandler}
                type="submit"
                data-tip=""
                data-for="react-toooltip-update-kinship"
            >
                <i className="icon settings" /> Save
            </Button>
            <ReactTooltip id="react-toooltip-update-kinship" type="dark" place="right">
                {Messages.TOOLTIP_GO_TO_UPDATE_kINSHIP}
            </ReactTooltip>
            <GoBackButton />
        </div>
    );
}

export default UpdateButtonsForm;