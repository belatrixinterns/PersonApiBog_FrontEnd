import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Messages from '../shared/Messages'
import ReactTooltip from 'react-tooltip';

const CreatePersonButton = () => {
    return (
        <div>
            <Link to="/person/create">
                <Button
                    className="redirect_create_button create_person_button"
                    color="green"
                    content="Create person"
                    icon="add"
                    labelPosition="left"
                    size="medium"
                    data-tip=""
                    data-for="react-toooltip-create"
                />
            </Link>
            <ReactTooltip id="react-toooltip-create" type="info" place="right">
                {Messages.TOOLTIP_CREATE_PERSON}
            </ReactTooltip>
        </div>
    );
}

export default CreatePersonButton;