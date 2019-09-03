import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import Messages from '../shared/Messages'

const CreateKinshipButton = () => {
    return (
        <div>
            <Link to="/kinship/create">
                <Button
                    className="redirect_create_button"
                    color="teal"
                    content="Create kinship"
                    icon="add"
                    labelPosition="left"
                    size="medium"
                    data-tip=""
                    data-for="react-toooltip-create-kinship"
                />
            </Link>
            <ReactTooltip id="react-toooltip-create-kinship" type="info" place="right">
                {Messages.TOOLTIP_CREATE_KINSHIP}
            </ReactTooltip>
        </div>
    );
}


export default CreateKinshipButton;