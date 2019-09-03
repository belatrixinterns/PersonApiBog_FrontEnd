import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import Messages from '../shared/Messages'

const ListPersonButton = () => {
    return (
        <div>
            <Link to="/persons">
                <Button className="button-size"
                    color="blue"
                    content="List person"
                    icon="list alternate"
                    labelPosition="left"
                    size="medium"
                    data-tip=""
                    data-for="react-toooltip-list"
                />
            </Link>
            <ReactTooltip id="react-toooltip-list" type="dark" place="right">
                {Messages.TOOLTIP_LIST_PERSON}
            </ReactTooltip>
        </div>
    );
}


export default ListPersonButton;
