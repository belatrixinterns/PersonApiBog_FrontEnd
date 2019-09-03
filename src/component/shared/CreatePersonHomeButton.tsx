import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import Messages from '../shared/Messages'

const CreatePersonHomeButton = () => {
    return (
        <div>
            <Link to="/person/create" className="button-size" >
                <Button className="button-size"
                    color="green"
                    content="Create person"
                    icon="add"
                    labelPosition="left"
                    size="medium"
                    data-tip=""
                    data-for="react-toooltip-create"
                />
            </Link>
            <ReactTooltip id="react-toooltip-create"   type="info"  place="right">
               {Messages.TOOLTIP_CREATE_PERSON}
            </ReactTooltip>
        </div>

    );
}


export default CreatePersonHomeButton;